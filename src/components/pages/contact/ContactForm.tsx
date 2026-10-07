'use client';

import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, type FocusEvent, type FormEvent, useEffect, useState } from 'react';
import { CONTACT_FORM_FIELDS } from '@/constants/component/contact-data';
import { pushEvent } from '@/lib/analytics';
import { type ContactFormData, contactSchema } from '@/schema/contact';

type Status = 'idle' | 'loading' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [formValues, setFormValues] = useState<Record<string, string>>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>(
    {}
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const role = searchParams.get('role')?.trim() ?? '';
  const source = searchParams.get('source')?.trim() ?? '';
  const redirectState = searchParams.get('redirect')?.trim().toLowerCase() ?? '';

  useEffect(() => {
    if (source !== 'chat-assistant' || redirectState !== 'redirecting') {
      return;
    }

    const timer = window.setTimeout(() => {
      router.replace('/contact?source=chat-assistant&redirect=redirected');
    }, 350);

    return () => window.clearTimeout(timer);
  }, [redirectState, router, source]);

  const validateField = (name: keyof ContactFormData, value: string) => {
    const fieldSchema = contactSchema.shape[name];
    if (!fieldSchema) {
      return;
    }

    const result = fieldSchema.safeParse(value);
    if (result.success) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    } else {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: result.error.issues[0]?.message,
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;

    if (name === 'message') {
      value = value.replace(/\n{3,}/g, '\n\n');
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof ContactFormData]) {
      validateField(name as keyof ContactFormData, value);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormData, value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus('loading');
    setErrorMessage(null);

    const validation = contactSchema.safeParse(formValues);

    if (!validation.success) {
      const formattedErrors: Partial<Record<keyof ContactFormData, string>> = {};

      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormData;
        if (path && !formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      });

      setFieldErrors(formattedErrors);
      setStatus('error');
      return;
    }

    const { name, email, company, message } = validation.data;

    try {
      const response = await fetch('/api/contact/m-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          name,
          email,
          company,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? 'Failed to submit form.');
      }

      setStatus('sent');
      pushEvent('generate_lead', { form_name: 'contact' });
      setFormValues({ name: '', email: '', company: '', message: '' });
      setFieldErrors({});
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

  return (
    <form onSubmit={onSubmit} noValidate>
      {source === 'chat-assistant' && (
        <div className="mb-lg rounded-md border border-primary/20 bg-primary/5 px-md py-sm">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
            {redirectState === 'redirecting'
              ? 'Redirecting…'
              : redirectState === 'redirected'
                ? 'Redirected from Stack360 Guide'
                : 'Redirected from Stack360 Guide'}
          </p>
        </div>
      )}

      <div className="mb-lg space-y-sm">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          {role ? `Apply: ${role}` : 'Start a conversation'}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
          {role
            ? 'Tell us about your background and why this role fits. We will follow up with next steps.'
            : 'Tell us what you are building. We will follow up with a scoped next step — not a generic brochure.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        {CONTACT_FORM_FIELDS.map((field) => {
          const error = fieldErrors[field.id as keyof ContactFormData];

          return (
            <div key={field.id} className={field.id === 'company' ? 'sm:col-span-2' : undefined}>
              <label
                htmlFor={field.id}
                className="mb-xs block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600"
              >
                {field.label}
                {field.id !== 'company' ? (
                  <span className="text-primary" aria-hidden>
                    {' '}
                    *
                  </span>
                ) : null}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formValues[field.id] ?? ''}
                disabled={isLoading}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!error}
                aria-describedby={error ? `${field.id}-error` : undefined}
                autoComplete={
                  field.id === 'name' ? 'name' : field.id === 'email' ? 'email' : 'organization'
                }
                placeholder={field.placeholder}
                className={`min-h-11 w-full rounded-md border bg-neutral-50 px-md py-md text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus-visible:ring-2 disabled:opacity-60 ${
                  error
                    ? 'border-danger focus-visible:border-danger focus-visible:ring-danger/15'
                    : 'border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/15'
                }`}
              />
              {error ? (
                <p
                  id={`${field.id}-error`}
                  className="mt-xs text-xs font-medium text-danger"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <div className="mb-xs flex items-center justify-between">
            <label
              htmlFor="message"
              className="block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600"
            >
              {role ? 'Cover note' : 'Project brief'}
              <span className="text-primary" aria-hidden>
                {' '}
                *
              </span>
            </label>
            <span className="font-mono text-[10px] text-neutral-500">
              Min 10 – Max 500 characters
            </span>
          </div>

          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={500}
            value={formValues.message ?? ''}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : 'message-counter'}
            placeholder={
              role
                ? 'Experience, availability, and why this role…'
                : 'What are you building? Timeline, stack, team size...'
            }
            className={`w-full resize-y rounded-md border bg-neutral-50 px-md py-md text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus-visible:ring-2 disabled:opacity-60 ${
              fieldErrors.message
                ? 'border-danger focus-visible:border-danger focus-visible:ring-danger/15'
                : 'border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/15'
            }`}
          />

          <div className="mt-xs flex items-center justify-between gap-sm">
            <div>
              {fieldErrors.message ? (
                <p id="message-error" className="text-xs font-medium text-danger" role="alert">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            <span
              id="message-counter"
              className={`ml-auto font-mono text-xs ${
                (formValues.message?.length ?? 0) > 480
                  ? 'font-bold text-danger'
                  : 'text-neutral-500'
              }`}
            >
              {formValues.message?.length ?? 0}/500
            </span>
          </div>
        </div>
      </div>

      <div className="mt-lg flex items-center justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-11 shrink-0 rounded-md bg-primary px-xl py-md text-sm font-bold text-neutral-50 shadow-md transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Sending...' : role ? 'Submit application' : 'Send message'}
        </button>
      </div>

      {status === 'error' && errorMessage ? (
        <div
          role="alert"
          className="mt-md flex items-center justify-between gap-xs rounded-md border border-danger/20 bg-danger/5 p-sm text-sm font-medium text-danger"
        >
          <div className="flex items-center gap-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setErrorMessage(null);
            }}
            aria-label="Dismiss error banner"
            className="rounded-sm p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-danger"
          >
            <X className="h-4 w-4 shrink-0" />
          </button>
        </div>
      ) : null}

      {status === 'sent' ? (
        <output
          aria-live="polite"
          className="mt-md flex items-center justify-between gap-xs rounded-md border border-emerald-500/20 bg-emerald-500/10 p-sm text-sm font-medium text-emerald-700"
        >
          <div className="flex items-center gap-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Message sent successfully!</span>
          </div>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            aria-label="Dismiss success banner"
            className="rounded-sm p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            <X className="h-4 w-4 shrink-0" />
          </button>
        </output>
      ) : null}
    </form>
  );
}
