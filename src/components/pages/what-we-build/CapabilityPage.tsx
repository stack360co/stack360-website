import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialsSection from '@/components/pages/landing/TestimonialsSection';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
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
import RelatedServices from '@/components/shared/RelatedServices';
import { getHireTechPage, HIRE_TECH_FOR_CAPABILITY } from '@/constants/component/hire-tech-data';
import {
  CAPABILITY_ICONS,
  CAPABILITY_SERVICE_NAMES,
  type CapabilityPageData,
  RELATED_CAPABILITIES,
} from '@/constants/component/what-we-build-data';
import { pageJsonLdFromMeta, serviceJsonLd } from '@/lib/seo/json-ld';
import { capitalize } from '@/utils/string';

const TECH_LABELS: Record<string, string> = {
  react: 'React',
  nextdotjs: 'Next.js',
  nodedotjs: 'Node.js',
  vuedotjs: 'Vue.js',
  reactnative: 'React Native',
  flutter: 'Flutter',
  swift: 'Swift',
  kotlin: 'Kotlin',
  python: 'Python',
  dotnet: '.NET',
  postgresql: 'PostgreSQL',
  mongodb: 'MongoDB',
  amazonaws: 'AWS',
  microsoftazure: 'Azure',
  azure: 'Azure',
  graphql: 'GraphQL',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  rubyonrails: 'Rails',
  tailwindcss: 'Tailwind',
  huggingface: 'Hugging Face',
  openjdk: 'Java',
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  tensorflow: 'TensorFlow',
  pytorch: 'PyTorch',
  google: 'Google Cloud',
  github: 'GitHub',
  gitlab: 'GitLab',
  jenkins: 'Jenkins',
  terraform: 'Terraform',
  ansible: 'Ansible',
  prometheus: 'Prometheus',
  grafana: 'Grafana',
  n8n: 'n8n',
  zapier: 'Zapier',
  wordpress: 'WordPress',
  shopify: 'Shopify',
};

function formatTechLabel(slug: string) {
  return TECH_LABELS[slug] ?? capitalize(slug.replace(/dotjs$/i, '.js'));
}

function processPhaseLabel(step: { phase?: string }, index: number, total: number): string {
  if (step.phase) {
    return step.phase;
  }
  if (index === 0) {
    return 'Start';
  }
  if (index === total - 1) {
    return 'Finish';
  }
  return 'Next';
}

interface CapabilityPageProps {
  data: CapabilityPageData;
  /** The page's `seo` entry, so the schema names the page the way its title does. */
  meta: Metadata;
}

export default function CapabilityPage({ data, meta }: CapabilityPageProps) {
  const iconSlug = CAPABILITY_ICONS[data.slug];
  const [lead, ...rest] = data.capabilities;
  const pagePath = `/what-we-build/${data.slug}`;
  const hirePages = (HIRE_TECH_FOR_CAPABILITY[data.slug] ?? [])
    .map((slug) => getHireTechPage(slug))
    .filter((page) => page !== undefined);
  const service = serviceJsonLd({
    path: pagePath,
    name: CAPABILITY_SERVICE_NAMES[data.slug],
    serviceType: CAPABILITY_SERVICE_NAMES[data.slug],
    description: typeof meta.description === 'string' ? meta.description : data.hero.description,
  });
  const capabilityTitle =
    data.hero.eyebrow.split('·').pop()?.trim() ??
    data.slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

  return (
    <div className="flex w-full flex-col">
      <JsonLd
        data={[
          ...pageJsonLdFromMeta(meta, {
            crumb: capabilityTitle,
            faqs: data.faqs,
            about: String(service['@id']),
            reviewedByFounder: Boolean(data.reviewer),
            dateModified: data.updated,
          }),
          service,
        ]}
      />
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        highlight={data.hero.highlight}
        description={data.hero.description}
        cta={data.hero.cta}
      />

      {data.reviewer ? (
        <div className="border-b border-neutral-200 bg-neutral-50">
          <div className="site-container flex items-center gap-sm py-md">
            <Image
              src={data.reviewer.image}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full border border-neutral-200 object-cover"
            />
            <p className="text-xs text-neutral-600">
              Reviewed by{' '}
              <Link
                href={data.reviewer.href}
                className="font-bold text-neutral-900 transition-colors hover:text-primary"
              >
                {data.reviewer.name}
              </Link>
              , {data.reviewer.role}
              {data.updated ? (
                <>
                  {' · Updated '}
                  <time dateTime={data.updated}>
                    {new Date(`${data.updated}T00:00:00Z`).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                </>
              ) : null}
            </p>
          </div>
        </div>
      ) : null}

      {/* Capabilities — asymmetric: sticky intro + lead feature + grid */}
      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStagger className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <MotionStaggerItem>
              <span className="mb-md flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/5">
                <BrandIcon slug={iconSlug} size={24} variant="service" />
              </span>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                {data.capabilitiesTitle}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                {data.capabilitiesIntro}
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <div className="space-y-md lg:col-span-8">
            {lead ? (
              <MotionReveal>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-100 p-xl">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    Core capability
                  </p>
                  <h3 className="mt-sm text-xl font-bold tracking-tight text-neutral-900">
                    {lead.title}
                  </h3>
                  <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                    {lead.description}
                  </p>
                </MotionCard>
              </MotionReveal>
            ) : null}

            <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2">
              {rest.map((item) => (
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
        </div>
      </MotionSection>

      {/* Project story — one real job told end to end: problem, changes, outcome */}
      {data.story ? (
        <MotionSection className="border-b border-neutral-200 py-2xl">
          <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
            <MotionStagger className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <MotionStaggerItem>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                  {data.story.eyebrow}
                </p>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <h2 className="mt-sm text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                  {data.story.title}
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-md max-w-prose text-pretty text-sm leading-relaxed text-neutral-600">
                  {data.story.intro}
                </p>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <dl className="mt-lg grid grid-cols-2 gap-md">
                  {data.story.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-lg border border-neutral-200 bg-neutral-50 p-md"
                    >
                      <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                        {fact.label}
                      </dt>
                      <dd className="mt-xs text-sm font-bold text-neutral-900">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </MotionStaggerItem>
            </MotionStagger>

            <div className="space-y-lg lg:col-span-7">
              <MotionReveal>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-100 p-xl">
                  <h3 className="text-base font-bold text-neutral-900">The problem</h3>
                  <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">
                    {data.story.problem}
                  </p>
                </MotionCard>
              </MotionReveal>
              <MotionReveal>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-xl">
                  <h3 className="text-base font-bold text-neutral-900">What we changed</h3>
                  <ol className="mt-md space-y-md">
                    {data.story.changes.map((change, index) => (
                      <li
                        key={change}
                        className="flex gap-md text-sm leading-relaxed text-neutral-600"
                      >
                        <span className="font-mono text-xs font-black text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ol>
                </MotionCard>
              </MotionReveal>
              <MotionReveal>
                <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-xl">
                  <h3 className="text-base font-bold text-neutral-900">Where it stands</h3>
                  <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">
                    {data.story.outcome}
                  </p>
                  <Link
                    href={data.story.href}
                    className="mt-md inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
                  >
                    {data.story.linkLabel}
                    <ArrowUpRight size={14} aria-hidden />
                  </Link>
                </MotionCard>
              </MotionReveal>
            </div>
          </div>
        </MotionSection>
      ) : null}

      {/* Process — numbered sequence (order carries meaning) */}
      <MotionSection className="border-b border-neutral-200 bg-neutral-100 py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl max-w-3xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                {data.processTitle}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">
                {data.processIntro}
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md md:grid-cols-3">
            {data.process.map((step, index) => (
              <MotionStaggerItem key={step.title}>
                <MotionCard className="h-full rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {processPhaseLabel(step, index, data.process.length)}
                  </p>
                  <h3 className="mt-sm text-lg font-bold text-neutral-900">{step.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </MotionCard>
              </MotionStaggerItem>
            ))}
          </MotionStagger>

          {data.engagement ? (
            <MotionReveal className="mt-xl rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900">{data.engagement.title}</h3>
              <dl className="mt-md grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
                {data.engagement.items.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {item.label}
                    </dt>
                    <dd className="mt-xs text-sm leading-relaxed text-neutral-700">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </MotionReveal>
          ) : null}
        </div>
      </MotionSection>

      {/* Tech — continuous strip on paper */}
      <MotionSection className="border-b border-neutral-200 py-2xl">
        <div className="site-container">
          <div className="flex flex-col gap-xl lg:flex-row lg:items-end lg:justify-between">
            <MotionStagger className="">
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  {data.techTitle ?? 'Tech we ship with'}
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                  {data.techIntro ??
                    'Stack choices follow your ownership model — tools we use most in this lane.'}
                </p>
              </MotionStaggerItem>
            </MotionStagger>

            <MotionStagger className="flex flex-wrap gap-sm">
              {data.tech.map((slug) => (
                <MotionStaggerItem key={slug}>
                  <span className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm shadow-sm">
                    <BrandIcon
                      slug={slug}
                      size={18}
                      variant="tech"
                      fallbackSlug={CAPABILITY_ICONS[data.slug]}
                    />
                    <span className="text-xs font-semibold text-neutral-800">
                      {formatTechLabel(slug)}
                    </span>
                  </span>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </div>
        </div>
      </MotionSection>

      {/* Benefits — optional outcomes grid */}
      {data.benefits && data.benefits.length > 0 ? (
        <MotionSection className="border-b border-neutral-200 py-2xl">
          <div className="site-container">
            <MotionStagger className="mb-xl max-w-3xl">
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                  {data.benefitsTitle}
                </h2>
              </MotionStaggerItem>
              {data.benefitsIntro ? (
                <MotionStaggerItem>
                  <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">
                    {data.benefitsIntro}
                  </p>
                </MotionStaggerItem>
              ) : null}
            </MotionStagger>

            <MotionStagger className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((item) => (
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
      ) : null}

      {/* Projects — light instrumentation (no full black field) */}
      <MotionSection className="border-b border-neutral-200 bg-linear-to-b from-neutral-50 to-neutral-100 py-2xl">
        <div className="site-container">
          <MotionStagger className="mb-xl flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                  {data.projectsTitle ?? 'Related projects'}
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                  {data.projectsIntro ??
                    'Systems we shipped in this lane — open a case study for depth.'}
                </p>
              </MotionStaggerItem>
            </div>
            <MotionStaggerItem>
              <Link
                href="/our-work/case-studies"
                className="inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
              >
                {data.projectsCtaLabel ?? 'All case studies'}
                <ArrowUpRight size={14} />
              </Link>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionStagger className="grid grid-cols-1 gap-md md:grid-cols-3">
            {data.projects.map((project) => (
              <MotionStaggerItem key={project.slug}>
                <Link href={project.href} className="group block h-full">
                  <MotionCard className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg transition-colors group-hover:border-primary/35">
                    <div className="flex items-baseline justify-between gap-sm">
                      <p className="font-mono text-2xl font-black text-primary">{project.metric}</p>
                      <ArrowUpRight
                        size={16}
                        className="text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      />
                    </div>
                    <p className="mt-xs font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {project.metricLabel}
                    </p>
                    <h3 className="mt-lg text-lg font-bold text-neutral-900 group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-xs text-sm text-neutral-600">{project.subtitle}</p>
                  </MotionCard>
                </Link>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {data.showTestimonials ? <TestimonialsSection /> : null}

      <RelatedServices
        title="Related services"
        intro="Projects like this one usually involve these as well."
        services={RELATED_CAPABILITIES[data.slug]}
        reading={data.reading}
      />

      {hirePages.length > 0 ? (
        <MotionSection className="border-b border-neutral-200 py-2xl">
          <div className="site-container">
            <MotionStagger className="mb-lg max-w-3xl">
              <MotionStaggerItem>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                  Prefer to add engineers to your own team?
                </h2>
              </MotionStaggerItem>
              <MotionStaggerItem>
                <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                  Hire full-time developers in the stacks we use for this work.
                </p>
              </MotionStaggerItem>
            </MotionStagger>
            <ul className="flex flex-wrap gap-sm">
              {hirePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/work-with-us/hire/${page.slug}`}
                    className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <BrandIcon slug={page.iconSlug} size={16} variant="tech" />
                    Hire {page.linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>
      ) : null}

      <MotionSection className="py-2xl">
        <div className="site-container max-w-3xl">
          <MotionStagger className="mb-xl">
            <MotionStaggerItem>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                {data.faqsTitle ?? 'Frequently asked questions'}
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                {data.faqsIntro ??
                  'Straight answers for partners and client buyers scoping this capability.'}
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <FaqAccordion items={data.faqs} />
        </div>
      </MotionSection>

      <PageClosingCta {...data.cta} />
    </div>
  );
}
