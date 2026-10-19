import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import LeaderCards from '@/components/pages/who-we-are/shared/LeaderCards';
import MasonryGallery from '@/components/pages/who-we-are/shared/MasonryGallery';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { CULTURE_OFFICE_PHOTOS } from '@/constants/component/who-we-are-culture-data';
import {
  LAHORE_CTA,
  LAHORE_FACTS,
  LAHORE_FAQS,
  LAHORE_HERO,
  LAHORE_LEADERS,
  LAHORE_VISIT,
  LAHORE_WORK,
} from '@/constants/component/who-we-are-lahore-data';

export default function LahoreOfficePage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={LAHORE_HERO.eyebrow}
        title={LAHORE_HERO.title}
        highlight={LAHORE_HERO.highlight}
        description={LAHORE_HERO.description}
      />

      <MotionSection className="py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStagger className="space-y-md lg:col-span-5">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                {LAHORE_VISIT.title}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">{LAHORE_VISIT.note}</p>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <a
                href={LAHORE_VISIT.directions.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-sm rounded-md bg-primary px-lg py-sm text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <MapPin size={16} aria-hidden />
                {LAHORE_VISIT.directions.label}
              </a>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionCard
            interactive={false}
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-xl lg:col-span-7"
          >
            <dl className="grid grid-cols-1 gap-lg sm:grid-cols-2">
              {LAHORE_VISIT.items.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    {item.label}
                  </dt>
                  <dd className="mt-xs text-sm leading-relaxed text-neutral-800">
                    {'href' in item ? (
                      <a href={item.href} className="transition-colors hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </MotionCard>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container space-y-xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Inside the office
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                The engineering hall, meeting room and team spaces at 82-G, DHA Phase 1.
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MasonryGallery photos={CULTURE_OFFICE_PHOTOS} />
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container space-y-xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                {LAHORE_WORK.title}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">{LAHORE_WORK.intro}</p>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {LAHORE_WORK.items.map((item) => (
              <MotionStaggerItem key={item.title}>
                <MotionCard className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg">
                  <h3 className="text-lg font-bold tracking-tight text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-sm flex-1 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-md inline-flex items-center gap-xs text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {item.cta}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
          <dl className="grid grid-cols-2 gap-lg border-t border-neutral-200 pt-lg md:grid-cols-4">
            {LAHORE_FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  {fact.label}
                </dt>
                <dd className="mt-xs text-xl font-bold tracking-tight text-neutral-900">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container space-y-xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Who leads the team
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                The founders work from the Lahore office with the rest of the team.
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <LeaderCards leaders={LAHORE_LEADERS} />
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container">
          <div className="max-w-3xl space-y-lg">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Common questions</h2>
            <FaqAccordion items={LAHORE_FAQS} />
          </div>
        </div>
      </MotionSection>

      <PageClosingCta {...LAHORE_CTA} />
    </div>
  );
}
