import { Check, Quote } from 'lucide-react';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import RelatedServices from '@/components/shared/RelatedServices';
import {
  ACCOUNTING_AI,
  ACCOUNTING_CTA,
  ACCOUNTING_FAQS,
  ACCOUNTING_HERO,
  ACCOUNTING_JOBS,
  ACCOUNTING_MTD,
  ACCOUNTING_PROOF,
} from '@/constants/component/who-we-help-accounting-data';

const sectionTitle = 'text-balance text-2xl font-bold tracking-tight text-neutral-900';
const eyebrow = 'font-mono text-[10px] font-bold uppercase tracking-widest text-primary';

export default function AccountingFirmsPage() {
  const review = ACCOUNTING_PROOF.review;
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={ACCOUNTING_HERO.eyebrow}
        title={ACCOUNTING_HERO.title}
        highlight={ACCOUNTING_HERO.highlight}
        description={ACCOUNTING_HERO.description}
        cta={ACCOUNTING_HERO.cta}
      />

      <MotionSection className="py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className={sectionTitle}>{ACCOUNTING_JOBS.title}</h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                {ACCOUNTING_JOBS.intro}
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
            {ACCOUNTING_JOBS.items.map((job) => (
              <MotionStaggerItem key={job.title}>
                <MotionCard className="h-full rounded-lg border border-neutral-200 bg-neutral-50 p-lg">
                  <Check className="h-5 w-5 text-primary" aria-hidden />
                  <h3 className="mt-sm text-base font-bold text-neutral-900">{job.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {job.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection
        id="mtd"
        className="scroll-mt-24 border-t border-neutral-200 bg-neutral-100/50 py-2xl"
      >
        <div className="site-container">
          <MotionStagger className="max-w-3xl">
            <MotionStaggerItem>
              <p className={eyebrow}>{ACCOUNTING_MTD.eyebrow}</p>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <h2 className={`mt-sm ${sectionTitle}`}>{ACCOUNTING_MTD.title}</h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                {ACCOUNTING_MTD.intro}
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <div className="mt-xl grid grid-cols-1 gap-md lg:grid-cols-2">
            <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg md:p-xl">
              <h3 className="text-lg font-bold text-neutral-900">
                {ACCOUNTING_MTD.thresholdsTitle}
              </h3>
              <dl className="mt-sm divide-y divide-neutral-200 text-sm">
                {ACCOUNTING_MTD.thresholds.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-y-0.5 py-sm sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-md"
                  >
                    <dt className="font-semibold text-neutral-900">{row.label}</dt>
                    <dd className="text-neutral-700">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-md text-xs leading-relaxed text-neutral-600">
                Sources:{' '}
                {ACCOUNTING_MTD.sources.map((source, index) => (
                  <span key={source.href}>
                    {index > 0 ? '; ' : null}
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-primary"
                    >
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            </MotionCard>
            <MotionCard className="rounded-xl border-2 border-primary/40 bg-neutral-50 p-lg md:p-xl">
              <h3 className="text-lg font-bold text-neutral-900">{ACCOUNTING_MTD.buildTitle}</h3>
              <ul className="mt-md space-y-sm">
                {ACCOUNTING_MTD.build.map((item) => (
                  <li key={item} className="flex items-start gap-sm text-sm text-neutral-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-md text-sm leading-relaxed text-neutral-600">
                {ACCOUNTING_MTD.note}
              </p>
            </MotionCard>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="proof" className="scroll-mt-24 border-t border-neutral-200 py-2xl">
        <div className="site-container">
          <MotionStagger className="max-w-3xl">
            <MotionStaggerItem>
              <h2 className={sectionTitle}>{ACCOUNTING_PROOF.title}</h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                {ACCOUNTING_PROOF.intro}
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="mt-xl grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
            {ACCOUNTING_PROOF.items.map((item) => (
              <MotionStaggerItem key={item.client}>
                <MotionCard className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg">
                  <p className="font-mono text-2xl font-black text-primary">{item.metric}</p>
                  <p className="mt-xs font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {item.metricLabel}
                  </p>
                  <h3 className="mt-lg text-lg font-bold text-neutral-900">{item.client}</h3>
                  <p className="text-xs text-neutral-500">{item.context}</p>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
          <figure className="mt-xl rounded-xl border border-neutral-200 bg-neutral-100 p-lg md:p-xl">
            <Quote className="h-6 w-6 text-primary" aria-hidden />
            <blockquote className="mt-sm max-w-4xl text-pretty text-base leading-relaxed text-neutral-800 md:text-lg">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-md text-sm text-neutral-600">
              <span className="font-bold text-neutral-900">{review.name}</span>, {review.role},{' '}
              {review.company}
            </figcaption>
          </figure>
        </div>
      </MotionSection>

      <MotionSection
        id="ai"
        className="scroll-mt-24 border-t border-neutral-200 bg-neutral-100/50 py-2xl"
      >
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-2">
          <MotionStagger>
            <MotionStaggerItem>
              <h2 className={sectionTitle}>{ACCOUNTING_AI.title}</h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md text-sm leading-relaxed text-neutral-600">
                {ACCOUNTING_AI.intro}
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="space-y-sm">
            {ACCOUNTING_AI.points.map((point) => (
              <MotionStaggerItem key={point.label}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 px-lg py-md text-sm leading-relaxed text-neutral-700">
                  <span className="font-bold text-neutral-900">{point.label}:</span> {point.text}
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl">
          <h2 className={sectionTitle}>Questions accounting firms ask</h2>
          <p className="mt-sm mb-xl text-sm leading-relaxed text-neutral-600">
            Straight answers before you book.
          </p>
          <FaqAccordion items={ACCOUNTING_FAQS} />
        </div>
      </MotionSection>

      <RelatedServices
        title="Services accounting firms ask us for"
        intro="Usually it starts with the chasing and retyping around each deadline."
        services={['automation', 'ai-solutions', 'crm', 'custom-software']}
      />

      <PageClosingCta {...ACCOUNTING_CTA} />
    </div>
  );
}
