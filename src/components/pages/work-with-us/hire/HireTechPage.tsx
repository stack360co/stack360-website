import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ContactChannel from '@/components/pages/contact/ContactChannel';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import HireForm from '@/components/pages/work-with-us/hire/HireForm';
import JsonLd from '@/components/seo/JsonLd';
import BrandIcon from '@/components/shared/BrandIcon';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from '@/components/shared/motion/MotionStagger';
import PageHero from '@/components/shared/PageHero';
import { HIRE_NEED_OPTIONS, HIRE_PROMISE } from '@/constants/component/hire-talent-data';
import {
  getRelatedCapabilities,
  HIRE_OWNERSHIP_FAQ,
  HIRE_REPLACEMENT_FAQ,
  HIRE_TECH_PAGES,
  HIRE_VETTING_FAQ,
  type HireTechPage,
} from '@/constants/component/hire-tech-data';
import { pageJsonLd, serviceJsonLd } from '@/lib/seo/json-ld';

const TECH_LABELS: Record<string, string> = {
  amazonaws: 'AWS',
  android: 'Android',
  angular: 'Angular',
  apple: 'iOS',
  dart: 'Dart',
  dotnet: '.NET',
  elasticsearch: 'Elasticsearch',
  expo: 'Expo',
  express: 'Express',
  firebase: 'Firebase',
  flutter: 'Flutter',
  graphql: 'GraphQL',
  kotlin: 'Kotlin',
  laravel: 'Laravel',
  mongodb: 'MongoDB',
  nestjs: 'NestJS',
  nextdotjs: 'Next.js',
  nodedotjs: 'Node.js',
  postgresql: 'PostgreSQL',
  rabbitmq: 'RabbitMQ',
  react: 'React',
  reactnative: 'React Native',
  redis: 'Redis',
  redux: 'Redux',
  ruby: 'Ruby',
  rubyonrails: 'Rails',
  sidekiq: 'Sidekiq',
  swift: 'Swift',
  tailwindcss: 'Tailwind',
  typescript: 'TypeScript',
  vercel: 'Vercel',
  xcode: 'Xcode',
};

function hiringSteps(name: string) {
  return [
    {
      title: 'Tell us about the role',
      description: `Share the ${name} work, the seniority you need, how many hours should overlap with your team and how long you need the engineer.`,
    },
    {
      title: 'Meet your shortlist',
      description: `Within 2 days we send profiles of ${name} engineers who fit the brief and have passed our technical interview, coding test, work review and English check. You talk to them and choose who joins.`,
    },
    {
      title: 'Start working together',
      description:
        'Your engineer joins your standups, repo and tools full time. Hiring can take as little as a week.',
    },
  ];
}

export default function HireTechPageView({ page }: { page: HireTechPage }) {
  const pagePath = `/work-with-us/hire/${page.slug}`;
  const others = HIRE_TECH_PAGES.filter((other) => other.slug !== page.slug);
  const services = getRelatedCapabilities(page.slug);
  const faqs = [...page.faqs, HIRE_VETTING_FAQ, HIRE_REPLACEMENT_FAQ, HIRE_OWNERSHIP_FAQ];
  const service = serviceJsonLd({
    path: pagePath,
    name: `Hire ${page.name} developers`,
    serviceType: 'Staff augmentation',
    description: page.meta.description,
  });

  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={[
          ...pageJsonLd({
            path: pagePath,
            name: page.meta.title,
            description: page.meta.description,
            crumb: page.linkLabel,
            faqs,
            about: String(service['@id']),
          }),
          service,
        ]}
      />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        highlight={page.hero.highlight}
        description={page.hero.description}
        cta={{ label: `Request ${page.name} developers`, href: '#hire-form' }}
      />

      {/* What they work on — sticky intro + 2x2 grid, same rhythm as capability pages */}
      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStagger className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <MotionStaggerItem>
              <span className="mb-md flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/5">
                <BrandIcon slug={page.iconSlug} size={24} variant="tech" />
              </span>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                {page.workTitle}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                {page.workIntro}
              </p>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md inline-flex rounded-md border border-primary/20 bg-primary/5 px-md py-sm font-mono text-xs font-bold tracking-wider text-primary">
                {HIRE_PROMISE}
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:col-span-8">
            {page.work.map((item) => (
              <MotionStaggerItem key={item.title}>
                <MotionCard className="flex h-full flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-lg transition-colors hover:border-primary/25">
                  <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-sm flex-1 text-sm leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* Portfolio proof */}
      <MotionSection className="border-b border-neutral-200 bg-linear-to-b from-neutral-50 to-neutral-100 py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                {page.projectsTitle}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">{page.projectsIntro}</p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            {page.projects.map((project) => (
              <MotionStaggerItem key={project.name}>
                <MotionCard className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg">
                  <h3 className="text-lg font-bold text-neutral-900">{project.name}</h3>
                  <p className="mt-sm flex-1 text-sm leading-relaxed text-neutral-600">
                    {project.summary}
                  </p>
                  <ul className="mt-md flex flex-wrap gap-xs" aria-label={`${project.name} stack`}>
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-neutral-200 bg-white px-sm py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {project.caseStudy || project.url ? (
                    <div className="mt-lg flex flex-wrap gap-md border-t border-neutral-200 pt-md text-sm font-bold">
                      {project.caseStudy ? (
                        <Link
                          href={project.caseStudy}
                          className="inline-flex items-center gap-xs text-primary hover:text-primary-dark"
                        >
                          Read the case study
                          <span className="sr-only">: {project.name}</span>
                          <ArrowRight size={14} aria-hidden />
                        </Link>
                      ) : null}
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-xs text-neutral-700 hover:text-primary"
                        >
                          Visit {project.name}
                          <span className="sr-only"> (opens in a new tab)</span>
                          <ArrowUpRight size={14} aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* How hiring works */}
      <MotionSection className="border-b border-neutral-200 bg-neutral-100 py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                How hiring a {page.name} developer works
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">
                Full-time remote engineers, English speaking, for as long as you need them:{' '}
                {HIRE_NEED_OPTIONS.map((option) => option.label.toLowerCase()).join(', ')}.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md md:grid-cols-3">
            {hiringSteps(page.name).map((step, index) => (
              <MotionStaggerItem key={step.title}>
                <MotionCard className="h-full rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Step {index + 1}
                  </p>
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

      {/* Stack */}
      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container flex flex-col gap-xl lg:flex-row lg:items-end lg:justify-between">
          <MotionStagger>
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Tools they work with
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                The {page.name} stack our engineers use most on client projects.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="flex flex-wrap gap-sm">
            {page.tech.map((slug) => (
              <MotionStaggerItem key={slug}>
                <span className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm shadow-sm">
                  <BrandIcon slug={slug} size={18} variant="tech" fallbackSlug="custom" />
                  <span className="text-xs font-semibold text-neutral-800">
                    {TECH_LABELS[slug] ?? slug}
                  </span>
                </span>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl">
          <MotionStagger className="mb-xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                Questions about hiring {page.name} developers
              </h2>
            </MotionStaggerItem>
          </MotionStagger>
          <FaqAccordion items={faqs} />
          {page.reading ? (
            <p className="mt-lg text-sm text-neutral-600">
              Further reading:{' '}
              <Link
                href={page.reading.href}
                className="font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                {page.reading.label}
              </Link>
            </p>
          ) : null}
        </div>
      </MotionSection>

      {/* Request form, with this technology already ticked */}
      <MotionSection id="hire-form" className="scroll-mt-24 border-b border-neutral-200 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <div className="space-y-xl lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <MotionStagger>
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  Request {page.name} developers
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                  Tell us about the role and we will reply with next steps. {page.name} is already
                  selected; add any other skills the role needs.
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
              <HireForm
                defaultSkills={[page.skillId]}
                title={`Get ${page.name} developer profiles in 2 days`}
              />
            </MotionCard>
          </MotionReveal>
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div className="site-container">
          {services.length > 0 ? (
            <div className="mb-xl">
              <h2 className="text-lg font-bold tracking-tight text-neutral-900">
                Want us to build the whole product?
              </h2>
              <ul className="mt-md flex flex-wrap gap-sm">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-xs rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      {service.label}
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <h2 className="text-lg font-bold tracking-tight text-neutral-900">
            Other developers we place
          </h2>
          <ul className="mt-md flex flex-wrap gap-sm">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/work-with-us/hire/${other.slug}`}
                  className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <BrandIcon slug={other.iconSlug} size={16} variant="tech" />
                  {other.linkLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/work-with-us/hire"
                className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/30 hover:text-primary"
              >
                All roles and skills
              </Link>
            </li>
          </ul>
        </div>
      </MotionSection>
    </div>
  );
}
