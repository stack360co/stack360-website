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

/** The first signs that someone is using the page, as opposed to a page-speed test loading it. */
const ENGAGE_EVENTS = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel', 'scroll'];

/**
 * The booking calendar, embedded in the page so visitors book without leaving it. Calendly's frame
 * brings about 4.5 MB of its own scripts (Stripe, reCAPTCHA, its analytics), so it loads on the
 * visitor's first tap, scroll, key press or mouse move once the box is near the screen, or when they
 * press "Show available times". Until then the page stays light on a phone.
 * Calendly keeps its own cookie notice inside the calendar, which covers its cookies.
 */
export default function CalendlyInline() {
  const boxRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<(() => void) | null>(null);
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
    let engaged = false;
    let near = false;
    const stopListening = () => {
      for (const type of ENGAGE_EVENTS) {
        window.removeEventListener(type, onEngage, true);
      }
    };
    const start = () => {
      if (started) {
        return;
      }
      started = true;
      observer.disconnect();
      stopListening();
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

    startRef.current = start;

    // Showing and within 400px of the screen. Checked directly too, because some in-app browsers
    // report intersections late.
    const nearScreen = () =>
      box.offsetParent !== null && box.getBoundingClientRect().top < window.innerHeight + 400;

    function onEngage(event: Event) {
      if (event.type === 'pointermove' && (event as PointerEvent).pointerType !== 'mouse') {
        return;
      }
      engaged = true;
      stopListening();
      // After the interaction's next paint, so measuring the box and starting the load never slow
      // the response to the first tap (INP).
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          if (!cancelled && (near || nearScreen())) {
            start();
          }
        }, 0);
      });
    }
    for (const type of ENGAGE_EVENTS) {
      window.addEventListener(type, onEngage, { capture: true, passive: true });
    }

    // A box hidden with display:none (the form tab on phones) never intersects, so the calendar
    // only loads once someone can see it.
    const observer = new IntersectionObserver(
      (entries) => {
        near = entries.some((entry) => entry.isIntersecting);
        if (near && engaged) {
          start();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(box);
    return () => {
      cancelled = true;
      startRef.current = null;
      observer.disconnect();
      stopListening();
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
            aria-hidden={state === 'loading'}
            className="absolute inset-0 flex flex-col items-center justify-center gap-md p-lg text-center"
          >
            <CalendarClock className="h-8 w-8 text-primary/60" aria-hidden />
            {state === 'waiting' ? (
              <>
                <p className="max-w-[20rem] text-sm text-neutral-700">
                  Pick a time for your free 20-minute call.
                </p>
                <button
                  type="button"
                  onClick={() => startRef.current?.()}
                  className="inline-flex min-h-11 items-center justify-center gap-xs rounded-sm bg-primary px-lg py-sm text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Show available times
                </button>
              </>
            ) : state === 'failed' ? (
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
