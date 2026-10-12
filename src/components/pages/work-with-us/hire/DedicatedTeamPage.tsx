import Link from 'next/link';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import HireForm from '@/components/pages/work-with-us/hire/HireForm';
import HireInfoSection from '@/components/pages/work-with-us/hire/HireInfoSection';
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
import {
  DEDICATED_TEAM_HERO,
  DEDICATED_TEAM_PROOF,
  DEDICATED_TEAM_ROLES,
  DEDICATED_TEAM_STEPS,
  HIRE_CTA,
  HIRE_PROMISE,
  HIRE_TEAM_OPTIONS,
  HIRE_TERMS,
} from '@/constants/component/hire-talent-data';
import { HIRE_TECH_PAGES } from '@/constants/component/hire-tech-data';
import ContactChannel from '../../contact/ContactChannel';

interface DedicatedTeamPageProps {
  faqs: readonly { id: string; question: string; answer: string }[];
}

export default function DedicatedTeamPage({ faqs }: DedicatedTeamPageProps) {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={DEDICATED_TEAM_HERO.eyebrow}
        title={DEDICATED_TEAM_HERO.title}
        highlight={DEDICATED_TEAM_HERO.highlight}
        description={DEDICATED_TEAM_HERO.description}
        cta={{ label: 'Request a team', href: '#hire-form' }}
      />

      <HireInfoSection
        title="Two ways to build your team"
        intro="Lead the engineers yourself, or hand the day-to-day running to a project manager on our side."
        items={HIRE_TEAM_OPTIONS.map((option) => ({ ...option, href: undefined }))}
        columns={2}
      />

      <HireInfoSection
        title="Who can be in the team"
        intro="Engineers always, and the other roles only when the work needs them."
        items={DEDICATED_TEAM_ROLES}
        tinted
      />

      <HireInfoSection title="How a dedicated team starts" items={DEDICATED_TEAM_STEPS} steps />

      <HireInfoSection
        title="Team sizes on our case studies"
        intro="Most of our projects run with small teams that stay with the product."
        items={DEDICATED_TEAM_PROOF}
        tinted
      />

      <HireInfoSection title="Hours, location and contracts" items={HIRE_TERMS} columns={4} />

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl">
          <MotionStagger className="mb-xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Questions about dedicated teams
              </h2>
            </MotionStaggerItem>
          </MotionStagger>
          <FaqAccordion items={faqs} />
          <p className="mt-lg text-sm text-neutral-600">
            Further reading:{' '}
            <Link
              href="/blog/staff-augmentation-vs-outsourcing"
              className="font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Staff augmentation vs. outsourcing
            </Link>
          </p>
        </div>
      </MotionSection>

      <MotionSection id="hire-form" className="scroll-mt-24 border-b border-neutral-200 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <div className="space-y-xl lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <MotionStagger>
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  Request a dedicated team
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                  Tell us what you are building and the skills it needs. Mention the roles you want
                  alongside the engineers, and we will reply with next steps.
                </p>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md inline-flex rounded-md border border-primary/20 bg-primary/5 px-md py-sm font-mono text-xs font-bold tracking-wider text-primary">
                  {HIRE_PROMISE}
                </p>
              </MotionStaggerItem>
            </MotionStagger>
            <ContactChannel testimonialName="Cameron Kashani" />
          </div>

          <MotionReveal className="lg:col-span-7">
            <MotionCard
              interactive={false}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-xl shadow-sm"
            >
              <HireForm title="Tell us about the team you need" />
            </MotionCard>
          </MotionReveal>
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900">Developers we place</h2>
          <ul className="mt-md flex flex-wrap gap-sm">
            {HIRE_TECH_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/work-with-us/hire/${page.slug}`}
                  className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <BrandIcon slug={page.iconSlug} size={16} variant="tech" />
                  {page.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      <PageClosingCta {...HIRE_CTA} />
    </div>
  );
}
