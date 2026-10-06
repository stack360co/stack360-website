/**
 * Google Tag Manager with Consent Mode v2.
 *
 * GTM-KSZS2L2N holds the GA4 tag (G-5BZT5BBET2) and the lead events, so tags change in Tag
 * Manager, not here. Visitors in the EEA, the UK and Switzerland must opt in before analytics
 * cookies are set, so their consent starts denied (Google resolves the region from the IP).
 * Everyone else starts granted and can opt out from "Cookie settings" in the footer. Ad signals
 * are denied everywhere because the site runs no ads; grant them here before adding ad tags.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-KSZS2L2N';

export type ConsentChoice = 'granted' | 'denied';

const CONSENT_KEY = 'stack360_consent';
export const CONSENT_REOPEN_EVENT = 'stack360:consent-reopen';

const CONSENT_REGIONS = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
  'CH',
];

/**
 * Runs inline in <head>: consent defaults first, then any stored choice, then the GTM loader, so
 * the container's first hit already carries the right consent state.
 */
export const GTM_HEAD_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500, region: ${JSON.stringify(CONSENT_REGIONS)} });
try {
  var c = localStorage.getItem('${CONSENT_KEY}');
  if (c === 'granted' || c === 'denied') gtag('consent', 'update', { analytics_storage: c });
} catch (e) {}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`.trim();

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Blocked storage still applies the choice to this page view.
  }
  window.gtag?.('consent', 'update', { analytics_storage: choice });
}

/**
 * The banner only shows where opt-in is required. The time zone stands in for the visitor's
 * country on the client and errs towards asking: any European zone counts, plus the Atlantic
 * islands of Spain and Portugal.
 */
export function needsConsentBanner(): boolean {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    return (
      zone.startsWith('Europe/') ||
      [
        'Atlantic/Canary',
        'Atlantic/Madeira',
        'Atlantic/Azores',
        'Atlantic/Reykjavik',
        'Atlantic/Faroe',
        'Africa/Ceuta',
      ].includes(zone)
    );
  } catch {
    return true;
  }
}

/** Pushes an event for GTM; the container decides what, if anything, it becomes. */
export function pushEvent(event: string, params: Record<string, string> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
