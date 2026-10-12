import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import RelatedServices from '@/components/shared/RelatedServices';
import {
  STARTUPS_CTA,
  STARTUPS_HERO,
  STARTUPS_HIGHLIGHTS,
  STARTUPS_METRICS,
  STARTUPS_PARTNERSHIPS,
  STARTUPS_TRUST,
} from '@/constants/component/who-we-help-startups-data';

export default function StartupsPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={STARTUPS_HERO.eyebrow}
        title={STARTUPS_HERO.title}
        highlight={STARTUPS_HERO.highlight}
        description={STARTUPS_HERO.description}
      />

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container">
          <MotionStagger className="grid grid-cols-1 gap-lg sm:grid-cols-3">
            {STARTUPS_METRICS.map((metric) => (
              <MotionStaggerItem key={metric.label}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 p-lg text-center shadow-sm">
                  <p className="text-3xl font-black text-primary">{metric.value}</p>
                  <p className="mt-xs font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {metric.label}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Built for founder velocity
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                Speed without shortcuts — every sprint ships investor-visible progress and
                production-grade foundations.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2">
            {STARTUPS_HIGHLIGHTS.map((item) => (
              <MotionStaggerItem key={item.title}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 p-lg">
                  <div className="mb-md flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <MotionStagger>
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  {STARTUPS_PARTNERSHIPS.title}
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md text-sm leading-relaxed text-neutral-600">
                  {STARTUPS_PARTNERSHIPS.description}
                </p>
              </MotionStaggerItem>
            </MotionStagger>
          </div>

          <MotionStagger className="space-y-sm">
            {STARTUPS_PARTNERSHIPS.partners.map((item) => (
              <MotionStaggerItem key={item}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 px-lg py-md text-sm font-medium text-neutral-800">
                  {item}
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container">
          <MotionStagger>
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Transparent, partner-grade delivery
              </h2>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
            {STARTUPS_TRUST.map((item) => (
              <MotionStaggerItem key={item.title}>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg">
                  <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <RelatedServices
        title="Services startups ask us for"
        intro="Most first builds are a web or mobile product with sign-up and billing, sometimes with AI at the core."
        services={['saas', 'web-apps', 'mobile-apps', 'ai-solutions']}
        reading={{
          href: '/blog/mvp-development-guide',
          label: 'MVP Development: Scope, Build, and Launch',
        }}
      />

      <PageClosingCta {...STARTUPS_CTA} />
    </div>
  );
}
