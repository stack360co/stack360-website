'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  fadeUp,
  motionVariants,
  scaleIn,
  staggerContainer,
} from '@/components/shared/motion/variants';
import { SITE_PROFILES } from '@/constants/site';
import { useMotionVisible } from '@/hooks/use-motion-visible';

interface PlatformRating {
  platform: string;
  /** Headline figure, exactly as the platform's public profile shows it. */
  figure: string;
  /** What the figure measures. */
  measure: string;
  /** A status the platform itself awards, if any. */
  status?: string;
  /** Public profile where the figure can be checked. */
  href: string;
}

/**
 * Figures copied from each public profile (checked 19 Oct 2026). Update them when
 * the profiles change, and never show a badge or award the platform hasn't given us.
 */
const PLATFORM_RATINGS: readonly PlatformRating[] = [
  {
    platform: 'Upwork',
    figure: '100%',
    measure: 'Job Success Score',
    status: 'Top Rated Plus',
    href: SITE_PROFILES.upwork,
  },
  {
    platform: 'Clutch',
    figure: '5.0',
    measure: 'Verified client review',
    href: SITE_PROFILES.clutch,
  },
  {
    platform: 'Fiverr',
    figure: '5.0',
    measure: 'Average of 20 client reviews',
    href: SITE_PROFILES.fiverr,
  },
];

export default function TrustBadges() {
  const reduced = useReducedMotion();
  const { ref, visible } = useMotionVisible<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      className="site-section border-t border-neutral-200 bg-neutral-50 py-2xl md:py-3xl"
      aria-labelledby="recognition-heading"
    >
      <div className="site-container flex flex-col items-center gap-xl md:gap-2xl">
        <motion.div
          variants={motionVariants(reduced, fadeUp)}
          initial={false}
          animate={visible ? 'show' : 'hidden'}
          className="text-center"
        >
          <h2
            id="recognition-heading"
            className="text-balance text-lg font-bold leading-snug tracking-tight text-neutral-800 md:text-xl md:leading-snug"
          >
            Recognized for delivering reliable software and product development solutions to
            businesses worldwide
          </h2>
        </motion.div>
        <motion.div
          variants={motionVariants(reduced, staggerContainer)}
          initial={false}
          animate={visible ? 'show' : 'hidden'}
          className="w-full max-w-5xl bg-neutral-200"
        >
          <motion.ul className="grid grid-cols-1 gap-px md:grid-cols-3">
            {PLATFORM_RATINGS.map((rating) => (
              <motion.li
                key={rating.platform}
                variants={motionVariants(reduced, scaleIn)}
                className="bg-neutral-50 transition-colors duration-300 ease-out hover:bg-white"
              >
                <a
                  href={rating.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${rating.platform}: ${rating.figure} ${rating.measure}${rating.status ? `, ${rating.status}` : ''}. View Stack360's ${rating.platform} profile (opens in a new tab)`}
                  className="group flex h-full min-h-56 flex-col items-center gap-lg p-xl text-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary md:min-h-64 md:p-2xl"
                >
                  <p className="font-mono text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-neutral-600 sm:text-xs">
                    {rating.platform}
                  </p>
                  <div className="flex flex-col items-center gap-xs">
                    <p className="text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
                      {rating.figure}
                    </p>
                    <p className="text-sm leading-relaxed text-neutral-600">{rating.measure}</p>
                    {rating.status ? (
                      <span className="mt-xs rounded-full bg-primary/10 px-sm py-px font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                        {rating.status}
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-xs text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                    View profile
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
