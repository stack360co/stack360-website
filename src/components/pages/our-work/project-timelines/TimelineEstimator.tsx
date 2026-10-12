'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';
import {
  INTEGRATION_OPTIONS,
  type TimelineType,
} from '@/constants/component/project-timelines-data';
import { pushEvent } from '@/lib/analytics';

interface TimelineEstimatorProps {
  types: readonly TimelineType[];
}

type Scope = 'first' | 'ongoing';

const CHOICE =
  'flex cursor-pointer items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary';

function months(value: number): string {
  return `${value} month${value === 1 ? '' : 's'}`;
}

function firstVersionLine(integrations: number): string {
  if (integrations <= 1) {
    return 'With one clear flow and few outside systems, a first version can take one to three months. Cinekit’s took one.';
  }
  if (integrations >= 3) {
    return 'With several outside systems, expect the long end of three to six months for a first version. Integrations are where projects most often run long.';
  }
  return 'Most first versions we build take three to six months.';
}

function integrationExample(integrations: number): string {
  return integrations >= 2
    ? 'For scale: BuffyHub, synced with Amazon, eBay and Walmart, ran 19 months, and AutoBuffy, with payments, shipping carriers and vendor inventory, ran 20.'
    : 'For scale: Cinekit, a rental marketplace with Stripe as its main integration, was built in one month.';
}

/** Shows how long similar projects of ours took. Every figure comes from the portfolio records. */
export default function TimelineEstimator({ types }: TimelineEstimatorProps) {
  const baseId = useId();
  const [typeId, setTypeId] = useState<string>('');
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [scope, setScope] = useState<Scope>('first');
  const selected = types.find((type) => type.id === typeId);

  function toggleIntegration(id: string) {
    setIntegrations((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function chooseType(id: string) {
    setTypeId(id);
    pushEvent('timeline_estimator', { project_type: id });
  }

  const teamed = selected?.projects.filter((project) => project.team) ?? [];

  return (
    <div className="grid grid-cols-1 gap-2xl lg:grid-cols-12">
      <form className="space-y-xl lg:col-span-7" onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend className="text-lg font-bold text-neutral-900">1. What are you building?</legend>
          <div className="mt-md grid grid-cols-1 gap-sm sm:grid-cols-2">
            {types.map((type) => (
              <label key={type.id} className={CHOICE}>
                <input
                  type="radio"
                  name={`${baseId}-type`}
                  value={type.id}
                  checked={typeId === type.id}
                  onChange={() => chooseType(type.id)}
                  className="sr-only"
                />
                <span className="flex-1">{type.label}</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {type.projects.length} {type.projects.length === 1 ? 'project' : 'projects'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold text-neutral-900">
            2. Which outside systems must it connect to?
          </legend>
          <div className="mt-md flex flex-wrap gap-sm">
            {INTEGRATION_OPTIONS.map((option) => (
              <label key={option.id} className={CHOICE}>
                <input
                  type="checkbox"
                  checked={integrations.includes(option.id)}
                  onChange={() => toggleIntegration(option.id)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold text-neutral-900">
            3. What do you want to see?
          </legend>
          <div className="mt-md grid grid-cols-1 gap-sm sm:grid-cols-2">
            {(
              [
                ['first', 'Time to a first version'],
                ['ongoing', 'First version plus ongoing work'],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className={CHOICE}>
                <input
                  type="radio"
                  name={`${baseId}-scope`}
                  value={value}
                  checked={scope === value}
                  onChange={() => setScope(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <section
        aria-live="polite"
        aria-label="Estimate"
        className="rounded-xl border border-neutral-200 bg-neutral-50 p-xl shadow-sm lg:sticky lg:top-24 lg:col-span-5 lg:self-start"
      >
        {selected ? (
          <div className="space-y-md">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              {selected.label}
            </p>
            {scope === 'first' ? (
              <p className="text-pretty text-lg font-bold leading-snug text-neutral-900">
                {firstVersionLine(integrations.length)}
              </p>
            ) : (
              <p className="text-pretty text-lg font-bold leading-snug text-neutral-900">
                {selected.projects.length === 1
                  ? `Our ${selected.label.toLowerCase()} project, ${selected.projects[0].name}, ran ${months(selected.max)}, including work after launch.`
                  : `Our ${selected.label.toLowerCase()} projects ran ${selected.min} to ${months(selected.max)}, with a median of ${months(selected.median)}, including work after launch.`}
              </p>
            )}
            <p className="text-pretty text-sm leading-relaxed text-neutral-600">
              {scope === 'first'
                ? `Including work after launch, our ${selected.label.toLowerCase()} projects ran ${selected.projects.length === 1 ? months(selected.max) : `${selected.min} to ${months(selected.max)}`}.`
                : 'Even our longest projects had a first version live within three to six months.'}{' '}
              {integrationExample(integrations.length)}
            </p>

            <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
              {selected.projects.map((project) => (
                <li key={project.name} className="flex items-center justify-between gap-md py-sm">
                  <Link
                    href={project.href}
                    className="text-sm font-semibold text-neutral-800 transition-colors hover:text-primary"
                  >
                    {project.name}
                  </Link>
                  <span className="font-mono text-xs font-bold text-neutral-600">
                    {months(project.months)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-neutral-600">
              {teamed.length > 0
                ? `Team sizes on these case studies: ${teamed.map((project) => `${project.name} ${project.team}`).join(', ')}.`
                : 'Most of our case studies ran with teams of two engineers.'}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
            >
              Get an exact timeline for yours
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        ) : (
          <div className="space-y-sm">
            <p className="text-lg font-bold text-neutral-900">Pick what you are building</p>
            <p className="text-pretty text-sm leading-relaxed text-neutral-600">
              You will see how long our projects of that kind took, which ones they were, and the
              team sizes behind them.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
