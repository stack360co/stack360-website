import { needsConsentBanner, readConsent } from '@/lib/analytics';

export type AdConsent = 'granted' | 'denied' | 'not_required' | 'unknown';

/**
 * Where an enquiry came from, sent with the contact and hire forms and with website Calendly
 * bookings, so Mattermost, the sales@ email and the CRM show how the person found us. Referrers
 * are reduced to their host: a full URL can carry search terms or another site's query string.
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
  /** When that first visit happened (ISO). */
  firstSeenAt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  /** For Google Ads, the keyword (the campaigns' Final URL suffix sets utm_term={keyword}). */
  utmTerm?: string;
  /** For Google Ads, the ad group or ad. */
  utmContent?: string;
  /** Google Ads click IDs from the latest ad click. Sent only when advertising is allowed. */
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  /** When that ad click happened (ISO). */
  clickAt?: string;
  /** Whether the visitor allowed advertising: decides if the lead may be reported to Google Ads. */
  adConsent?: AdConsent;
};

type AdClick = Pick<LeadContext, 'gclid' | 'gbraid' | 'wbraid' | 'clickAt'>;

const FIRST_VISIT_KEY = 'stack360_first_visit';
const AD_CLICK_KEY = 'stack360_ad_click';
/** Google Ads only accepts conversions within 90 days of the click. */
const AD_CLICK_MAX_AGE_MS = 90 * 86_400_000;
const CLICK_ID = /^[A-Za-z0-9_-]{8,200}$/;

/** Kept in memory for this tab even when consent rules out storing them. */
let sessionFirstVisit: LeadContext | null = null;
let sessionAdClick: AdClick | null = null;

function referrerHost(): string | undefined {
  try {
    const host = new URL(document.referrer).hostname;
    return host && host !== window.location.hostname ? host : undefined;
  } catch {
    return undefined;
  }
}

function utmFromUrl(): Pick<
  LeadContext,
  'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmTerm' | 'utmContent'
> {
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => params.get(key)?.slice(0, 100) || undefined;
  return {
    utmSource: pick('utm_source'),
    utmMedium: pick('utm_medium'),
    utmCampaign: pick('utm_campaign'),
    utmTerm: pick('utm_term'),
    utmContent: pick('utm_content'),
  };
}

/** Google Ads adds gclid to ad clicks (gbraid or wbraid instead on some iOS traffic). */
function adClickFromUrl(): AdClick | null {
  const params = new URLSearchParams(window.location.search);
  const id = (key: string) => {
    const value = params.get(key);
    return value && CLICK_ID.test(value) ? value : undefined;
  };
  const click = { gclid: id('gclid'), gbraid: id('gbraid'), wbraid: id('wbraid') };
  return click.gclid || click.gbraid || click.wbraid
    ? { ...click, clickAt: new Date().toISOString() }
    : null;
}

/** Storing the first visit across sessions needs the same consent as analytics. */
function mayStore(): boolean {
  const choice = readConsent();
  return choice === 'all' || choice === 'analytics' || (choice === null && !needsConsentBanner());
}

/** Ad click IDs are advertising data, so they follow the advertising choice in the banner. */
function adConsent(): AdConsent {
  const choice = readConsent();
  if (choice === 'all') {
    return 'granted';
  }
  if (choice === 'analytics' || choice === 'denied') {
    return 'denied';
  }
  return needsConsentBanner() ? 'unknown' : 'not_required';
}

const adAllowed = (consent: AdConsent) => consent === 'granted' || consent === 'not_required';

function readStored<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function storedAdClick(): AdClick | null {
  const click = readStored<AdClick>(AD_CLICK_KEY);
  if (!click?.clickAt || Date.now() - Date.parse(click.clickAt) > AD_CLICK_MAX_AGE_MS) {
    return null;
  }
  return click;
}

/**
 * Runs on each full page load, so an enquiry sent days later still shows how they arrived. The
 * first visit is kept once; an ad click replaces any earlier one, because Google credits the last
 * click.
 */
export function rememberFirstVisit() {
  const click = adClickFromUrl();
  if (click) {
    sessionAdClick = click;
    if (adAllowed(adConsent())) {
      try {
        window.localStorage.setItem(AD_CLICK_KEY, JSON.stringify(click));
      } catch {
        // Blocked storage still leaves this tab's click in memory.
      }
    }
  }

  if (sessionFirstVisit) {
    return;
  }
  sessionFirstVisit = {
    firstPage: window.location.pathname,
    firstReferrer: referrerHost(),
    firstSeenAt: new Date().toISOString(),
    ...utmFromUrl(),
  };
  if (!mayStore() || readStored(FIRST_VISIT_KEY)) {
    return;
  }
  try {
    window.localStorage.setItem(FIRST_VISIT_KEY, JSON.stringify(sessionFirstVisit));
  } catch {
    // Blocked storage still leaves this tab's first visit in memory.
  }
}

/**
 * The context sent with a form or booking: the earliest known visit, the page being submitted
 * from and, when advertising is allowed, the latest Google Ads click.
 */
export function leadContext(): LeadContext {
  const first = readStored<LeadContext>(FIRST_VISIT_KEY) ?? sessionFirstVisit ?? {};
  const current = utmFromUrl();
  const consent = adConsent();
  const click = adAllowed(consent) ? (sessionAdClick ?? storedAdClick()) : null;
  return {
    page: window.location.pathname,
    referrer: referrerHost(),
    firstPage: first.firstPage,
    firstReferrer: first.firstReferrer,
    firstSeenAt: first.firstSeenAt,
    utmSource: first.utmSource ?? current.utmSource,
    utmMedium: first.utmMedium ?? current.utmMedium,
    utmCampaign: first.utmCampaign ?? current.utmCampaign,
    utmTerm: first.utmTerm ?? current.utmTerm,
    utmContent: first.utmContent ?? current.utmContent,
    ...click,
    adConsent: consent,
  };
}
