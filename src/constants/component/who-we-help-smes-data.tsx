import { Cog, Layers, RefreshCw, Workflow } from 'lucide-react';

export const SMES_HERO = {
  eyebrow: 'Who We Help',
  title: 'Scale your business',
  highlight: 'without disruption.',
  description:
    'Tailored technology for mid-market operators — modernize legacy systems, automate manual workflows, and unlock ROI without pausing the business that pays the bills.',
} as const;

export const SMES_OFFERS = [
  {
    title: 'Digital transformation',
    description:
      'Unify spreadsheets, siloed tools, and manual handoffs into one operational platform your team actually adopts.',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    title: 'Legacy modernization',
    description:
      'Strangler-fig migrations and phased cutovers — replace aging systems without a risky big-bang switch.',
    icon: <RefreshCw className="h-5 w-5" />,
  },
  {
    title: 'Process automation',
    description:
      'Workflow engines, integrations, and reporting that eliminate repetitive work and reduce error rates.',
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: 'Custom software',
    description:
      'Bespoke portals, internal tools, and customer-facing apps sized for SME teams and timelines.',
    icon: <Cog className="h-5 w-5" />,
  },
] as const;

export const SMES_ROI = {
  title: 'ROI you can measure',
  description:
    'We scope around business outcomes — hours saved, error reduction, revenue per employee — not feature checklists. Every engagement starts with baseline metrics and a clear payback window.',
  outcomes: [
    'Operational efficiency gains within the first quarter',
    'Reduced dependency on manual spreadsheets and email chains',
    'Faster reporting cycles for leadership decisions',
  ],
} as const;

export const SMES_ENGAGEMENT = [
  {
    model: 'Fixed scope',
    detail:
      'Defined deliverables, clear milestones, and a delivery plan agreed before work starts.',
  },
  {
    model: 'Dedicated team',
    detail:
      'Engineers who join your team full time for evolving roadmaps and continuous improvement.',
  },
  {
    model: 'Hybrid',
    detail:
      'A fixed-scope MVP, then a dedicated team to grow it. A common path for SMEs testing a new digital channel.',
  },
] as const;

export const SMES_TRUST = [
  {
    title: 'Easy transition',
    description:
      'Phased rollouts, training, and parallel-run periods so teams adopt at their pace.',
  },
  {
    title: 'Dedicated support',
    description: 'Named technical lead and responsive support channel — not a ticket black hole.',
  },
  {
    title: 'Proven SME outcomes',
    description:
      'Case studies across retail, services, and light manufacturing with measurable ROI.',
  },
] as const;

export const SMES_CTA = {
  title: 'Modernize without stopping the business',
  description:
    'Share your current systems and growth targets. We will map a transformation path with minimal disruption and clear ROI milestones.',
  primary: { label: 'Get a consultation', href: '/contact' },
  secondary: { label: 'View case studies', href: '/our-work/case-studies' },
} as const;
