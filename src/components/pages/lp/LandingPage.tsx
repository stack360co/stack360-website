import { ArrowRight, Check, ChevronDown, Quote, Star } from 'lucide-react';
import { LANDING_TESTIMONIALS } from '@/constants/component/landing-data';
import {
  formatPrice,
  getLpThemeContent,
  LP_PRICES,
  LP_PROOF,
  LP_TRUST,
  type LpVariant,
} from '@/constants/component/lp-data';
import LpHero from './LpHero';

const eyebrowClass = 'font-mono text-[11px] font-bold uppercase tracking-widest text-primary-dark';
const sectionTitleClass = 'text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl';

/** Mitchell's G2 review is the one client quote about automation, so every variant shows it. */
const REVIEW = LANDING_TESTIMONIALS.find((t) => t.name === 'Mitchell Woods');

/** A price that hasn't been set yet, styled so nobody mistakes the preview for a finished page. */
function Price({ value, className }: { value: number | null; className?: string }) {
  const text = formatPrice(value);
  return value === null ? (
    <span
      className={`${className ?? ''} rounded-sm border border-dashed border-warning bg-warning/10 px-xs text-warning`}
      title="Price to be set"
    >
      {text}
    </span>
  ) : (
    <span className={className}>{text}</span>
  );
}

export default function LandingPage({ variant }: { variant: LpVariant }) {
  const content = getLpThemeContent(variant.theme);
  const prices = LP_PRICES[variant.theme];

  const pitch = (
    <div>
      <p className={eyebrowClass}>{variant.eyebrow}</p>
      <h1 className="mt-sm text-balance text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
        {variant.headline}
      </h1>
      <p className="mt-md max-w-[36rem] text-base leading-relaxed text-neutral-700 md:text-lg">
        {variant.intro}
      </p>
    </div>
  );

  const details = (
    <div>
      <ul className="space-y-sm">
        {[
          content.offer.description,
          'A written plan within two business days of the call',
          'You own everything we build',
        ].map((point) => (
          <li key={point} className="flex items-start gap-sm text-sm text-neutral-800 md:text-base">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            {point}
          </li>
        ))}
      </ul>
      <ul className="mt-lg flex flex-wrap gap-x-lg gap-y-sm" aria-label="Ratings and track record">
        {LP_TRUST.map((item) => (
          <li key={item.label} className="flex items-center gap-xs text-sm text-neutral-700">
            <Star className="h-4 w-4 shrink-0 fill-primary text-primary" aria-hidden />
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-300 underline-offset-2 hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <section className="site-container pt-lg pb-2xl md:pt-xl">
        <LpHero
          pitch={pitch}
          details={details}
          offerTitle={content.offer.title}
          formTab={content.jobField.tab}
          jobLabel={content.jobField.label}
          jobPlaceholder={content.jobField.placeholder}
        />
      </section>

      <section
        aria-labelledby="proof-heading"
        className="border-t border-neutral-200 bg-white py-2xl"
      >
        <div className="site-container">
          <p className={eyebrowClass}>Our work</p>
          <h2 id="proof-heading" className={`mt-sm ${sectionTitleClass}`}>
            What it looks like when it’s live
          </h2>
          <ul className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
            {content.proofOrder.map((id) => {
              const proof = LP_PROOF[id];
              return (
                <li key={id} className="flex flex-col rounded-xl border border-neutral-200 p-lg">
                  <p className="text-sm font-semibold text-neutral-900">{proof.client}</p>
                  <p className="text-xs text-neutral-600">{proof.context}</p>
                  <p className="mt-lg text-3xl font-bold tracking-tight text-primary-dark">
                    {proof.result}
                  </p>
                  <p className="text-sm font-medium text-neutral-800">{proof.resultLabel}</p>
                  <p className="mt-md text-sm leading-relaxed text-neutral-700">
                    {proof.description}
                  </p>
                </li>
              );
            })}
          </ul>
          {REVIEW ? (
            <figure className="mt-xl rounded-xl bg-neutral-100 p-lg md:p-xl">
              <Quote className="h-6 w-6 text-primary" aria-hidden />
              <blockquote className="mt-sm text-base leading-relaxed text-neutral-800 md:text-lg">
                “{REVIEW.quote}”
              </blockquote>
              <figcaption className="mt-md text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">{REVIEW.name}</span>, {REVIEW.role}
                , {REVIEW.company}
                {REVIEW.source ? (
                  <>
                    {' · '}
                    <a
                      href={REVIEW.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-primary"
                    >
                      {REVIEW.source.label}
                    </a>
                  </>
                ) : null}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="pricing-heading" className="py-2xl">
        <div className="site-container grid grid-cols-1 gap-xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <p className={eyebrowClass}>Pricing</p>
            <h2 id="pricing-heading" className={`mt-sm ${sectionTitleClass}`}>
              {content.pricing.fromLabel} <Price value={prices.from} />
            </h2>
            <p className="mt-md max-w-[32rem] text-base leading-relaxed text-neutral-700">
              Start with one piece of work at a fixed price. Larger projects are quoted after the
              review call, once we know what’s involved.
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary/40 bg-white p-lg shadow-card md:p-xl">
            <div className="flex flex-wrap items-baseline justify-between gap-sm">
              <h3 className="text-xl font-bold text-neutral-900">{content.pricing.packageName}</h3>
              <p className="text-2xl font-bold text-neutral-900">
                <Price value={prices.starter} />{' '}
                <span className="text-sm font-medium text-neutral-600">fixed price</span>
              </p>
            </div>
            <p className="mt-xs text-sm text-neutral-700">{content.pricing.packageSummary}</p>
            <ul className="mt-lg grid grid-cols-1 gap-sm sm:grid-cols-2">
              {content.pricing.includes.map((item) => (
                <li key={item} className="flex items-start gap-sm text-sm text-neutral-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className="mt-lg inline-flex min-h-11 items-center gap-xs rounded-md bg-primary px-lg py-sm text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark hover:text-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start with a free review
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="border-y border-neutral-200 bg-white py-2xl"
      >
        <div className="site-container">
          <p className={eyebrowClass}>How it works</p>
          <h2 id="steps-heading" className={`mt-sm ${sectionTitleClass}`}>
            From first call to working software
          </h2>
          <ol className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
            {content.steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-neutral-200 p-lg">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-md text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-xs text-sm leading-relaxed text-neutral-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="py-2xl">
        <div className="site-container max-w-3xl">
          <p className={eyebrowClass}>FAQ</p>
          <h2 id="faq-heading" className={`mt-sm ${sectionTitleClass}`}>
            Questions people ask first
          </h2>
          <div className="mt-xl divide-y divide-neutral-200 border-y border-neutral-200">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group py-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-md text-base font-semibold text-neutral-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-neutral-500 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-sm text-sm leading-relaxed text-neutral-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-2xl">
        <div className="site-container flex flex-col items-start gap-lg md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">{content.closing.title}</h2>
            <p className="mt-sm max-w-[36rem] text-base text-neutral-300">
              {content.closing.description}
            </p>
          </div>
          <a
            href="#book"
            className="inline-flex min-h-12 shrink-0 items-center gap-xs rounded-md bg-primary px-xl py-md text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark hover:text-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book your free review
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>
    </>
  );
}
