'use client';

import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { type ChangeEvent, type FocusEvent, type FormEvent, useId, useState } from 'react';
import BrandIcon from '@/components/shared/BrandIcon';
import {
  HIRE_NEED_OPTIONS,
  HIRE_SKILLS,
  type HireNeedId,
  type HireSkillId,
} from '@/constants/component/hire-talent-data';
import { pushEvent } from '@/lib/analytics';
import { type HireFormData, hireSchema } from '@/schema/hire';
import { cn } from '@/styles/tailwind.utils';

type Status = 'idle' | 'loading' | 'sent' | 'error';

export default function HireForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [skills, setSkills] = useState<HireSkillId[]>([]);
  const [need, setNeed] = useState<HireNeedId | ''>('');

  const [formValues, setFormValues] = useState<Record<string, string>>({
    name: '',
    email: '',
    company: '',
    notes: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof HireFormData, string>>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fieldElementIds: Record<keyof HireFormData, string> = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    company: `${formId}-company`,
    skills: `${formId}-skills-fieldset`,
    need: `${formId}-need-fieldset`,
    notes: `${formId}-notes`,
  };

  const focusFirstErrorField = (errors: Partial<Record<keyof HireFormData, string>>) => {
    const fieldOrder: (keyof HireFormData)[] = [
      'name',
      'email',
      'company',
      'skills',
      'need',
      'notes',
    ];
    const firstInvalidField = fieldOrder.find((field) => errors[field]);

    if (firstInvalidField) {
      const elementId = fieldElementIds[firstInvalidField];
      const element = document.getElementById(elementId);

      if (element) {
        const targetElement =
          element.tagName === 'FIELDSET'
            ? element.querySelector<HTMLElement>('button, input')
            : element;

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

          targetElement.focus({ preventScroll: true });
        }
      }
    }
  };

  const validateField = (name: keyof HireFormData, value: unknown) => {
    const fieldSchema = hireSchema.shape[name];
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

  const toggleSkill = (id: HireSkillId) => {
    const updatedSkills = skills.includes(id) ? skills.filter((s) => s !== id) : [...skills, id];

    setSkills(updatedSkills);
    validateField('skills', updatedSkills);
  };

  const handleNeedChange = (optionId: HireNeedId) => {
    setNeed(optionId);
    validateField('need', optionId);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;

    if (name === 'notes') {
      value = value.replace(/\n{3,}/g, '\n\n');
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof HireFormData]) {
      validateField(name as keyof HireFormData, value);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof HireFormData, value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus('loading');
    setErrorMessage(null);

    const fullData = {
      ...formValues,
      skills,
      need,
    };

    const validation = hireSchema.safeParse(fullData);

    if (!validation.success) {
      const formattedErrors: Partial<Record<keyof HireFormData, string>> = {};

      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof HireFormData;
        if (path && !formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      });

      setFieldErrors(formattedErrors);
      setStatus('error');

      focusFirstErrorField(formattedErrors);
      return;
    }

    const { name, email, company, notes } = validation.data;

    const skillLabels = skills
      .map((id) => HIRE_SKILLS.find((s) => s.id === id)?.label ?? id)
      .join(', ');

    const needLabel = HIRE_NEED_OPTIONS.find((o) => o.id === need)?.label ?? need;

    try {
      const response = await fetch('/api/contact/m-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'hire',
          name,
          email,
          company,
          skillLabels,
          needLabel,
          notes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? 'Failed to submit form.');
      }

      setStatus('sent');
      pushEvent('generate_lead', { form_name: 'hire' });
      setFormValues({ name: '', email: '', company: '', notes: '' });
      setSkills([]);
      setNeed('');
      setFieldErrors({});
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

  const baseInputClass =
    'min-h-11 w-full rounded-md border bg-neutral-50 px-md py-md text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-500 focus-visible:ring-2 disabled:opacity-60';

  const labelClass =
    'mb-xs block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600';

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={`${formId}-title`}>
      <div className="mb-lg space-y-sm">
        <h2 id={`${formId}-title`} className="text-2xl font-bold tracking-tight text-neutral-900">
          Let's Build With AI
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-neutral-600">
          Select skills and engagement length. We follow up with a shortlist — not a generic
          brochure.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name
            <span className="text-primary" aria-hidden>
              {' '}
              *
            </span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            value={formValues.name}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
            autoComplete="name"
            placeholder="Jane Smith"
            className={cn(
              baseInputClass,
              fieldErrors.name
                ? 'border-danger focus-visible:border-danger focus-visible:ring-danger/15'
                : 'border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/15'
            )}
          />
          {fieldErrors.name ? (
            <p
              id={`${formId}-name-error`}
              className="mt-xs text-xs font-medium text-danger"
              role="alert"
            >
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email
            <span className="text-primary" aria-hidden>
              {' '}
              *
            </span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            value={formValues.email}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
            autoComplete="email"
            placeholder="jane@company.com"
            className={cn(
              baseInputClass,
              fieldErrors.email
                ? 'border-danger focus-visible:border-danger focus-visible:ring-danger/15'
                : 'border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/15'
            )}
          />
          {fieldErrors.email ? (
            <p
              id={`${formId}-email-error`}
              className="mt-xs text-xs font-medium text-danger"
              role="alert"
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-company`} className={labelClass}>
            Company name
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            value={formValues.company}
            disabled={isLoading}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="organization"
            placeholder="Acme Inc."
            className={cn(
              baseInputClass,
              'border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/15'
            )}
          />
        </div>
      </div>

      <fieldset id={`${formId}-skills-fieldset`} className="mt-xl">
        <legend className={labelClass}>
          Skills / technology
          <span className="text-primary" aria-hidden>
            {' '}
            *
          </span>
        </legend>
        <p className="mt-xs text-xs text-neutral-600">Select all that apply.</p>
        <div className="mt-md flex flex-wrap gap-sm">
          {HIRE_SKILLS.map((skill) => {
            const selected = skills.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                disabled={isLoading}
                aria-pressed={selected}
                onClick={() => toggleSkill(skill.id)}
                className={cn(
                  'flex min-h-11 items-center justify-center gap-sm whitespace-nowrap rounded-md border px-md py-sm text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60',
                  selected
                    ? 'border-primary bg-primary text-neutral-50 shadow-sm'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400'
                )}
              >
                {skill.iconSlug ? (
                  <BrandIcon
                    slug={skill.iconSlug}
                    size={16}
                    variant="tech"
                    className={cn('shrink-0', selected ? 'brightness-0 invert' : undefined)}
                  />
                ) : null}
                <span>{skill.label}</span>
              </button>
            );
          })}
        </div>
        {fieldErrors.skills ? (
          <p className="mt-xs text-xs font-medium text-danger" role="alert">
            {fieldErrors.skills}
          </p>
        ) : null}
      </fieldset>

      <fieldset id={`${formId}-need-fieldset`} className="mt-xl">
        <legend className="text-base font-bold text-neutral-900">
          What best describes your need?
          <span className="text-primary" aria-hidden>
            {' '}
            *
          </span>
        </legend>
        <p className="mt-xs text-sm text-neutral-600">
          Stack360 developers are full-time, dedicated resources on your team.
        </p>
        <div className="mt-md space-y-sm">
          {HIRE_NEED_OPTIONS.map((option) => {
            const isSelected = need === option.id;

            return (
              <label
                key={option.id}
                className={cn(
                  'flex cursor-pointer items-start gap-md rounded-md border px-md py-md transition-colors',
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400'
                )}
              >
                <input
                  type="radio"
                  name="need"
                  value={option.id}
                  disabled={isLoading}
                  checked={isSelected}
                  onChange={() => handleNeedChange(option.id)}
                  className="sr-only"
                />

                {/* Custom Orange Radio Indicator */}
                <span
                  className={cn(
                    'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-all',
                    isSelected ? 'border-primary bg-primary' : 'border-neutral-400 bg-neutral-50'
                  )}
                >
                  {isSelected ? <span className="size-1.5 rounded-full bg-neutral-50" /> : null}
                </span>

                <span className="text-sm text-neutral-800">{option.label}</span>
              </label>
            );
          })}
        </div>
        {fieldErrors.need ? (
          <p className="mt-xs text-xs font-medium text-danger" role="alert">
            {fieldErrors.need}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-xl">
        <label htmlFor={`${formId}-notes`} className={labelClass}>
          Anything else?
        </label>
        <textarea
          id={`${formId}-notes`}
          name="notes"
          rows={4}
          value={formValues.notes}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Would you like to tell us anything else?"
          className={cn(
            baseInputClass,
            'resize-y border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/15'
          )}
        />
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
            <span>Request submitted successfully!</span>
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

      <div className="mt-lg flex items-center justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-11 shrink-0 rounded-md bg-primary px-xl py-md text-sm font-bold text-neutral-50 shadow-md transition-all hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
