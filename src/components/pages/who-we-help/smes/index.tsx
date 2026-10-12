import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import {
  SMES_CTA,
  SMES_ENGAGEMENT,
  SMES_HERO,
  SMES_OFFERS,
  SMES_ROI,
  SMES_TRUST,
} from '@/constants/component/who-we-help-smes-data';

export default function SmesPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={SMES_HERO.eyebrow}
        title={SMES_HERO.title}
        highlight={SMES_HERO.highlight}
        description={SMES_HERO.description}
      />

      <MotionSection className="py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Tailored tech for mid-market operators
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                Digital transformation, legacy modernization, automation, and custom software —
                scoped to your team size, timeline, and risk tolerance.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2">
            {SMES_OFFERS.map((offer) => (
              <MotionStaggerItem key={offer.title}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 p-lg">
                  <div className="mb-md flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary">
                    {offer.icon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{offer.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {offer.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-2">
          <MotionStagger>
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                {SMES_ROI.title}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md text-sm leading-relaxed text-neutral-600">
                {SMES_ROI.description}
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="space-y-sm">
            {SMES_ROI.outcomes.map((outcome) => (
              <MotionStaggerItem key={outcome}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 px-lg py-md text-sm leading-relaxed text-neutral-700">
                  {outcome}
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
                Flexible engagement models
              </h2>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
            {SMES_ENGAGEMENT.map((item) => (
              <MotionStaggerItem key={item.model}>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg">
                  <h3 className="text-base font-bold text-neutral-900">{item.model}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">{item.detail}</p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 py-2xl">
        <div className="site-container">
          <MotionStagger>
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Proven partner for growing businesses
              </h2>
            </MotionStaggerItem>
          </MotionStagger>
          <MotionStagger className="mt-xl grid grid-cols-1 gap-lg md:grid-cols-3">
            {SMES_TRUST.map((item) => (
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

      <PageClosingCta {...SMES_CTA} />
    </div>
  );
}
