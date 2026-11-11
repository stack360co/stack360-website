import { type NextRequest, NextResponse } from 'next/server';
import { routes } from '@/constants/routes';
import { describeLead, domainAge, leadContextSchema } from '@/helpers/lead-context';
import { buildLeadEmail, sendLeadEmail } from '@/helpers/lead-email';
import { generateFormText, summarizeForm } from '@/helpers/markdown';
import { FORM_FALLBACK_MESSAGE, isLikelySpam } from '@/lib/form-guard';
import { bookingPayloadSchema } from '@/schema/booking';
import { contactSchema } from '@/schema/contact';
import { hirePayloadSchema } from '@/schema/hire';

const MAX_BODY_BYTES = 20_000;

const payloadSchemas = {
  contact: contactSchema,
  hire: hirePayloadSchema,
  booking: bookingPayloadSchema,
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

  // Calendly bookings arrive without a name or email; those are in Calendly itself.
  const person: { name?: string; email?: string; company?: string } =
    'email' in parsed.data ? parsed.data : {};
  const leadContext = describeLead({
    context: leadContextSchema.parse(body.context ?? {}),
    domain: person.email ? await domainAge(person.email) : undefined,
    email: person.email,
    headers: request.headers,
  });

  const summary = summarizeForm(formType as string, parsed.data);
  const [chat, email] = await Promise.allSettled([
    postToMattermost(generateFormText(summary, leadContext)),
    sendLeadEmail(buildLeadEmail(summary, leadContext, person), person.email),
  ]);
  if (chat.status === 'rejected') {
    console.error('Mattermost webhook failed', chat.reason);
  }
  if (email.status === 'rejected') {
    console.error('Lead email failed', email.reason);
  }

  // The lead goes to Mattermost and to sales@. One copy landing is enough; if neither did, the
  // visitor is given the sales email instead of the raw error.
  if (chat.status === 'fulfilled' || (email.status === 'fulfilled' && email.value === 'sent')) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: FORM_FALLBACK_MESSAGE }, { status: 502 });
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
