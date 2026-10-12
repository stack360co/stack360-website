/**
 * Project timeline estimator: every number comes from the portfolio durations and the
 * published case studies. Nothing here is a formula or a quote.
 */

import { CASE_STUDIES_DETAILS } from '@/constants/component/our-work-case-studies-data';
import { PORTFOLIO_GROUPS } from '@/constants/component/our-work-portfolio-data';

export const TIMELINES_HERO = {
  eyebrow: 'Our Work · Project Timelines',
  title: 'How long will',
  highlight: 'your project take?',
  description:
    'Pick the kind of software you need and see how long similar projects of ours took. The ranges come from 28 projects we delivered, not from a formula.',
} as const;

/** Portfolio group → the label a buyer would recognise. */
const TYPE_LABELS: Record<string, string> = {
  ecommerce: 'Online store or ecommerce',
  marketplace: 'Marketplace',
  saas: 'SaaS product',
  crm: 'CRM or internal system',
  compliance: 'Compliance or GDPR tool',
  healthcare: 'Healthcare platform',
  ai: 'AI product',
  seo: 'SEO or analytics tool',
  logistics: 'Logistics platform',
};

export const INTEGRATION_OPTIONS = [
  { id: 'payments', label: 'Payments' },
  { id: 'marketplaces', label: 'Amazon, eBay or other marketplaces' },
  { id: 'shipping', label: 'Shipping or delivery' },
  { id: 'business', label: 'CRM, accounting or email tools' },
  { id: 'ai', label: 'An AI model or live data feed' },
] as const;

export interface TimelineProject {
  name: string;
  months: number;
  href: string;
  team?: number;
}

export interface TimelineType {
  id: string;
  label: string;
  projects: TimelineProject[];
  min: number;
  max: number;
  median: number;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Built on the server and passed to the estimator, so the page ships only these numbers. */
export function getTimelineTypes(): TimelineType[] {
  const studies = new Map(CASE_STUDIES_DETAILS.map((study) => [study.slug, study]));
  return PORTFOLIO_GROUPS.filter((group) => TYPE_LABELS[group.id])
    .map((group) => {
      const projects = group.projects
        .map((project) => {
          const months = Number.parseInt(project.duration, 10);
          const study = studies.get(project.slug);
          return {
            name: project.name.split(' — ')[0],
            months,
            href: study
              ? `/our-work/case-studies/${study.slug}`
              : `/our-work/featured-projects#${project.slug}`,
            ...(study ? { team: Number.parseInt(study.members, 10) } : {}),
          };
        })
        .filter((project) => Number.isFinite(project.months))
        .sort((a, b) => a.months - b.months);
      const months = projects.map((project) => project.months);
      return {
        id: group.id,
        label: TYPE_LABELS[group.id],
        projects,
        min: Math.min(...months),
        max: Math.max(...months),
        median: median(months),
      };
    })
    .sort((a, b) => b.projects.length - a.projects.length);
}

export function getAllProjectMonths(): number[] {
  return getTimelineTypes().flatMap((type) => type.projects.map((project) => project.months));
}

export const TIMELINES_FAQS = [
  {
    id: 'how-long',
    question: 'How long does it take to build custom software?',
    answer:
      'Most of our projects take three to six months to build. Simple ones, such as a sales automation setup or a Xamarin to .NET MAUI migration, take one to three.',
  },
  {
    id: 'why-long',
    question: 'Why do some projects in the list run for years?',
    answer:
      'The durations include work after launch. Our three longest projects each had a first version live within three to six months, then kept adding features.',
  },
  {
    id: 'what-adds-time',
    question: 'What makes a project take longer?',
    answer:
      'Scope changes, integrations that behave differently than expected, waiting on feedback or access, and requirements that only become clear once building starts.',
  },
  {
    id: 'exact',
    question: 'Can you give us an exact timeline?',
    answer:
      'Yes, after a discovery call. A founder and a senior engineer join the call, and you get a recommended team, a timeline and a plan with milestones within two business days.',
  },
] as const;
