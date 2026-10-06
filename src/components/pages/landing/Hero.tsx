'use client';

import { Star } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EASE_OUT_EXPO, motionVariants } from '@/components/shared/motion/variants';
import { LANDING_HERO } from '@/constants/component/landing-data';
import { useCanAnimate } from '@/hooks/use-can-animate';

const ROTATING_PHRASES = LANDING_HERO.phrases;

const TEAM_AVATARS = [
  {
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    alt: 'Stack360 client partner',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'Stack360 client partner',
  },
  {
    src: 'https://randomuser.me/api/portraits/women/68.jpg',
    alt: 'Stack360 client partner',
  },
] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

function RotatingPhrase({ reduced }: { reduced: boolean | null }) {
  const [index, setIndex] = useState(0);
  const canAnimate = useCanAnimate();

  useEffect(() => {
    if (reduced || !canAnimate) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROTATING_PHRASES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduced, canAnimate]);

  const phrase = ROTATING_PHRASES[index];

  if (!canAnimate) {
    return <span className="mt-sm block text-primary">{ROTATING_PHRASES[0]}</span>;
  }

  return (
    <span className="relative mt-sm block min-h-[1.15em] overflow-hidden text-primary">
      <span className="invisible block" aria-hidden>
        Perform Under Load.
      </span>
      <span className="sr-only" aria-live="polite">
        {phrase}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phrase}
          aria-hidden
          initial={reduced ? false : { y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={reduced ? undefined : { y: '-110%', opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.48, ease: EASE_OUT_EXPO }}
          className="absolute inset-x-0 top-0 block text-primary"
        >
          {phrase}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="site-section relative flex w-full flex-1 items-center justify-center overflow-hidden py-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--token-neutral-50)_0%,var(--token-neutral-50)_28%,color-mix(in_srgb,var(--token-neutral-100)_42%,var(--token-neutral-50))_62%,var(--token-neutral-100)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_52%_at_50%_0%,color-mix(in_srgb,var(--token-primary)_13%,transparent),transparent_72%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_38%_34%_at_88%_72%,color-mix(in_srgb,var(--token-secondary)_6%,transparent),transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--token-neutral-900) 4%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--token-neutral-900) 4%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(180deg, black 0%, black 45%, transparent 88%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] left-1/2 h-112 w-[min(72rem,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-tint/18 blur-[80px]"
        style={{ maskImage: 'linear-gradient(180deg, black 0%, transparent 78%)' }}
      />

      <div className="site-container relative flex min-h-[calc(100vh-230px)] md:min-h-[calc(100vh-150px)] w-full items-center justify-center">
        <motion.div
          variants={motionVariants(reduced, stagger)}
          initial={false}
          animate="show"
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={motionVariants(reduced, fadeUp)}
            className="mb-lg font-sans text-2xl font-black tracking-tight text-neutral-950 select-none"
          >
            <Image
              src="/stack360-text.svg"
              alt=""
              width={120}
              height={24}
              className="h-5 w-auto select-none object-contain"
              priority
            />
          </motion.p>

          <motion.h1
            variants={motionVariants(reduced, fadeUp)}
            className="text-balance text-4xl font-black leading-[1.08] tracking-tight text-neutral-900 md:text-5xl lg:text-[clamp(3rem,5vw,4rem)]"
          >
            {LANDING_HERO.lead}
            <RotatingPhrase reduced={reduced} />
          </motion.h1>

          <motion.p
            variants={motionVariants(reduced, fadeUp)}
            className="mt-lg text-pretty text-base leading-relaxed font-medium text-neutral-700"
          >
            {LANDING_HERO.intro}
          </motion.p>

          <motion.div
            variants={motionVariants(reduced, fadeUp)}
            className="mt-xl flex flex-wrap items-center justify-center gap-md rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm shadow-sm"
          >
            <div className="flex items-center">
              {TEAM_AVATARS.map((avatar, index) => (
                <span
                  key={avatar.src}
                  style={{ marginLeft: index === 0 ? 0 : -8 }}
                  className="relative inline-block h-7 w-7 overflow-hidden rounded-full border-2 border-neutral-50"
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </span>
              ))}
              <span className="-ml-2 z-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-50 bg-neutral-900 text-[8px] font-bold text-neutral-50">
                500+
              </span>
            </div>
            <div className="flex items-center gap-xs" role="img" aria-label="5.0 out of 5 stars">
              {(['a', 'b', 'c', 'd', 'e'] as const).map((id) => (
                <Star key={id} size={14} className="fill-primary text-primary" aria-hidden />
              ))}
              <span className="ml-xs text-sm font-bold text-neutral-900">5.0</span>
            </div>
            <span className="hidden h-4 w-px bg-neutral-200 sm:block" aria-hidden />
            <span className="font-mono text-[10px] font-bold tracking-widest text-neutral-600 uppercase">
              Trusted by 500+ companies
            </span>
          </motion.div>

          <motion.div
            variants={motionVariants(reduced, fadeUp)}
            className="mt-xl flex w-full flex-col items-center justify-center gap-md sm:w-auto sm:flex-row"
          >
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/work-with-us/software-partner"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-primary px-xl py-md text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
              >
                Start Your Project
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.03 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/our-work/featured-projects"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-neutral-300 bg-neutral-50 px-xl py-md text-sm font-bold text-neutral-800 transition-colors hover:border-neutral-500 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
