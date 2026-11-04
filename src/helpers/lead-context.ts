import { z } from 'zod';

/** Every field is optional: older pages send no context, and a bad value just drops out. */
const field = z.string().trim().max(200).optional().catch(undefined);

export const leadContextSchema = z
  .object({
    page: field,
    referrer: field,
    firstPage: field,
    firstReferrer: field,
    utmSource: field,
    utmMedium: field,
    utmCampaign: field,
  })
  .catch({});

export type LeadContextData = z.infer<typeof leadContextSchema>;

const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\./, 'Google search'],
  [/(^|\.)bing\.com$/, 'Bing'],
  [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, 'LinkedIn'],
  [/(^|\.)clutch\.co$/, 'Clutch'],
  [/(^|\.)designrush\.com$/, 'DesignRush'],
  [/(^|\.)goodfirms\.co$/, 'GoodFirms'],
  [/(^|\.)techbehemoths\.com$/, 'TechBehemoths'],
  [/(^|\.)(chatgpt|openai)\.com$/, 'ChatGPT'],
  [/(^|\.)perplexity\.ai$/, 'Perplexity'],
  [/(^|\.)(facebook|fb)\.com$/, 'Facebook'],
  [/(^|\.)instagram\.com$/, 'Instagram'],
  [/(^|\.)(x|twitter)\.com$|^t\.co$/, 'X (Twitter)'],
  [/(^|\.)github\.com$/, 'GitHub'],
  [/(^|\.)upwork\.com$/, 'Upwork'],
  [/(^|\.)fiverr\.com$/, 'Fiverr'],
];

const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'mail.com',
  'yandex.com',
]);

function foundVia(context: LeadContextData): string {
  if (context.utmCampaign?.startsWith('gbp')) {
    return 'Google Business Profile';
  }
  if (context.utmSource) {
    return [context.utmSource, context.utmMedium, context.utmCampaign].filter(Boolean).join(' / ');
  }
  const host = context.firstReferrer ?? context.referrer;
  if (!host) {
    return 'Direct (typed the address, a bookmark or an app)';
  }
  return SOURCES.find(([pattern]) => pattern.test(host))?.[1] ?? host;
}

/** Netlify adds the visitor's approximate location as base64 JSON in `x-nf-geo`. */
function location(headers: Headers): string | undefined {
  const geo = headers.get('x-nf-geo');
  if (geo) {
    try {
      const data = JSON.parse(Buffer.from(geo, 'base64').toString('utf8'));
      const place = [data.city, data.subdivision?.name, data.country?.name ?? data.country?.code]
        .filter(Boolean)
        .join(', ');
      if (place) {
        return place;
      }
    } catch {
      // Fall through to the country header.
    }
  }
  return headers.get('x-country') ?? undefined;
}

function emailType(email: string): string | undefined {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return undefined;
  }
  return PERSONAL_EMAIL_DOMAINS.has(domain) ? `Personal (${domain})` : `Work (${domain})`;
}

/** The "Lead context" lines added under each enquiry in Mattermost. */
export function describeLead({
  context,
  email,
  headers,
}: {
  context: LeadContextData;
  email: string;
  headers: Headers;
}): { label: string; value?: string }[] {
  const userAgent = headers.get('user-agent') ?? '';
  return [
    { label: 'Found us via', value: foundVia(context) },
    { label: 'First page', value: context.firstPage },
    { label: 'Sent from', value: context.page },
    { label: 'Location', value: location(headers) },
    { label: 'Device', value: /Mobi|Android|iPhone|iPad/i.test(userAgent) ? 'Mobile' : 'Desktop' },
    { label: 'Email', value: emailType(email) },
  ];
}
