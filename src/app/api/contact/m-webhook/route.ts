import { type NextRequest, NextResponse } from 'next/server';
import { routes } from '@/constants/routes';
import { describeLead, leadContextSchema } from '@/helpers/lead-context';
import { generateFormText } from '@/helpers/markdown';
import { FORM_FALLBACK_MESSAGE, isLikelySpam } from '@/lib/form-guard';
import { contactSchema } from '@/schema/contact';
import { hirePayloadSchema } from '@/schema/hire';

const MAX_BODY_BYTES = 20_000;

const payloadSchemas = {
  contact: contactSchema,
  hire: hirePayloadSchema,
};

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: 'Your message is too long.' },
      { status: 413 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Bots get the same reply as a real submission, so they have no reason to retry.
  if (isLikelySpam(body)) {
    return NextResponse.json({ success: true });
  }

  const formType = body.formType;
  const schema =
    typeof formType === 'string' && formType in payloadSchemas
      ? payloadSchemas[formType as keyof typeof payloadSchemas]
      : null;
  if (!schema) {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.',
      },
      { status: 400 }
    );
  }

  const leadContext = describeLead({
    context: leadContextSchema.parse(body.context ?? {}),
    email: parsed.data.email,
    headers: request.headers,
  });

  try {
    await postToMattermost(generateFormText(formType as string, parsed.data, leadContext));
    return NextResponse.json({ success: true });
  } catch (error) {
    // Mattermost is the only place leads land, so a failure is logged and the visitor is
    // given the sales email instead of the raw error.
    console.error('Mattermost webhook failed', error);
    return NextResponse.json({ success: false, error: FORM_FALLBACK_MESSAGE }, { status: 502 });
  }
}

/** Posts the message, retrying once so a brief Mattermost hiccup doesn't lose a lead. */
async function postToMattermost(text: string) {
  try {
    await sendToMattermost(text);
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 800));
    await sendToMattermost(text);
  }
}

async function sendToMattermost(text: string) {
  const response = await fetch(routes.webhook.mattermost, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error(`Mattermost returned ${response.status}: ${await response.text()}`);
  }
}
