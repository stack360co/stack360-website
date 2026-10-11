import { ArrowRight, Building2, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import HireForm from '@/components/pages/work-with-us/hire/HireForm';
import BrandIcon from '@/components/shared/BrandIcon';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { HIRE_CTA, HIRE_HERO, HIRE_PROMISE } from '@/constants/component/hire-talent-data';
import { HIRE_TECH_PAGES } from '@/constants/component/hire-tech-data';
import ContactChannel from '../../contact/ContactChannel';

const _CONTACT_ICONS = {
  map: MapPin,
  phone: Phone,
  mail: Mail,
  building: Building2,
} as const;

export default function HireTalentPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={HIRE_HERO.eyebrow}
        title={HIRE_HERO.title}
        highlight={HIRE_HERO.highlight}
        description={HIRE_HERO.description}
      />

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <div className="space-y-xl lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <MotionStagger>
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  Recruit the top 1% of elite software engineers
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                  English-speaking, full-time remote engineers for partners and client teams — from
                  designer to senior developer, architect, tech lead, or director. Overlap with U.S.
                  time zones when your cadence needs it.
                </p>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md inline-flex rounded-md border border-primary/20 bg-primary/5 px-md py-sm font-mono text-xs font-bold tracking-wider text-primary">
                  {HIRE_PROMISE}
                </p>
              </MotionStaggerItem>
            </MotionStagger>

            <ContactChannel />
          </div>

          <MotionReveal className="lg:col-span-7">
            <MotionCard
              interactive={false}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-xl shadow-sm"
            >
              <HireForm />
            </MotionCard>
          </MotionReveal>
        </div>
      </MotionSection>

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Hire by technology
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                What our engineers build in each stack, the projects behind it and answers to common
                questions.
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
            {HIRE_TECH_PAGES.map((page) => (
              <MotionStaggerItem key={page.slug}>
                <Link
                  href={`/work-with-us/hire/${page.slug}`}
                  className="group flex h-full items-center justify-between gap-md rounded-lg border border-neutral-200 bg-neutral-50 p-lg transition-colors hover:border-primary/30"
                >
                  <span className="flex items-center gap-sm text-sm font-bold text-neutral-900 group-hover:text-primary">
                    <BrandIcon slug={page.iconSlug} size={20} variant="tech" />
                    {page.linkLabel}
                  </span>
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <PageClosingCta {...HIRE_CTA} />
    </div>
  );
}
