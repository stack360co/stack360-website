'use client';

import { CalendarClock, MessageCircle, Send } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import CalendlyInline from './CalendlyInline';
import LpLeadForm from './LpLeadForm';

type Panel = 'book' | 'form';

/**
 * The first screen: the pitch, the booking calendar and the short form. On wide screens the
 * calendar sits beside the pitch with the form under it. On phones a switch picks one of the two,
 * so both are a tap away without a long scroll.
 */
export default function LpHero({
  pitch,
  details,
  offerTitle,
  formTab,
  jobLabel,
  jobPlaceholder,
  whatsappHref,
}: {
  /** Headline and intro: first on every screen. */
  pitch: ReactNode;
  /** Checklist and ratings: under the pitch on wide screens, after the booking on phones. */
  details: ReactNode;
  offerTitle: string;
  formTab: string;
  jobLabel: string;
  jobPlaceholder: string;
  /** Click-to-chat link with this page in the message. */
  whatsappHref: string;
}) {
  const [panel, setPanel] = useState<Panel>('book');

  // The page's other "book" buttons link to #book; on phones the form may be showing instead.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.('a[href="#book"]')) {
        setPanel('book');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const tabClass = (active: boolean) =>
    `flex min-h-11 flex-1 items-center justify-center gap-xs rounded-sm px-sm text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
      active
        ? 'bg-neutral-50 text-neutral-900 shadow-sm'
        : 'text-neutral-600 hover:text-neutral-900'
    }`;

  const showBooking = () => {
    setPanel('book');
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="grid grid-cols-1 gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-2xl lg:gap-y-lg">
      <div className="lg:col-start-1 lg:row-start-1">{pitch}</div>
      <div className="order-last lg:order-none lg:col-start-1 lg:row-start-2">{details}</div>

      <fieldset
        aria-label="How would you like to get in touch?"
        className="flex gap-xs rounded-md border border-neutral-200 bg-neutral-100 p-xs lg:hidden"
      >
        <button
          type="button"
          aria-pressed={panel === 'book'}
          onClick={() => setPanel('book')}
          className={tabClass(panel === 'book')}
        >
          <CalendarClock className="h-4 w-4" aria-hidden />
          Book a time
        </button>
        <button
          type="button"
          aria-pressed={panel === 'form'}
          onClick={() => setPanel('form')}
          className={tabClass(panel === 'form')}
        >
          <Send className="h-4 w-4" aria-hidden />
          {formTab}
        </button>
      </fieldset>

      <section
        id="book"
        aria-labelledby="book-heading"
        // Calendly needs at least 320px, so on phones the calendar runs edge to edge.
        className={`-mx-lg scroll-mt-24 border-y border-neutral-200 bg-neutral-50 py-md sm:mx-0 sm:rounded-xl sm:border sm:p-lg sm:shadow-sm lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:block ${
          panel === 'book' ? '' : 'hidden'
        }`}
      >
        <div className="px-lg sm:px-0">
          <h2 id="book-heading" className="text-lg font-bold text-neutral-900">
            {offerTitle}
          </h2>
          <p className="mt-xs mb-md text-sm text-neutral-600">
            A founder and a senior engineer join the call. Pick a time below.
          </p>
        </div>
        <CalendlyInline />
        <p className="mt-sm px-lg text-center text-sm text-neutral-600 sm:px-0">
          Rather chat first?{' '}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-xs font-bold text-neutral-800 underline decoration-[#25D366] underline-offset-2 hover:text-neutral-900"
          >
            <MessageCircle size={14} className="text-[#1DA851]" aria-hidden />
            Message us on WhatsApp
          </a>
        </p>
      </section>

      <section
        aria-labelledby="form-heading"
        className={`rounded-xl border border-neutral-200 bg-neutral-50 p-md shadow-sm sm:p-lg lg:col-start-1 lg:row-start-3 lg:self-start lg:block ${
          panel === 'form' ? '' : 'hidden'
        }`}
      >
        <h2 id="form-heading" className="text-lg font-bold text-neutral-900">
          Or send us the details
        </h2>
        <p className="mt-xs mb-md text-sm text-neutral-600">
          No call needed. We reply within one business day.
        </p>
        <LpLeadForm
          jobLabel={jobLabel}
          jobPlaceholder={jobPlaceholder}
          onBookInstead={showBooking}
        />
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-sm inline-flex min-h-11 w-full items-center justify-center gap-xs rounded-sm border border-neutral-300 bg-neutral-50 px-lg text-sm font-bold text-neutral-800 transition-colors hover:border-[#25D366] hover:text-neutral-900"
        >
          <MessageCircle size={16} className="text-[#1DA851]" aria-hidden />
          Or message us on WhatsApp
        </a>
      </section>
    </div>
  );
}
