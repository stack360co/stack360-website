import { z } from 'zod';

/** Every field is optional: older pages send no context, and a bad value just drops out. */
const field = z.string().trim().max(200).optional().catch(undefined);
const clickId = z
  .string()
  .regex(/^[A-Za-z0-9_-]{8,200}$/)
  .optional()
  .catch(undefined);
const timestamp = z.iso.datetime().optional().catch(undefined);

export const leadContextSchema = z
  .object({
    page: field,
    referrer: field,
    firstPage: field,
    firstReferrer: field,
    firstSeenAt: timestamp,
    utmSource: field,
    utmMedium: field,
    utmCampaign: field,
    utmTerm: field,
    utmContent: field,
    gclid: clickId,
    gbraid: clickId,
    wbraid: clickId,
    clickAt: timestamp,
    adConsent: z.enum(['granted', 'denied', 'not_required', 'unknown']).optional().catch(undefined),
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

/** CloudFront headers can be URL-encoded (cities with accents); a bad value is just left out. */
function headerText(headers: Headers, name: string): string | undefined {
  const value = headers.get(name)?.trim();
  if (!value) {
    return undefined;
  }
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * The visitor's approximate location. On AWS Amplify, CloudFront sends `cloudfront-viewer-*`
 * headers. On Netlify (the previous host, kept as a fallback) it came as base64 JSON in `x-nf-geo`.
 */
export function location(headers: Headers): string | undefined {
  const cloudfront = [
    headerText(headers, 'cloudfront-viewer-city'),
    headerText(headers, 'cloudfront-viewer-country-region-name'),
    headerText(headers, 'cloudfront-viewer-country-name') ??
      headerText(headers, 'cloudfront-viewer-country'),
  ]
    .filter(Boolean)
    .join(', ');
  if (cloudfront) {
    return cloudfront;
  }
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

/** Company domains younger than this are flagged: fake firms usually register one for the scam. */
const NEW_DOMAIN_DAYS = 180;

/**
 * When the sender's company domain was registered, from the public RDAP registry. Personal
 * addresses are skipped, and a slow or failed lookup just leaves the line out.
 */
export async function domainAge(email: string): Promise<string | undefined> {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain || PERSONAL_EMAIL_DOMAINS.has(domain)) {
    return undefined;
  }
  try {
    // rdap.org turns away requests that don't name themselves.
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: { accept: 'application/rdap+json', 'user-agent': 'stack360.co-lead-check/1.0' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      return undefined;
    }
    const data = (await res.json()) as { events?: { eventAction?: string; eventDate?: string }[] };
    const registered = data.events?.find(
      (event) => event.eventAction === 'registration'
    )?.eventDate;
    if (!registered) {
      return undefined;
    }
    const date = new Date(registered);
    const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
    const label = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return days < NEW_DOMAIN_DAYS
      ? `⚠️ ${domain} registered ${label}, only ${days} days ago. Check the company is real before replying.`
      : `${domain} registered ${label}`;
  } catch {
    return undefined;
  }
}

const CONSENT_LABELS = {
  granted: 'granted',
  not_required: 'not required (outside the UK and EU)',
  denied: 'not given (do not send to Google Ads)',
  unknown: 'not answered yet (do not send to Google Ads)',
} as const;

/** The Google Ads click behind this lead, shown only when the visitor allowed advertising. */
function adClick(context: LeadContextData): { id?: string; at?: string } {
  if (context.adConsent !== 'granted' && context.adConsent !== 'not_required') {
    return {};
  }
  const [type, id] = context.gclid
    ? ['gclid', context.gclid]
    : context.gbraid
      ? ['gbraid', context.gbraid]
      : context.wbraid
        ? ['wbraid', context.wbraid]
        : [];
  return id ? { id: `${type} ${id}`, at: context.clickAt } : {};
}

/**
 * The "Lead context" lines added under each enquiry in Mattermost and the sales@ email. Each line
 * is "Label: value", so Claude's routines can copy them into the CRM.
 */
export function describeLead({
  context,
  domain,
  email,
  headers,
}: {
  context: LeadContextData;
  domain?: string;
  email?: string;
  headers: Headers;
}): { label: string; value?: string }[] {
  const userAgent = headers.get('user-agent') ?? '';
  const click = adClick(context);
  return [
    { label: 'Found us via', value: foundVia(context) },
    { label: 'Keyword', value: context.utmTerm },
    { label: 'Ad content', value: context.utmContent },
    { label: 'First page', value: context.firstPage },
    { label: 'First visit', value: context.firstSeenAt },
    { label: 'Sent from', value: context.page },
    { label: 'Location', value: location(headers) },
    { label: 'Device', value: /Mobi|Android|iPhone|iPad/i.test(userAgent) ? 'Mobile' : 'Desktop' },
    { label: 'Email', value: email ? emailType(email) : undefined },
    { label: 'Domain', value: domain },
    { label: 'Ad click ID', value: click.id },
    { label: 'Ad clicked', value: click.at },
    { label: 'Ad consent', value: context.adConsent && CONSENT_LABELS[context.adConsent] },
  ];
}
