import { createHash } from 'node:crypto';
import {
  ConditionalCheckFailedException,
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { envVars } from '@/config/env';
import {
  SITE_EMAIL,
  SITE_PHONE,
  SITE_WHATSAPP_HREF,
  UK_COMPANY_NAME,
  UK_COMPANY_NUMBER,
  UK_OFFICE_ADDRESS,
} from '@/constants/site';

/**
 * The instant "we got your message" reply to people who send the contact or hire form (approved
 * by Waris on 16 Nov 2026, wording answered through HQ).
 *
 * Safety rules, so the form can't be used to email strangers:
 * - The email is fixed text. Nothing the visitor typed goes into it, not even their name.
 * - One reply per address, ever (remembered as a one-way hash for 24 months, the privacy notice's
 *   retention for enquiries).
 * - At most 3 replies per visitor IP a day.
 *
 * The limits live in a DynamoDB table (LEAD_AUTOREPLY_TABLE), which the site reaches through the
 * Amplify app's compute role. Without the table setting, or without Resend, nothing is sent.
 */

export type AutoReplyForm = 'contact' | 'hire';
export type AutoReplyResult = 'sent' | 'off' | 'already-replied' | 'ip-limit';

const MAX_PER_IP_PER_DAY = 3;
const ADDRESS_MEMORY_SECONDS = 730 * 86_400;
const IP_MEMORY_SECONDS = 2 * 86_400;
const RESEND_URL = 'https://api.resend.com/emails';

const SUBJECT = 'We got your message';

/** Calendly link tagged so a call booked from this email shows its source. */
function calendlyLink(): string | undefined {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '';
  if (!/^https:\/\/calendly\.com\/.+/.test(base)) {
    return undefined;
  }
  const tags = 'utm_source=stack360.co&utm_medium=email&utm_campaign=form-auto-reply';
  return `${base}${base.includes('?') ? '&' : '?'}${tags}`;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The fixed reply. Only the form type changes it. */
export function buildAutoReply(form: AutoReplyForm): {
  subject: string;
  text: string;
  html: string;
} {
  const calendly = calendlyLink();
  const hireLine =
    "If you're hiring developers, reply with the skills you need and when you'd like to start, and we'll send matching profiles.";
  const paragraphs: { text: string; html: string }[] = [
    { text: 'Hi,', html: 'Hi,' },
    {
      text: 'Thanks for contacting Stack360. This is a quick note to say your message reached us. Someone from the team will reply within one working day.',
      html: 'Thanks for contacting Stack360. This is a quick note to say your message reached us. Someone from the team will reply within one working day.',
    },
    ...(calendly
      ? [
          {
            text: `If you'd like to talk sooner, pick a time for a call here: ${calendly}`,
            html: `If you’d like to talk sooner, <a href="${escapeHtml(calendly)}">pick a time for a call here</a>.`,
          },
        ]
      : []),
    {
      text: `Or message us on WhatsApp: ${SITE_PHONE} (messages only): ${SITE_WHATSAPP_HREF}`,
      html: `Or message us on WhatsApp: <a href="${SITE_WHATSAPP_HREF}">${SITE_PHONE}</a> (messages only).`,
    },
    ...(form === 'hire' ? [{ text: hireLine, html: hireLine.replace(/'/g, '’') }] : []),
    {
      text: "If you didn't send us a message, you can ignore this email. We won't write to this address again unless you contact us.",
      html: 'If you didn’t send us a message, you can ignore this email. We won’t write to this address again unless you contact us.',
    },
    {
      text: `Stack360\n${SITE_EMAIL} · stack360.co`,
      html: `Stack360<br><a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a> · <a href="https://stack360.co">stack360.co</a>`,
    },
  ];
  const footer = `${UK_COMPANY_NAME}, registered in England and Wales, company number ${UK_COMPANY_NUMBER}. ${UK_OFFICE_ADDRESS}.`;

  const text = [...paragraphs.map((p) => p.text), footer].join('\n\n');
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#181818;max-width:560px">',
    ...paragraphs.map((p) => `<p style="margin:0 0 14px">${p.html}</p>`),
    `<p style="margin:20px 0 0;font-size:12px;color:#666">${escapeHtml(footer)}</p>`,
    '</div>',
  ].join('');
  return { subject: SUBJECT, text, html };
}

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

let client: DynamoDBClient | null = null;
function dynamo(): DynamoDBClient {
  client ??= new DynamoDBClient({ region: process.env.AWS_REGION ?? 'eu-west-1', maxAttempts: 2 });
  return client;
}

const isConditionFailure = (error: unknown) =>
  error instanceof ConditionalCheckFailedException ||
  (error as { name?: string } | null)?.name === 'ConditionalCheckFailedException';

/** Counts this IP's replies today; false once it has had MAX_PER_IP_PER_DAY. */
async function underIpLimit(table: string, ip: string, now: number): Promise<boolean> {
  const day = new Date(now * 1000).toISOString().slice(0, 10);
  try {
    await dynamo().send(
      new UpdateItemCommand({
        TableName: table,
        Key: { pk: { S: `ip#${sha256(`stack360-autoreply:${ip}`)}#${day}` } },
        UpdateExpression: 'ADD hits :one SET expiresAt = if_not_exists(expiresAt, :exp)',
        ConditionExpression: 'attribute_not_exists(hits) OR hits < :max',
        ExpressionAttributeValues: {
          ':one': { N: '1' },
          ':max': { N: String(MAX_PER_IP_PER_DAY) },
          ':exp': { N: String(now + IP_MEMORY_SECONDS) },
        },
      }),
      { abortSignal: AbortSignal.timeout(3000) }
    );
    return true;
  } catch (error) {
    if (isConditionFailure(error)) {
      return false;
    }
    throw error;
  }
}

/** Records the address; false if it already had a reply. */
async function firstReplyForAddress(
  table: string,
  email: string,
  form: AutoReplyForm,
  now: number
): Promise<boolean> {
  try {
    await dynamo().send(
      new PutItemCommand({
        TableName: table,
        Item: {
          pk: { S: `email#${sha256(`stack360-autoreply:${email}`)}` },
          form: { S: form },
          repliedAt: { N: String(now) },
          expiresAt: { N: String(now + ADDRESS_MEMORY_SECONDS) },
        },
        ConditionExpression: 'attribute_not_exists(pk)',
      }),
      { abortSignal: AbortSignal.timeout(3000) }
    );
    return true;
  } catch (error) {
    if (isConditionFailure(error)) {
      return false;
    }
    throw error;
  }
}

/**
 * Sends the auto-reply if the limits allow. Throws only on unexpected errors (table or Resend
 * down); the caller logs those and the visitor's form still succeeds.
 */
export async function sendAutoReply({
  to,
  form,
  ip,
}: {
  to: string;
  form: AutoReplyForm;
  ip: string;
}): Promise<AutoReplyResult> {
  const table = envVars.LEAD_AUTOREPLY_TABLE?.trim();
  const apiKey = envVars.RESEND_API_KEY?.trim();
  const from = envVars.LEAD_EMAIL_FROM?.trim();
  if (!table || !apiKey || !from) {
    return 'off';
  }
  const email = to.trim().toLowerCase();
  const now = Math.floor(Date.now() / 1000);

  if (!(await underIpLimit(table, ip, now))) {
    return 'ip-limit';
  }
  if (!(await firstReplyForAddress(table, email, form, now))) {
    return 'already-replied';
  }

  const reply = buildAutoReply(form);
  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: SITE_EMAIL,
      subject: reply.subject,
      text: reply.text,
      html: reply.html,
    }),
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}: ${await response.text()}`);
  }
  return 'sent';
}
