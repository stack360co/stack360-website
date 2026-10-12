'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import BrandIcon from '@/components/shared/BrandIcon';
import { fadeUp, motionVariants, staggerContainer } from '@/components/shared/motion/variants';
import { LANDING_CASE_STUDIES } from '@/constants/component/landing-data';
import { useMotionVisible } from '@/hooks/use-motion-visible';

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof LANDING_CASE_STUDIES)[number];
  index: number;
}) {
  const { ref, visible } = useMotionVisible<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-lg shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-md"
    >
      <div className="mb-md flex items-start justify-between gap-md">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
          {study.tag}
        </span>
        <div className="text-right">
          <p className="font-mono text-xl font-black text-neutral-900">{study.metric}</p>
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-500">
            {study.metricLabel}
          </p>
        </div>
      </div>

      <h3 className="text-lg font-bold tracking-tight text-neutral-900">
        <Link
          href={`/our-work/case-studies/${study.slug}`}
          className="inline-block transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {study.title}
        </Link>
      </h3>

      <p className="mt-sm flex-1 text-sm leading-relaxed text-neutral-600">{study.description}</p>

      <div className="mt-lg flex items-center justify-between border-t border-neutral-100 pt-md">
        <div className="flex items-center gap-sm">
          {study.stack.map((slug) => (
            <span
              key={slug}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50"
              title={slug}
            >
              <BrandIcon slug={slug} size={16} variant="tech" />
            </span>
          ))}
        </div>

        <Link
          href={`/our-work/case-studies/${study.slug}`}
          className="group/link flex items-center gap-xs text-xs font-bold text-neutral-600 transition-colors hover:text-primary"
        >
          View case
          <span className="sr-only">: {study.title}</span>
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

export default function CaseStudiesSection() {
  const reduced = useReducedMotion();
  const { ref, visible } = useMotionVisible<HTMLDivElement>();

  return (
    <section className="site-section relative w-full overflow-hidden border-t border-neutral-200 bg-neutral-50 py-2xl">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />

      <div className="site-container relative">
        <motion.div
          ref={ref}
          variants={motionVariants(reduced, staggerContainer)}
          initial={false}
          animate={visible ? 'show' : 'hidden'}
          className="mb-2xl flex flex-col gap-lg lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl space-y-md">
            <motion.h2
              variants={motionVariants(reduced, fadeUp)}
              className="text-balance text-3xl font-black leading-[1.05] tracking-tight text-neutral-900 md:text-4xl"
            >
              Real Solutions. Measurable Business Outcomes.
            </motion.h2>
            <motion.p
              variants={motionVariants(reduced, fadeUp)}
              className="text-sm leading-relaxed text-neutral-600"
            >
              Explore how we help businesses solve complex challenges, improve performance, and
              create measurable results through technology.
            </motion.p>
          </div>

          <motion.div variants={motionVariants(reduced, fadeUp)}>
            <Link
              href="/our-work/case-studies"
              className="group inline-flex items-center gap-sm rounded-full bg-primary px-lg py-md text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark"
            >
              Explore all cases
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-50/20 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          {LANDING_CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
