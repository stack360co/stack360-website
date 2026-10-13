'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import {
  EASE_OUT_EXPO,
  fadeUp,
  motionVariants,
  slideFromRight,
  staggerContainer,
} from '@/components/shared/motion/variants';
import { useMotionVisible } from '@/hooks/use-motion-visible';

interface CtaLink {
  label: string;
  href: string;
}

interface PageClosingCtaProps {
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
}

export default function PageClosingCta({
  title,
  description,
  primary,
  secondary,
}: PageClosingCtaProps) {
  const reduced = useReducedMotion();
  const { ref, visible } = useMotionVisible<HTMLElement>();

  return (
    // overflow-x-clip: the buttons slide in from the right, and before they arrive their offset
    // made the page a few pixels wider than a phone screen.
    <motion.section
      ref={ref}
      initial={false}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      className="site-section overflow-x-clip border-t border-neutral-200 bg-neutral-100 py-2xl"
    >
      <div className="site-container flex flex-col items-start justify-between gap-lg md:flex-row md:items-center">
        <motion.div
          variants={motionVariants(reduced, staggerContainer)}
          initial={false}
          animate={visible ? 'show' : 'hidden'}
          className="max-w-3xl space-y-sm"
        >
          <motion.h2
            variants={motionVariants(reduced, fadeUp)}
            className="text-balance text-2xl font-bold tracking-tight text-neutral-900"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={motionVariants(reduced, fadeUp)}
            className="text-sm leading-relaxed text-neutral-600"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={motionVariants(reduced, slideFromRight)}
          initial={false}
          animate={visible ? 'show' : 'hidden'}
          className="flex w-full flex-col gap-sm sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end"
        >
          {secondary && (
            <motion.div
              className="w-full sm:w-auto"
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={secondary.href}
                className="block w-full rounded-sm border border-neutral-300 bg-neutral-50 px-xl py-md text-center text-sm font-bold text-neutral-800 transition-colors hover:border-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:min-w-64"
              >
                {secondary.label}
              </Link>
            </motion.div>
          )}
          <motion.div
            className="w-full sm:w-auto"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={primary.href}
              className="block w-full rounded-sm bg-primary px-xl py-md text-center text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:min-w-64"
            >
              {primary.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
