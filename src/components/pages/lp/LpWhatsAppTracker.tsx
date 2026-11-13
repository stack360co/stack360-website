'use client';

import { useEffect } from 'react';
import { pushEvent } from '@/lib/analytics';
import { leadContext } from '@/lib/lead-context';

/**
 * Counts WhatsApp clicks on the landing pages as `whatsapp_click`, with the page, the ad keyword
 * and the click ID when advertising is allowed. It is a click, not a confirmed lead, so it is not
 * sent as generate_lead. One listener covers every WhatsApp link on the page.
 */
export default function LpWhatsAppTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="https://wa.me/"]');
      if (!link) {
        return;
      }
      const context = leadContext();
      const params: Record<string, string> = { page: context.page ?? window.location.pathname };
      if (context.utmTerm) {
        params.keyword = context.utmTerm;
      }
      if (context.utmCampaign) {
        params.campaign = context.utmCampaign;
      }
      if (context.gclid) {
        params.gclid = context.gclid;
      }
      if (context.adConsent) {
        params.ad_consent = context.adConsent;
      }
      pushEvent('whatsapp_click', params);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
