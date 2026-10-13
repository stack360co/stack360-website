'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { ContactSkeleton } from './ContactSkeleton';
import GeneralLoadingScreen from './GeneralLoadingScreen';
import HeroSectionLoading from './HeroSectionLoading';
import OpenRolesSkeleton from './open-role-skeleton';

/** Wait this long before showing a screen, so prefetched pages switch without a flash. */
const SHOW_AFTER_MS = 150;
/** Give up if a navigation never lands (cancelled, or the click wasn't really a navigation). */
const GIVE_UP_AFTER_MS = 8000;

/**
 * The section loading screens, shown while a link to that section loads. These used to be
 * route `loading.tsx` files, but those wrap every page in a Suspense boundary, and a static
 * page then ships its content in a hidden block that only JavaScript reveals, so crawlers
 * that don't run JavaScript saw a loading screen instead of the page.
 */
function screenFor(path: string): ReactNode {
  if (path === '/') {
    return <HeroSectionLoading hideNavbar />;
  }
  if (path === '/contact' || path.startsWith('/contact/')) {
    return (
      <>
        <GeneralLoadingScreen hideBody />
        <ContactSkeleton />
      </>
    );
  }
  if (path.startsWith('/work-with-us/careers')) {
    return (
      <>
        <GeneralLoadingScreen hideBody />
        <OpenRolesSkeleton />
      </>
    );
  }
  return <GeneralLoadingScreen />;
}

type Pending = { from: string; to: string };

/** Only plain left-clicks on same-site links to another page start a navigation we cover. */
function navigationTarget(event: MouseEvent): string | null {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return null;
  }
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download')) {
    return null;
  }
  if (anchor.target && anchor.target !== '_self') {
    return null;
  }
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
    return null;
  }
  return url.pathname;
}

export default function RouteLoadingOverlay() {
  const pathname = usePathname();
  const [pending, setPending] = useState<Pending | null>(null);
  const [shownFor, setShownFor] = useState(pathname);

  // A new route has rendered: drop the screen (reset during render, not in an effect).
  if (pathname !== shownFor) {
    setShownFor(pathname);
    setPending(null);
  }

  useEffect(() => {
    let showTimer: number | undefined;
    let giveUpTimer: number | undefined;

    const onClick = (event: MouseEvent) => {
      const to = navigationTarget(event);
      if (!to) {
        return;
      }
      const from = window.location.pathname;
      window.clearTimeout(showTimer);
      window.clearTimeout(giveUpTimer);
      showTimer = window.setTimeout(() => {
        if (window.location.pathname === from) {
          setPending({ from, to });
        }
      }, SHOW_AFTER_MS);
      giveUpTimer = window.setTimeout(() => setPending(null), GIVE_UP_AFTER_MS);
    };
    const onPopState = () => {
      window.clearTimeout(showTimer);
      setPending(null);
    };

    document.addEventListener('click', onClick);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('popstate', onPopState);
      window.clearTimeout(showTimer);
      window.clearTimeout(giveUpTimer);
    };
  }, []);

  if (!pending || pending.from !== pathname) {
    return null;
  }

  return (
    <output
      aria-live="polite"
      className="fixed inset-x-0 top-18 bottom-0 z-40 block overflow-hidden bg-neutral-50"
    >
      <span className="sr-only">Loading page…</span>
      {screenFor(pending.to)}
    </output>
  );
}
