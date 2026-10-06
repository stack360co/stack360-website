'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  CONSENT_REOPEN_EVENT,
  type ConsentChoice,
  needsConsentBanner,
  readConsent,
  saveConsent,
} from '@/lib/analytics';

/** Withdrawing consent has to be as easy as giving it, so this lives in the footer. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The stored choice and the time zone are only known in the browser.
    if (readConsent() === null && needsConsentBanner()) {
      setOpen(true);
    }
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  if (!open) {
    return null;
  }

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-70 p-sm sm:p-md"
    >
      <div className="site-container flex flex-col gap-md rounded-md border border-neutral-200 bg-neutral-50 p-lg shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-xl">
        <div className="space-y-xs">
          <p id="cookie-banner-title" className="text-sm font-bold text-neutral-900">
            Cookies on stack360.co
          </p>
          <p className="text-pretty text-sm leading-relaxed text-neutral-600">
            We&apos;d like to use Google Analytics cookies to understand how people find and use
            this site. You can change your choice any time from Cookie settings in the footer.{' '}
            <Link href="/privacy#cookies" className="font-bold text-primary underline">
              Privacy policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-sm">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm border border-neutral-300 bg-neutral-50 px-lg text-sm font-bold text-neutral-800 transition-colors hover:border-neutral-500 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-sm bg-primary px-lg text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
