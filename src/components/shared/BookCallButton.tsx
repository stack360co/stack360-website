'use client';

import { CalendarClock } from 'lucide-react';
import { useEffect } from 'react';
import { pushEvent } from '@/lib/analytics';
import {
  CALENDLY_ENABLED,
  CALENDLY_URL,
  calendlyBookingUrl,
  listenForCalendlyBookings,
  loadCalendlyWidget,
} from '@/lib/calendly';

/**
 * "Book a 20-minute call" card for the contact channels. Shown only when
 * NEXT_PUBLIC_CALENDLY_URL is set (a https://calendly.com/... link).
 * Calendly's widget script loads on first click, not on page load. A completed
 * booking is sent to GA4 as a lead, and to Mattermost and sales@ with how the
 * visitor found us, so Claude can add it to the CRM with its source.
 */
export default function BookCallButton() {
  useEffect(() => (CALENDLY_ENABLED ? listenForCalendlyBookings() : undefined), []);

  if (!CALENDLY_ENABLED) {
    return null;
  }

  const openBooking = async () => {
    const bookingUrl = calendlyBookingUrl();
    pushEvent('book_call_click', { link_url: CALENDLY_URL });
    try {
      const calendly = await loadCalendlyWidget();
      calendly.initPopupWidget({ url: bookingUrl });
    } catch {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
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
