'use client';

import { CalendarClock } from 'lucide-react';
import { useEffect } from 'react';
import { pushEvent } from '@/lib/analytics';

/**
 * "Book a 20-minute call" card for the contact channels. Shown only when
 * NEXT_PUBLIC_CALENDLY_URL is set (a https://calendly.com/... link).
 * Calendly's widget script loads on first click, not on page load, and a
 * completed booking is sent to GA4 as a lead.
 */
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '';
const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (options: { url: string }) => void };
};

function loadWidget(): Promise<void> {
  const w = window as CalendlyWindow;
  if (w.Calendly) {
    return Promise.resolve();
  }
  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = WIDGET_CSS;
    document.head.appendChild(css);
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly widget failed to load'));
    document.head.appendChild(script);
  });
}

export default function BookCallButton() {
  const enabled = /^https:\/\/calendly\.com\/.+/.test(CALENDLY_URL);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin === 'https://calendly.com' &&
        event.data?.event === 'calendly.event_scheduled'
      ) {
        pushEvent('generate_lead', { form_name: 'calendly' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const openBooking = async () => {
    pushEvent('book_call_click', { link_url: CALENDLY_URL });
    try {
      await loadWidget();
      (window as CalendlyWindow).Calendly?.initPopupWidget({ url: CALENDLY_URL });
    } catch {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      type="button"
      onClick={openBooking}
      className="group flex w-full items-start gap-md rounded-lg border border-primary/30 bg-primary/5 p-lg text-left transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-neutral-50 text-primary">
        <CalendarClock size={18} aria-hidden />
      </span>
      <span>
        <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-600">
          Video call
        </span>
        <span className="mt-xs block text-base font-semibold text-neutral-900 group-hover:text-primary">
          Book a 20-minute call
        </span>
        <span className="mt-xs block text-xs text-neutral-600">
          Pick a time that suits you and talk it through with a lead engineer.
        </span>
      </span>
    </button>
  );
}
