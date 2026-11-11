import { envVars } from '@/config/env';
import { SITE_EMAIL } from '@/constants/site';
import type { FormSummary, KeyValuePair } from '@/helpers/markdown';

const RESEND_URL = 'https://api.resend.com/emails';

/**
 * Every lead email's subject starts with this, so a Gmail filter or search can keep website leads
 * apart from the reports that also arrive at sales@.
 */
export const LEAD_SUBJECT_PREFIX = '[Website lead]';

export type LeadEmail = { subject: string; text: string };

/** Visitor text in a subject line: one line, and short enough to read in an inbox. */
function oneLine(value: string, max: number): string {
  const flat = value.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/** The plain-text email sent to sales@ for each enquiry, alongside the Mattermost post. */
export function buildLeadEmail(
  summary: FormSummary,
  leadContext: KeyValuePair[],
  person: { name: string; email: string; company?: string }
): LeadEmail {
  const newDomain = leadContext.some(
    ({ label, value }) => label === 'Domain' && value?.startsWith('⚠️')
  );
  const who = person.company
    ? `${oneLine(person.name, 60)} (${oneLine(person.company, 60)})`
    : oneLine(person.name, 60);
  const subject = [LEAD_SUBJECT_PREFIX, newDomain ? '⚠️ New domain ·' : '', `${summary.label}:`, who]
    .filter(Boolean)
    .join(' ');

  const lines = (pairs: KeyValuePair[]) =>
    pairs.filter(({ value }) => value).map(({ label, value }) => `${label}: ${value}`);

  const sections = [
    `${summary.label} from stack360.co`,
    lines(summary.fields).join('\n'),
    summary.bodyContent ? `${summary.bodyHeader ?? 'Message'}:\n${summary.bodyContent}` : '',
    leadContext.some(({ value }) => value)
      ? ['Lead context', ...lines(leadContext)].join('\n')
      : '',
    `Replying goes straight to ${person.email}. If anything looks off, run the scam checklist first.`,
  ];
  return { subject, text: sections.filter(Boolean).join('\n\n') };
}

/**
 * Sends the lead email through Resend. Without RESEND_API_KEY and LEAD_EMAIL_FROM it does nothing,
 * so the site can deploy before the sender is set up.
 */
export async function sendLeadEmail(
  email: LeadEmail,
  replyTo: string
): Promise<'sent' | 'skipped'> {
  const apiKey = envVars.RESEND_API_KEY?.trim();
  const from = envVars.LEAD_EMAIL_FROM?.trim();
  if (!apiKey || !from) {
    console.warn('Lead email skipped: RESEND_API_KEY and LEAD_EMAIL_FROM are not both set.');
    return 'skipped';
  }

  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [SITE_EMAIL],
      reply_to: replyTo,
      subject: email.subject,
      text: email.text,
    }),
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}: ${await response.text()}`);
  }
  return 'sent';
}
