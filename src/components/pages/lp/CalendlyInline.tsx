'use client';

import { CalendarClock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SITE_EMAIL, SITE_EMAIL_HREF } from '@/constants/site';
import {
  CALENDLY_ENABLED,
  calendlyBookingUrl,
  listenForCalendlyBookings,
  loadCalendlyWidget,
} from '@/lib/calendly';

/** Calendly sizes its inline calendar to the box it is given, so the box sets its height. */
const HEIGHT_CLASS = 'h-[700px]';

/** Hides Calendly's own header, which repeats what the page already says, and uses our orange. */
const INLINE_OPTIONS = {
  hide_event_type_details: '1',
  hide_landing_page_details: '1',
  primary_color: 'e77725',
};

/**
 * The booking calendar, embedded in the page so visitors book without leaving it. Calendly's
 * script and iframe load once the box is near the screen, so they never hold up the first paint.
 * Calendly keeps its own cookie notice inside the calendar, which covers its cookies.
 */
export default function CalendlyInline() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'waiting' | 'loading' | 'ready' | 'failed'>('waiting');
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  // One booking listener for the page: this is the only Calendly on it.
  useEffect(() => (CALENDLY_ENABLED ? listenForCalendlyBookings() : undefined), []);

  useEffect(() => {
    const box = boxRef.current;
    if (!CALENDLY_ENABLED || !box) {
      return;
    }
    const url = calendlyBookingUrl(INLINE_OPTIONS);
    setFallbackUrl(url);

    let cancelled = false;
    let started = false;
    const start = () => {
      if (started) {
        return;
      }
      started = true;
      observer.disconnect();
      window.clearTimeout(fallback);
      setState('loading');
      loadCalendlyWidget()
        .then((calendly) => {
          if (cancelled) {
            return;
          }
          box.replaceChildren();
          calendly.initInlineWidget({ url, parentElement: box });
          setState('ready');
        })
        .catch(() => {
          if (!cancelled) {
            setState('failed');
          }
        });
    };

    // A box hidden with display:none (the form tab on phones) never intersects, so the calendar
    // only loads once someone can see it.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(box);
    // Some in-app browsers report intersections late. The calendar is near the top of the page,
    // so load it after a few seconds anyway, as long as it is showing.
    const fallback = window.setTimeout(() => {
      if (box.offsetParent !== null) {
        start();
      }
    }, 3000);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  if (!CALENDLY_ENABLED) {
    return (
      <div className="rounded-md border border-neutral-200 bg-neutral-50 p-lg text-sm text-neutral-700">
        Online booking isn’t available right now. Email{' '}
        <a href={SITE_EMAIL_HREF} className="font-semibold text-primary">
          {SITE_EMAIL}
        </a>{' '}
        or send the form, and we’ll set up a time.
      </div>
    );
  }

  return (
    <div>
      <div className={`relative ${HEIGHT_CLASS} overflow-hidden rounded-md bg-white`}>
        {state !== 'ready' ? (
          <div
            aria-hidden={state !== 'failed'}
            className="absolute inset-0 flex flex-col items-center justify-center gap-md p-lg text-center"
          >
            <CalendarClock className="h-8 w-8 text-primary/60" aria-hidden />
            {state === 'failed' ? (
              <p className="max-w-[20rem] text-sm text-neutral-700">
                The calendar didn’t load here.{' '}
                {fallbackUrl ? (
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline"
                  >
                    Open it in a new tab
                  </a>
                ) : null}{' '}
                or send the form instead.
              </p>
            ) : (
              <p className="text-sm text-neutral-600">Loading available times…</p>
            )}
          </div>
        ) : null}
        {/* Calendly puts its iframe in here. React renders nothing inside it. */}
        <div ref={boxRef} className="relative h-full w-full" />
      </div>
      {fallbackUrl && state !== 'failed' ? (
        <p className="mt-sm text-center text-xs text-neutral-600">
          Calendar not working?{' '}
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-700 underline hover:text-primary"
          >
            Open it in a new tab
          </a>
        </p>
      ) : null}
    </div>
  );
}
