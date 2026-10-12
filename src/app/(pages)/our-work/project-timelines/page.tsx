import Link from 'next/link';
import TimelineEstimator from '@/components/pages/our-work/project-timelines/TimelineEstimator';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import MotionSection from '@/components/shared/motion/MotionSection';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import {
  getAllProjectMonths,
  getTimelineTypes,
  TIMELINES_FAQS,
  TIMELINES_HERO,
} from '@/constants/component/project-timelines-data';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.ourWorkProjectTimelines;

export default function Page() {
  const types = getTimelineTypes();
  const total = getAllProjectMonths().length;

  return (
    <div className="flex w-full flex-col">
      <JsonLd data={pageJsonLdFromMeta(metadata, { faqs: TIMELINES_FAQS })} />
      <PageHero
        eyebrow={TIMELINES_HERO.eyebrow}
        title={TIMELINES_HERO.title}
        highlight={TIMELINES_HERO.highlight}
        description={TIMELINES_HERO.description}
      />

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container">
          <TimelineEstimator types={types} />
        </div>
      </MotionSection>

      <MotionSection className="border-b border-neutral-200 bg-neutral-100 py-2xl">
        <div className="site-container max-w-3xl space-y-md">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
            How these numbers were measured
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-neutral-600">
            Each range comes from our portfolio records of {total} projects delivered since 2019. A
            duration is how long we worked on a project, including improvements after launch. Team
            sizes come from our published case studies. This is our own delivery data, not a survey
            of the industry, and it is not a quote.
          </p>
          <p className="text-pretty text-sm leading-relaxed text-neutral-600">
            The full breakdown, including why projects run late, is in{' '}
            <Link
              href="/blog/how-long-software-projects-take"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              how long software projects take
            </Link>
            .
          </p>
        </div>
      </MotionSection>

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl">
          <h2 className="mb-xl text-balance text-2xl font-bold tracking-tight text-neutral-900">
            Questions about project timelines
          </h2>
          <FaqAccordion items={TIMELINES_FAQS} />
        </div>
      </MotionSection>

      <PageClosingCta
        title="Want a timeline for your project?"
        description="A founder and a senior engineer join the discovery call, and you get a plan with milestones within two business days."
        primary={{ label: 'Book a discovery call', href: '/contact' }}
        secondary={{ label: 'Custom software development', href: '/what-we-build/custom-software' }}
      />
    </div>
  );
}
