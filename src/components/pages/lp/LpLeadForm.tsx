'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { z } from 'zod';
import FormHoneypot from '@/components/shared/FormHoneypot';
import { pushEvent } from '@/lib/analytics';
import { FORM_FALLBACK_MESSAGE, formGuardFields } from '@/lib/form-guard';
import { leadContext } from '@/lib/lead-context';
import { contactSchema } from '@/schema/contact';

/** The contact form's rules, with the company name required here. */
const lpLeadSchema = contactSchema.extend({
  company: z
    .string()
    .trim()
    .min(2, 'Please enter your company name.')
    .max(120, 'Please shorten your company name.'),
});

type Field = 'name' | 'email' | 'company' | 'message';
type Values = Record<Field, string>;

const EMPTY: Values = { name: '', email: '', company: '', message: '' };

const inputClass = (invalid: boolean) =>
  `min-h-11 w-full rounded-md border bg-white px-md py-sm text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus-visible:ring-2 disabled:opacity-60 sm:text-sm ${
    invalid
      ? 'border-danger focus-visible:border-danger focus-visible:ring-danger/15'
      : 'border-neutral-300 focus-visible:border-primary focus-visible:ring-primary/15'
  }`;

const labelClass =
  'mb-xs block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600';

/**
 * The short enquiry form on the ads landing pages. It posts as a contact enquiry with a company,
 * so the Mattermost post, the sales@ email and the lead context (keyword, click ID) work as they do
 * for the contact page. "Sent from" in the lead context names the landing page.
 */
export default function LpLeadForm({
  jobLabel,
  jobPlaceholder,
  onBookInstead,
}: {
  jobLabel: string;
  jobPlaceholder: string;
  /** Shown after sending, for people who would rather pick a time now. */
  onBookInstead?: () => void;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(Date.now());

  const checkField = (field: Field, value: string) => {
    const result = lpLeadSchema.shape[field].safeParse(value);
    setErrors((prev) => {
      const next = { ...prev };
      if (result.success) {
        delete next[field];
      } else {
        next[field] = result.error.issues[0]?.message;
      }
      return next;
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    const value =
      field === 'message' ? event.target.value.replace(/\n{3,}/g, '\n\n') : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      checkField(field, value);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const parsed = lpLeadSchema.safeParse(values);
    if (!parsed.success) {
      const found: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field;
        found[field] ??= issue.message;
      }
      setErrors(found);
      const first = (['name', 'email', 'company', 'message'] as const).find((f) => found[f]);
      if (first) {
        document.getElementById(`lp-${first}`)?.focus();
      }
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact/m-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          ...parsed.data,
          ...formGuardFields(honeypotRef.current?.value ?? '', startedAt.current),
          context: leadContext(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error ?? FORM_FALLBACK_MESSAGE);
      }
      setStatus('sent');
      pushEvent('generate_lead', { form_name: 'contact' });
      setValues(EMPTY);
      setErrors({});
    } catch (error) {
      // fetch throws a TypeError when the network fails; that has no server message, so the
      // fallback still gives the visitor an email address.
      setErrorMessage(
        error instanceof Error && !(error instanceof TypeError)
          ? error.message
          : FORM_FALLBACK_MESSAGE
      );
      setStatus('error');
      pushEvent('form_error', { form_name: 'contact' });
    }
  };

  if (status === 'sent') {
    return (
      <output aria-live="polite" className="block rounded-md bg-emerald-50 p-lg text-emerald-900">
        <span className="flex items-center gap-sm text-base font-semibold">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          Thanks, we’ve got it.
        </span>
        <span className="mt-sm block text-sm leading-relaxed">
          We’ll reply within one business day.
          {onBookInstead ? (
            <>
              {' '}
              Want to talk sooner?{' '}
              <button
                type="button"
                onClick={onBookInstead}
                className="font-semibold text-emerald-900 underline"
              >
                Pick a time now
              </button>
              .
            </>
          ) : null}
        </span>
      </output>
    );
  }

  const sending = status === 'sending';
  const field = (
    id: Exclude<Field, 'message'>,
    label: string,
    type: string,
    autoComplete: string
  ) => (
    <div>
      <label htmlFor={`lp-${id}`} className={labelClass}>
        {label}
      </label>
      <input
        id={`lp-${id}`}
        name={id}
        type={type}
        value={values[id]}
        onChange={onChange}
        onBlur={(event) => checkField(id, event.target.value)}
        disabled={sending}
        required
        autoComplete={autoComplete}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `lp-${id}-error` : undefined}
        className={inputClass(!!errors[id])}
      />
      {errors[id] ? (
        <p id={`lp-${id}-error`} className="mt-xs text-xs font-medium text-danger">
          {errors[id]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <FormHoneypot inputRef={honeypotRef} />
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        {field('name', 'Name', 'text', 'name')}
        {field('email', 'Work email', 'email', 'email')}
        <div className="sm:col-span-2">{field('company', 'Company', 'text', 'organization')}</div>
        <div className="sm:col-span-2">
          <label htmlFor="lp-message" className={labelClass}>
            {jobLabel}
          </label>
          <textarea
            id="lp-message"
            name="message"
            rows={3}
            maxLength={2000}
            value={values.message}
            onChange={onChange}
            onBlur={(event) => checkField('message', event.target.value)}
            disabled={sending}
            required
            placeholder={jobPlaceholder}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'lp-message-error' : undefined}
            className={`${inputClass(!!errors.message)} resize-y`}
          />
          {errors.message ? (
            <p id="lp-message-error" className="mt-xs text-xs font-medium text-danger">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-lg min-h-12 w-full rounded-md bg-primary px-xl py-md text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Send it to us'}
      </button>

      {status === 'error' && errorMessage ? (
        <p
          role="alert"
          className="mt-md flex items-start gap-xs rounded-md border border-danger/20 bg-danger/5 p-sm text-sm font-medium text-danger"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
