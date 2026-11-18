'use client';

import { useEffect, useState } from 'react';
import InitialLoadingScreen from './InitialLoadingScreen';

/**
 * The cover shown until the site's scripts load. Only the main site's (pages) layout uses it: the
 * ads landing pages show their content straight away, because a cover would slow the first view and
 * cost bookings, mostly on phones.
 */
export default function InitialLoadingGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? null : (
        <div className="initial-load-gate fixed inset-0 z-100">
          <InitialLoadingScreen />
        </div>
      )}
      {children}
    </>
  );
}
