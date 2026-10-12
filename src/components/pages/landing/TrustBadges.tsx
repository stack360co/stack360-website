'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import {
  fadeUp,
  motionVariants,
  scaleIn,
  staggerContainer,
} from '@/components/shared/motion/variants';
import { SITE_PROFILES } from '@/constants/site';
import { useMotionVisible } from '@/hooks/use-motion-visible';

interface TrustBadge {
  src: string;
  label: string;
  alt: string;
  /** Public profile where the rating can be checked. */
  href?: string;
}

const TRUST_BADGES: readonly TrustBadge[] = [
  {
    src: '/assets/badges/clutch.webp',
    label: 'Clutch — Top Web Development Company 2024',
    alt: 'Clutch Top Web Development Company 2024 badge',
    href: SITE_PROFILES.clutch,
  },
  {
    src: '/assets/badges/Goodfirms.webp',
    label: 'GoodFirms — Top Rated Web Development',
    alt: 'GoodFirms Top Rated Web Development Company badge',
    href: SITE_PROFILES.goodfirms,
  },
  {
    src: '/assets/badges/Upwork.webp',
    label: 'Upwork — Top Rated Seller',
    alt: 'Upwork Top Rated Seller badge',
  },
  {
    src: '/assets/badges/Fiverr.webp',
    label: 'Fiverr — Top Rated Seller',
    alt: 'Fiverr Top Rated Seller badge',
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
          className="w-full max-w-6xl bg-neutral-200"
        >
          <motion.ul className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((badge) => (
              <motion.li
                key={badge.src}
                variants={motionVariants(reduced, scaleIn)}
                className="group flex min-h-56 flex-col items-center justify-between gap-lg bg-neutral-50 p-xl transition-colors duration-300 ease-out hover:bg-white sm:min-h-64 md:min-h-72 md:p-2xl lg:min-h-80"
              >
                <p className="text-center font-mono text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-neutral-600 sm:text-xs">
                  {badge.label}
                </p>

                <div className="relative flex w-full flex-1 items-center justify-center">
                  <div className="relative h-28 w-full max-w-55 transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-32 md:h-40 lg:h-44 lg:max-w-65">
                    {badge.href ? (
                      <a
                        href={badge.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        <Image
                          src={badge.src}
                          alt={`${badge.alt}. View Stack360 reviews (opens in a new tab)`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                          className="object-contain"
                        />
                      </a>
                    ) : (
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
