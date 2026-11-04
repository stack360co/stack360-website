/**
 * Light spam protection for the contact and hire forms, shared by the forms and the webhook route.
 * Bots that fill every field complete the hidden honeypot; bots that post instantly fail the timer.
 */
export const HONEYPOT_FIELD = 'website_url';

/** A person can't read the form and write a brief in under three seconds. */
const MIN_FILL_MS = 3000;

export type FormGuardFields = {
  [HONEYPOT_FIELD]?: string;
  elapsedMs?: number;
};

/** What the forms add to their payload: the honeypot value and how long the visitor spent. */
export function formGuardFields(honeypot: string, startedAt: number): FormGuardFields {
  return { [HONEYPOT_FIELD]: honeypot, elapsedMs: Date.now() - startedAt };
}

/**
 * True when a submission looks automated. Payloads without `elapsedMs` (pages loaded before
 * this shipped) pass the timer, so no real lead is dropped during a deploy.
 */
export function isLikelySpam(body: Record<string, unknown>): boolean {
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return true;
  }
  const elapsed = body.elapsedMs;
  return typeof elapsed === 'number' && elapsed < MIN_FILL_MS;
}

/** Shown when a message can't be delivered, so the visitor still has a way to reach us. */
export const FORM_FALLBACK_MESSAGE =
  "We couldn't send your message just now. Please email sales@stack360.co and we'll reply within one business day.";
