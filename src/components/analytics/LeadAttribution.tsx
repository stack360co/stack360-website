'use client';

import { useEffect } from 'react';
import { rememberFirstVisit } from '@/lib/lead-context';

/** Notes where a visitor came from on their first page view, for the enquiry forms. */
export default function LeadAttribution() {
  useEffect(() => {
    rememberFirstVisit();
  }, []);

  return null;
}
