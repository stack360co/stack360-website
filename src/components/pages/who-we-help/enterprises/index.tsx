import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import RelatedServices from '@/components/shared/RelatedServices';
import {
  ENTERPRISES_CTA,
  ENTERPRISES_DIFFERENTIATORS,
  ENTERPRISES_HERO,
  ENTERPRISES_TRUST,
} from '@/constants/component/who-we-help-enterprises-data';

export default function EnterprisesPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={ENTERPRISES_HERO.eyebrow}
        title={ENTERPRISES_HERO.title}
        highlight={ENTERPRISES_HERO.highlight}
        description={ENTERPRISES_HERO.description}
      />

      <MotionSection className="py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Enterprise differentiators
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                Compliance, scale, integration depth, and always-on support — without the
                procurement drag of a traditional systems integrator.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {ENTERPRISES_DIFFERENTIATORS.map((item) => (
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
        <div className="site-container space-y-2xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Trusted by teams at scale
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                Long-term partnerships with organizations that demand uptime, auditability, and
                engineering depth across cloud platforms.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-2xl lg:grid-cols-2">
            <MotionStaggerItem>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                Cloud partnerships
              </p>
              <div className="mt-md flex flex-wrap gap-sm">
                {ENTERPRISES_TRUST.cloudPartners.map((partner) => (
                  <span
                    key={partner}
                    className="rounded-md border border-neutral-200 bg-neutral-50 px-lg py-sm font-mono text-sm font-bold text-neutral-800"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                Client programs
              </p>
              <div className="mt-md flex flex-wrap gap-sm">
                {ENTERPRISES_TRUST.clients.map((client) => (
                  <span
                    key={client}
                    className="rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-700"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStaggerItem>
            <MotionCard
              interactive={false}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg"
            >
              <h3 className="text-lg font-bold text-neutral-900">{ENTERPRISES_TRUST.sla.title}</h3>
              <p className="mt-sm max-w-3xl text-sm leading-relaxed text-neutral-600">
                {ENTERPRISES_TRUST.sla.description}
              </p>
            </MotionCard>
          </MotionStaggerItem>
        </div>
      </MotionSection>

      <RelatedServices
        title="Services enterprises ask us for"
        intro="Legacy systems, cloud moves and release pipelines are where most enterprise work begins."
        services={['erp', 'cloud', 'devops', 'custom-software']}
      />

      <PageClosingCta {...ENTERPRISES_CTA} />
    </div>
  );
}
