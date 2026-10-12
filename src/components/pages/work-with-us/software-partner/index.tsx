import { Suspense } from 'react';
import ContactChannel from '@/components/pages/contact/ContactChannel';
import ContactForm from '@/components/pages/contact/ContactForm';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import RelatedServices from '@/components/shared/RelatedServices';
import {
  SOFTWARE_PARTNER_BENEFITS,
  SOFTWARE_PARTNER_CTA,
  SOFTWARE_PARTNER_HERO,
  SOFTWARE_PARTNER_PROCESS,
  SOFTWARE_PARTNER_SERVICES,
  SOFTWARE_PARTNER_STATS,
} from '@/constants/component/software-partner-data';

export default function SoftwarePartnerPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={SOFTWARE_PARTNER_HERO.eyebrow}
        title={SOFTWARE_PARTNER_HERO.title}
        highlight={SOFTWARE_PARTNER_HERO.highlight}
        description={SOFTWARE_PARTNER_HERO.description}
        cta={{ label: 'Tell us about your project', href: '#start-project' }}
      />

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container">
          <MotionStagger className="grid grid-cols-1 gap-lg sm:grid-cols-3">
            {SOFTWARE_PARTNER_STATS.map((stat) => (
              <MotionStaggerItem key={stat.label}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 p-lg text-center shadow-sm">
                  <p className="text-3xl font-black text-primary">{stat.value}</p>
                  <p className="mt-xs font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {stat.label}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStagger className="lg:col-span-5">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                What we bring to your roadmap
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md max-w-3xl text-sm leading-relaxed text-neutral-600">
                Stack360 provides world-class software development and staff augmentation. Build
                faster, scale smarter, and deliver exceptional results with expert tech talent.
              </p>
            </MotionStaggerItem>
            <MotionStagger className="mt-lg space-y-sm">
              {SOFTWARE_PARTNER_SERVICES.map((service) => (
                <MotionStaggerItem key={service}>
                  <p className="flex items-center gap-sm text-sm text-neutral-700 before:text-primary before:content-['◈']">
                    {service}
                  </p>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:col-span-7">
            {SOFTWARE_PARTNER_BENEFITS.map((benefit) => (
              <MotionStaggerItem key={benefit.title}>
                <MotionCard className="rounded-lg border border-neutral-200 bg-neutral-50 p-lg transition-colors hover:border-neutral-300">
                  <div className="mb-md flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{benefit.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {benefit.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                How engagement works
              </span>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                From first call to first commit
              </h2>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {SOFTWARE_PARTNER_PROCESS.map((step) => (
              <MotionStaggerItem key={step.step}>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
                  <span className="font-mono text-3xl font-black text-primary/30">{step.step}</span>
                  <h3 className="mt-sm text-lg font-bold text-neutral-900">{step.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* The home page's "Start Your Project" lands here, so the form is on this page too. */}
      <MotionSection id="start-project" className="scroll-mt-24 border-t border-neutral-200 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <div className="space-y-xl lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <MotionStagger>
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  Tell us about your project
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                  A few lines on what you want to build is enough. A lead engineer replies within
                  one business day with next steps.
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
              <Suspense fallback={<p className="text-sm text-neutral-600">Loading form…</p>}>
                <ContactForm />
              </Suspense>
            </MotionCard>
          </MotionReveal>
        </div>
      </MotionSection>

      <RelatedServices
        title="What partners hire us to build"
        intro="A dedicated team can take on any of these, from first release to long-term upkeep."
        services={['custom-software', 'saas', 'web-apps', 'mobile-apps']}
        reading={{
          href: '/blog/how-to-choose-a-software-development-partner',
          label: 'How to Choose a Software Development Partner',
        }}
      />

      <PageClosingCta {...SOFTWARE_PARTNER_CTA} />
    </div>
  );
}
