'use client';

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Star,
  UserRound,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LANDING_TESTIMONIALS } from '@/constants/component/landing-data';

interface TestimonialAvatarProps {
  src?: string;
  alt: string;
}

function TestimonialAvatar({ src, alt }: TestimonialAvatarProps) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
  }, []);

  const showImage = Boolean(src) && !failed;

  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-b from-neutral-100 to-neutral-200">
      {loading && showImage && (
        <div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-neutral-800">
          <div className="h-8 w-8 rounded-full bg-neutral-700/60 md:h-12 md:w-12" />
        </div>
      )}

      {showImage ? (
        <>
          <Image
            src={src as string}
            alt={alt}
            fill
            sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
            className={`object-cover transition-opacity duration-300 ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setFailed(true);
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-neutral-900/40 to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200"
        >
          <div className="pointer-events-none absolute inset-0 bg-primary/5" />
          <span className="relative flex h-full w-full items-center justify-center text-neutral-400">
            <UserRound className="size-6 md:size-8" strokeWidth={1.5} />
          </span>
        </div>
      )}
    </div>
  );
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export default function TestimonialsCarousel() {
  const reduced = useReducedMotion();
  const [[active, direction], setActiveState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const total = LANDING_TESTIMONIALS.length;
  const current = LANDING_TESTIMONIALS[active];

  // Find the testimonial with the longest quote text to lock maximum container height
  const longestTestimonial = useMemo(() => {
    return LANDING_TESTIMONIALS.reduce((prev, curr) =>
      curr.quote.length > prev.quote.length ? curr : prev
    );
  }, []);

  const goTo = useCallback(
    (newIndex: number, newDirection: number) => {
      setActiveState([(newIndex + total) % total, newDirection]);
    },
    [total]
  );

  const next = useCallback(() => {
    setActiveState(([i]) => [(i + 1) % total, 1]);
  }, [total]);

  const prev = useCallback(() => {
    setActiveState(([i]) => [(i - 1 + total) % total, -1]);
  }, [total]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      next();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      prev();
    }
  };

  useEffect(() => {
    if (reduced || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      next();
    }, 8000);

    return () => window.clearInterval(timer);
  }, [reduced, paused, next]);

  return (
    <section className="site-section relative w-full overflow-hidden border-t border-neutral-200 bg-linear-to-b from-neutral-100 to-neutral-200 py-xl sm:py-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[80px] sm:h-80 sm:w-80"
      />

      <div className="site-container relative">
        {/* Header with Nav Controls */}
        <div className="mb-md flex flex-col gap-sm sm:mb-xl sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-xs">
            <h2 className="text-balance text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
              What our partners <span className="font-medium italic text-primary">say.</span>
            </h2>
          </div>

          <div className="hidden items-center gap-xs self-end sm:flex sm:self-auto sm:shrink-0">
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? 'Play testimonials' : 'Pause testimonials'}
                aria-pressed={paused}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-11 sm:w-11"
              >
                {paused ? (
                  <Play className="size-3.5 sm:size-4" aria-hidden />
                ) : (
                  <Pause className="size-3.5 sm:size-4" aria-hidden />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-11 sm:w-11"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-11 sm:w-11"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full" aria-live="polite" aria-atomic="true">
          <div className="relative mx-auto w-full md:w-[calc(100%-15rem)]">
            {/* Mobile overlay arrows sit on the card, not in a reserved gutter */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-800 shadow-md backdrop-blur-xs transition-transform active:scale-95 sm:hidden"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-800 shadow-md backdrop-blur-xs transition-transform active:scale-95 sm:hidden"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Invisible sizing placeholder — same width/padding as the visible card */}
            <div
              aria-hidden="true"
              className="pointer-events-none invisible flex w-full flex-col gap-md px-12 py-md sm:p-xl md:p-2xl"
            >
              <div className="flex shrink-0 flex-col gap-xs sm:flex-row sm:items-center sm:justify-between sm:gap-md">
                <div className="flex items-center gap-sm">
                  <div className="size-12 sm:size-14 md:size-16" />
                  <div>
                    <div className="h-6 w-32" />
                    <div className="mt-1 h-4 w-24" />
                  </div>
                </div>
                <div className="h-5 w-24" />
              </div>
              <blockquote className="text-pretty text-sm font-normal leading-relaxed text-neutral-800 sm:text-base md:text-lg">
                &ldquo;{longestTestimonial.quote}&rdquo;
              </blockquote>
              {/* Room for a review-source link, so cards with one don't change the height */}
              <p className="text-xs">&nbsp;</p>
            </div>

            {/* Active Animated Slide */}
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.article
                key={active}
                custom={direction}
                variants={reduced ? undefined : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex h-full w-full touch-pan-y select-none flex-col justify-between gap-md overflow-hidden rounded-2xl border border-neutral-200/80 bg-white px-12 py-md shadow-xl shadow-neutral-900/5 sm:p-xl md:p-2xl"
              >
                {/* Background Quote Accent */}
                <Quote
                  className="pointer-events-none absolute right-4 top-4 size-16 text-neutral-100 sm:right-6 sm:top-6 sm:size-24 md:size-28"
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden
                />

                {/* Card Header */}
                <div className="relative z-10 flex shrink-0 flex-col gap-xs sm:flex-row sm:items-center sm:justify-between sm:gap-md">
                  <div className="flex items-center gap-sm">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-neutral-100 shadow-xs sm:size-14 md:size-16">
                      <TestimonialAvatar
                        key={current.avatar ?? current.name}
                        src={current.avatar}
                        alt={current.name}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-extrabold text-neutral-900 sm:text-lg md:text-xl">
                        {current.name}
                      </h3>
                      {[current.role, current.company].some(Boolean) && (
                        <p className="mt-0.5 truncate text-xs font-medium text-neutral-500 sm:text-sm">
                          {[current.role, current.company].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-0.5 text-amber-400"
                    role="img"
                    aria-label={`${current.rating} out of 5 stars`}
                  >
                    {(['a', 'b', 'c', 'd', 'e'] as const)
                      .slice(0, current.rating || 5)
                      .map((id) => (
                        <Star
                          key={id}
                          className="size-4 fill-amber-400 text-amber-400 sm:size-5"
                          aria-hidden
                        />
                      ))}
                  </div>
                </div>

                {/* Quote Content */}
                <blockquote className="relative z-10 text-pretty text-sm font-normal leading-relaxed text-neutral-800 sm:text-base md:text-lg">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                {current.source ? (
                  <a
                    href={current.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex w-fit items-center gap-xs text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {current.source.label}
                    <ArrowUpRight size={12} aria-hidden />
                  </a>
                ) : null}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-md flex justify-center gap-xs sm:mt-lg sm:gap-sm">
          {LANDING_TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(index, index > active ? 1 : -1)}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={index === active ? 'true' : undefined}
              className="flex h-8 w-8 items-center justify-center sm:h-11 sm:w-11"
            >
              <span
                className={`block h-1.5 rounded-full transition-all sm:h-2 ${
                  index === active
                    ? 'w-6 bg-primary sm:w-8'
                    : 'w-1.5 bg-neutral-400 hover:bg-neutral-600 sm:w-2'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
