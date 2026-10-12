import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import MotionSection from '@/components/shared/motion/MotionSection';
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';

export interface SectionHubChapter {
  title: string;
  blurb: string;
  href: string;
  cta: string;
  status?: 'live' | 'soon';
}

export interface SectionHubFacts {
  title: string;
  summary: string;
  items: readonly { label: string; value: string }[];
}

export interface SectionHubProps {
  crumb: string;
  title: string;
  highlight?: string;
  description: string;
  exploreBlurb?: string;
  chapters: SectionHubChapter[];
  /** Defining facts about the company, shown under the hero. */
  facts?: SectionHubFacts;
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export default function SectionHub({
  crumb,
  title,
  highlight,
  description,
  exploreBlurb = 'Pick a lane to go deeper.',
  chapters,
  facts,
  cta,
}: SectionHubProps) {
  return (
    <div className="flex w-full flex-col">
      <section className="site-section relative overflow-hidden border-b border-neutral-200 bg-neutral-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_100%_0%,color-mix(in_srgb,var(--token-primary)_14%,transparent),transparent_58%)]"
        />
        <div className="site-container relative py-2xl">
          <MotionReveal className="max-w-content">
            <p className="font-sans text-sm font-bold tracking-tight text-neutral-900">
              Stack<span className="text-primary">360</span>
              <span className="mx-sm text-neutral-300">/</span>
              <span className="text-neutral-600">{crumb}</span>
            </p>
            <h1 className="mt-md text-balance text-4xl font-black leading-[1.05] tracking-tight text-neutral-900 md:text-5xl">
              {title}
              {highlight ? <span className="text-primary"> {highlight}</span> : null}
            </h1>
            <p className="mt-lg max-w-content text-pretty text-base leading-relaxed text-neutral-600">
              {description}
            </p>
          </MotionReveal>
        </div>
      </section>

      {facts ? (
        <MotionSection className="border-b border-neutral-200 py-2xl">
          <div className="site-container grid grid-cols-1 gap-xl lg:grid-cols-12">
            <MotionReveal className="lg:col-span-5">
              <h2 className="text-2xl font-black tracking-tight text-neutral-900">{facts.title}</h2>
              <p className="mt-sm max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                {facts.summary}
              </p>
            </MotionReveal>
            <MotionStagger className="grid grid-cols-2 gap-md sm:grid-cols-3 lg:col-span-7">
              {facts.items.map((item) => (
                <MotionStaggerItem key={item.label}>
                  <div className="h-full rounded-lg border border-neutral-200 bg-neutral-50 p-lg">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {item.label}
                    </p>
                    <p className="mt-xs text-lg font-black tracking-tight text-neutral-900">
                      {item.value}
                    </p>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </div>
        </MotionSection>
      ) : null}

      <MotionSection className="py-2xl">
        <div className="site-container">
          <MotionReveal className="mb-xl max-w-content">
            <h2 className="text-2xl font-black tracking-tight text-neutral-900">Explore</h2>
            <p className="mt-sm text-sm leading-relaxed text-neutral-600">{exploreBlurb}</p>
          </MotionReveal>
          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => {
              const isSoon = chapter.status === 'soon';

              return (
                <MotionStaggerItem key={chapter.href}>
                  {isSoon ? (
                    <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-lg">
                      <div>
                        <div className="flex items-center gap-sm">
                          <h3 className="text-lg font-bold tracking-tight text-neutral-900">
                            {chapter.title}
                          </h3>
                          <span className="rounded-sm border border-neutral-200 bg-neutral-100 px-sm py-xs font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                            Soon
                          </span>
                        </div>
                        <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                          {chapter.blurb}
                        </p>
                      </div>
                      <span className="mt-lg text-xs font-bold text-neutral-500">
                        {chapter.cta}
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={chapter.href}
                      className="group flex h-full flex-col justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-lg transition-colors hover:border-primary/30 hover:bg-neutral-50"
                    >
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-primary">
                          {chapter.title}
                        </h3>
                        <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                          {chapter.blurb}
                        </p>
                      </div>
                      <span className="mt-lg inline-flex items-center gap-xs text-xs font-bold text-primary">
                        {chapter.cta}
                        <ArrowUpRight
                          size={12}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </Link>
                  )}
                </MotionStaggerItem>
              );
            })}
          </MotionStagger>
        </div>
      </MotionSection>

      <PageClosingCta {...cta} />
    </div>
  );
}
