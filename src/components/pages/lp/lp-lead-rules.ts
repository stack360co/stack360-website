/**
 * The /lp form's checks, without zod: zod added about 280 KB of script to every ads landing page.
 * They follow `contactSchema` in src/schema/contact.ts (same limits, same messages, same order), with
 * the company name required. The server still checks every enquiry with `contactSchema`, so a
 * difference here can only change which message shows first, never what gets through.
 */

export type LpLeadField = 'name' | 'email' | 'company' | 'message';
export type LpLeadValues = Record<LpLeadField, string>;

/** zod's own email pattern (z.email()), so the browser and the server agree. */
const EMAIL =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;
const NAME = /^[\p{L}\p{M}' .-]+$/u;

type Rule = (value: string) => string | null;

const RULES: Record<LpLeadField, { trim: boolean; rules: readonly Rule[] }> = {
  name: {
    trim: true,
    rules: [
      (v) => (v.length < 2 ? 'Please enter your full name.' : null),
      (v) => (v.length > 80 ? 'Your name is a little too long.' : null),
      (v) => (NAME.test(v) ? null : 'Please use only letters in your name.'),
    ],
  },
  email: {
    trim: false,
    rules: [
      (v) => (EMAIL.test(v) ? null : 'Please enter a valid email address.'),
      (v) => (v.length < 1 ? 'Please enter your email address.' : null),
      (v) => (v.length > 254 ? 'Your email address is too long.' : null),
    ],
  },
  company: {
    trim: true,
    rules: [
      (v) => (v.length < 2 ? 'Please enter your company name.' : null),
      (v) => (v.length > 120 ? 'Please shorten your company name.' : null),
    ],
  },
  message: {
    trim: true,
    rules: [
      (v) => (v.length < 10 ? 'Please tell us a little more about your project.' : null),
      (v) => (v.length > 2000 ? 'Please keep your message under 2,000 characters.' : null),
      (v) => (v.split(/\s+/).length >= 3 ? null : 'Please add a few more details to your message.'),
    ],
  },
};

export const LP_LEAD_FIELDS = ['name', 'email', 'company', 'message'] as const;

/** The first problem with one field, or null when it's fine. */
export function checkLpLeadField(field: LpLeadField, raw: string): string | null {
  const { trim, rules } = RULES[field];
  const value = trim ? raw.trim() : raw;
  for (const rule of rules) {
    const problem = rule(value);
    if (problem) {
      return problem;
    }
  }
  return null;
}

/** The trimmed values, or the first problem with each field that has one. */
export function checkLpLead(
  values: LpLeadValues
): { ok: true; data: LpLeadValues } | { ok: false; errors: Partial<Record<LpLeadField, string>> } {
  const errors: Partial<Record<LpLeadField, string>> = {};
  for (const field of LP_LEAD_FIELDS) {
    const problem = checkLpLeadField(field, values[field]);
    if (problem) {
      errors[field] = problem;
    }
  }
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  const data = { ...values };
  for (const field of LP_LEAD_FIELDS) {
    if (RULES[field].trim) {
      data[field] = data[field].trim();
    }
  }
  return { ok: true, data };
}
