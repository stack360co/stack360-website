'use client';

import { useInView } from 'motion/react';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    CLUTCHCO?: { Init: () => void };
  }
}

/**
 * Clutch's and DesignRush's own review widgets. Nothing loads until the footer is close to the
 * screen, so neither holds up the page. Both of their loaders only start on page load, which has
 * passed by then, so each is started here instead: Clutch's Init once its script is ready, and
 * DesignRush's widget fetched the same way their loader fetches it.
 */
export default function ReviewWidgets() {
  const designRushRef = useRef<HTMLDivElement>(null);
  const near = useInView(designRushRef, { once: true, margin: '400px' });

  useEffect(() => {
    const container = designRushRef.current;
    if (!near || !container) {
      return;
    }

    const controller = new AbortController();
    fetch('https://www.designrush.com/api/widgets/agency-reviews?agency_id=111856&style=light', {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.text() : ''))
      .then((html) => {
        container.innerHTML = html;
      })
      .catch(() => {
        // The profile link under the badges still points visitors to DesignRush.
      });

    return () => controller.abort();
  }, [near]);

  return (
    <>
      <div
        className="clutch-widget w-[132px]"
        data-url="https://widget.clutch.co"
        data-widget-type="1"
        data-height="40"
        data-nofollow="true"
        data-expandifr="true"
        data-scale="100"
        data-clutchcompany-id="2029901"
      />
      <div ref={designRushRef} className="min-h-[74px] w-[188px]" />
      {near ? (
        <Script
          src="https://widget.clutch.co/static/js/widget.js"
          onReady={() => window.CLUTCHCO?.Init()}
        />
      ) : null}
    </>
  );
}
