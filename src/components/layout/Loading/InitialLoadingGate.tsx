'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import InitialLoadingScreen from './InitialLoadingScreen';

export default function InitialLoadingGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setReady(true);
  }, []);

  // Ads landing pages show their content straight away: a cover until the scripts load would
  // slow the first view and cost bookings, mostly on phones.
  const skip = pathname?.startsWith('/lp/');

  return (
    <>
      {ready || skip ? null : (
        <div className="initial-load-gate fixed inset-0 z-100">
          <InitialLoadingScreen />
        </div>
      )}
      {children}
    </>
  );
}
