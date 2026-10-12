import { Code2, Gauge, Rocket, Wallet } from 'lucide-react';

export const STARTUPS_HERO = {
  eyebrow: 'Who We Help',
  title: 'From zero to unicorn —',
  highlight: 'build MVPs investors love.',
  description:
    'Ship a credible product fast without cutting corners on architecture. We help founders prove traction, pass technical diligence, and scale past seed without a rewrite.',
} as const;

export const STARTUPS_HIGHLIGHTS = [
  {
    title: 'An MVP in one to three months',
    description:
      'Focused discovery, lean scope and sprint delivery. Most MVPs take one to three months, and Cinekit’s took one.',
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: 'Built to scale past seed',
    description:
      'Modular services, clean APIs, and observability from day one — so growth does not force a costly rebuild.',
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: 'Capital-efficient delivery',
    description:
      'Transparent milestones, fixed-scope sprints, and no surprise burn — you know what each dollar ships.',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: 'Investor-ready codebase',
    description:
      'Documented architecture, test coverage on critical paths, and deploy pipelines that survive technical diligence.',
    icon: <Code2 className="h-5 w-5" />,
  },
] as const;

export const STARTUPS_METRICS = [
  { value: '50+', label: 'Startups funded after MVP delivery' },
  { value: '1-3 mo', label: 'Typical MVP timeline' },
  { value: '30 mo', label: 'Our longest client engagements' },
] as const;

export const STARTUPS_PARTNERSHIPS = {
  title: 'Accelerator-ready delivery',
  description:
    'We work with founders coming out of accelerators and venture studios — matching their cadence, demo deadlines, and investor update rhythms.',
  partners: [
    'Demo-day sprint packages',
    'Technical diligence prep',
    'Post-raise scale pods',
    'Co-founder technical advisory',
  ],
} as const;

export const STARTUPS_TRUST = [
  {
    title: 'Clear scope',
    description:
      'Fixed-scope sprints with agreed deliverables, and any change to the plan is agreed in writing first.',
  },
  {
    title: 'Agile delivery',
    description: 'Weekly demos, shared backlog, and async updates built for founder schedules.',
  },
  {
    title: 'Post-launch support',
    description: 'Production monitoring, bug fixes and a path to a dedicated team as you grow.',
  },
] as const;

export const STARTUPS_CTA = {
  title: 'Ready to ship your MVP?',
  description:
    'Tell us your timeline, traction goals, and technical constraints. We will propose a delivery plan you can take straight to investors.',
  primary: { label: 'Start a project', href: '/contact' },
  secondary: { label: 'Software partner model', href: '/work-with-us/software-partner' },
} as const;
