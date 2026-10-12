import { Suspense } from 'react';
import OpenRolesSkeleton from '@/components/layout/Loading/open-role-skeleton';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { CAREERS_CTA, CAREERS_HERO, CAREERS_INTERNSHIPS } from '@/constants/component/careers-data';
import OpenRoles from './open-roles';

export default function CareersPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={CAREERS_HERO.eyebrow}
        title={CAREERS_HERO.title}
        highlight={CAREERS_HERO.highlight}
        description={CAREERS_HERO.description}
      />

      <Suspense fallback={<OpenRolesSkeleton />}>
        <OpenRoles />
      </Suspense>

      <section className="border-b border-neutral-200 py-2xl">
        <div className="site-container">
          <div className="max-w-3xl">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
              {CAREERS_INTERNSHIPS.title}
            </h2>
            <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">
              {CAREERS_INTERNSHIPS.description}
            </p>
          </div>
        </div>
      </section>

      <PageClosingCta {...CAREERS_CTA} />
    </div>
  );
}
