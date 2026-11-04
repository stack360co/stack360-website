import { needsConsentBanner, readConsent } from '@/lib/analytics';

/**
 * Where an enquiry came from, sent with the contact and hire forms so the Mattermost message says
 * how the person found us. Referrers are reduced to their host: a full URL can carry search terms
 * or another site's query string.
 */
export type LeadContext = {
  /** The page the form was sent from. */
  page?: string;
  /** The external site that sent this visit. */
  referrer?: string;
  /** The first page this visitor saw on the site. */
  firstPage?: string;
  /** The external site behind that first visit. */
  firstReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

const FIRST_VISIT_KEY = 'stack360_first_visit';

/** Kept in memory for this tab even when consent rules out storing it. */
let sessionFirstVisit: LeadContext | null = null;

function referrerHost(): string | undefined {
  try {
    const host = new URL(document.referrer).hostname;
    return host && host !== window.location.hostname ? host : undefined;
  } catch {
    return undefined;
  }
}

function utmFromUrl(): Pick<LeadContext, 'utmSource' | 'utmMedium' | 'utmCampaign'> {
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => params.get(key)?.slice(0, 100) || undefined;
  return {
    utmSource: pick('utm_source'),
    utmMedium: pick('utm_medium'),
    utmCampaign: pick('utm_campaign'),
  };
}

/** Storing the first visit across sessions needs the same consent as analytics. */
function mayStore(): boolean {
  const choice = readConsent();
  return choice === 'all' || choice === 'analytics' || (choice === null && !needsConsentBanner());
}

function readStoredFirstVisit(): LeadContext | null {
  try {
    const raw = window.localStorage.getItem(FIRST_VISIT_KEY);
    return raw ? (JSON.parse(raw) as LeadContext) : null;
  } catch {
    return null;
  }
}

/** Runs on the first page view, so an enquiry sent days later still shows how they arrived. */
export function rememberFirstVisit() {
  if (sessionFirstVisit) {
    return;
  }
  sessionFirstVisit = {
    firstPage: window.location.pathname,
    firstReferrer: referrerHost(),
    ...utmFromUrl(),
  };
  if (!mayStore() || readStoredFirstVisit()) {
    return;
  }
  try {
    window.localStorage.setItem(FIRST_VISIT_KEY, JSON.stringify(sessionFirstVisit));
  } catch {
    // Blocked storage still leaves this tab's first visit in memory.
  }
}

/** The context sent with a form: the earliest known visit plus the page being submitted from. */
export function leadContext(): LeadContext {
  const first = readStoredFirstVisit() ?? sessionFirstVisit ?? {};
  const current = utmFromUrl();
  return {
    page: window.location.pathname,
    referrer: referrerHost(),
    firstPage: first.firstPage,
    firstReferrer: first.firstReferrer,
    utmSource: first.utmSource ?? current.utmSource,
    utmMedium: first.utmMedium ?? current.utmMedium,
    utmCampaign: first.utmCampaign ?? current.utmCampaign,
  };
}
