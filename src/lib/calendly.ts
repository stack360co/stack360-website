import { pushEvent } from '@/lib/analytics';
import { leadContext } from '@/lib/lead-context';

/**
 * Calendly for the website's booking button and the ads landing pages. Shown only when
 * NEXT_PUBLIC_CALENDLY_URL is set (a https://calendly.com/... link). The widget script loads when
 * it is needed, not with the page.
 */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '';
export const CALENDLY_ENABLED = /^https:\/\/calendly\.com\/.+/.test(CALENDLY_URL);

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

type CalendlyApi = {
  initPopupWidget: (options: { url: string }) => void;
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

type CalendlyWindow = Window & { Calendly?: CalendlyApi };

let widgetPromise: Promise<CalendlyApi> | null = null;

/** Loads Calendly's widget script and stylesheet once per page. */
export function loadCalendlyWidget(): Promise<CalendlyApi> {
  const w = window as CalendlyWindow;
  if (w.Calendly) {
    return Promise.resolve(w.Calendly);
  }
  if (widgetPromise) {
    return widgetPromise;
  }
  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = WIDGET_CSS;
    document.head.appendChild(css);
  }
  widgetPromise = new Promise<CalendlyApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => {
      const api = (window as CalendlyWindow).Calendly;
      if (api) {
        resolve(api);
      } else {
        reject(new Error('Calendly widget did not start'));
      }
    };
    script.onerror = () => reject(new Error('Calendly widget failed to load'));
    document.head.appendChild(script);
  }).catch((error) => {
    // A later attempt (another click, a remount) should be able to try again.
    widgetPromise = null;
    throw error;
  });
  return widgetPromise;
}

/**
 * The booking link with UTM tags, which show up on each booking in Calendly. The same link is used
 * in outbound email, so website bookings say "Website web form" and carry the page they came from.
 * Built by hand with encodeURIComponent: URLSearchParams turns spaces into "+", which Calendly's
 * widget re-encodes, so the booking would read "Website+web+form".
 */
export function calendlyBookingUrl(extra: Record<string, string> = {}): string {
  const tags = {
    utm_source: 'Website web form',
    utm_medium: 'stack360.co',
    utm_content: window.location.pathname,
    ...extra,
  };
  const query = Object.entries(tags)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return `${CALENDLY_URL}${CALENDLY_URL.includes('?') ? '&' : '?'}${query}`;
}

/**
 * Listens for a completed Calendly booking on this page. It is sent to GA4 as a lead, and to
 * Mattermost and sales@ with how the visitor found us, so Claude can add it to the CRM with its
 * source. Returns the function that stops listening. Use one listener per page, or a booking is
 * counted twice.
 */
export function listenForCalendlyBookings(): () => void {
  const onMessage = (event: MessageEvent) => {
    if (
      event.origin !== 'https://calendly.com' ||
      event.data?.event !== 'calendly.event_scheduled'
    ) {
      return;
    }
    pushEvent('generate_lead', { form_name: 'calendly' });
    const payload = event.data.payload ?? {};
    fetch('/api/contact/m-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'booking',
        inviteeUri: payload.invitee?.uri,
        eventUri: payload.event?.uri,
        context: leadContext(),
      }),
      keepalive: true,
    }).catch(() => {
      // Calendly already has the booking, so a failure loses nothing but its source.
    });
  };
  window.addEventListener('message', onMessage);
  return () => window.removeEventListener('message', onMessage);
}
