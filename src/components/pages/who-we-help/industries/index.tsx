import Link from 'next/link';
import IndustryGrid from '@/components/pages/who-we-help/shared/IndustryGrid';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import RelatedServices from '@/components/shared/RelatedServices';
import {
  INDUSTRIES,
  INDUSTRIES_CTA,
  INDUSTRIES_HERO,
  INDUSTRIES_TRUST,
} from '@/constants/component/who-we-help-industries-data';

export default function IndustriesPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={INDUSTRIES_HERO.eyebrow}
        title={INDUSTRIES_HERO.title}
        highlight={INDUSTRIES_HERO.highlight}
        description={INDUSTRIES_HERO.description}
      />

      <MotionSection className="py-2xl">
        <div className="site-container space-y-xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Domain expertise across eight verticals
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                Each industry carries distinct compliance, integration, and velocity constraints. We
                architect for yours — with pain-point clarity, proven solutions, and outcomes you
                can cite in board meetings.
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <IndustryGrid industries={INDUSTRIES} />
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStagger className="lg:col-span-5">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                {INDUSTRIES_TRUST.title}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md text-sm leading-relaxed text-neutral-600">
                {INDUSTRIES_TRUST.description}
              </p>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <Link
                href={INDUSTRIES_TRUST.caseStudyLink.href}
                className="mt-lg inline-flex text-sm font-bold text-primary transition-colors hover:text-primary-dark"
              >
                {INDUSTRIES_TRUST.caseStudyLink.label}
              </Link>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="flex flex-wrap gap-sm lg:col-span-7 lg:content-start">
            {INDUSTRIES_TRUST.certifications.map((cert) => (
              <MotionStaggerItem key={cert}>
                <span className="rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm font-mono text-xs font-bold text-neutral-700">
                  {cert}
                </span>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <RelatedServices
        title="Services behind this work"
        intro="Whatever the sector, the build is usually one of these."
        services={['custom-software', 'web-apps', 'mobile-apps', 'ai-solutions']}
      />

      <PageClosingCta {...INDUSTRIES_CTA} />
    </div>
  );
}
