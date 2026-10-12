import { Globe2, Laptop, TrendingUp, Users } from 'lucide-react';

export const CAREERS_HERO = {
  eyebrow: 'Work With Us',
  title: 'Looking for a career',
  highlight: 'building systems that ship.',
  description:
    'Join a studio where clean execution, strong git history, and production-grade craft are the baseline — not the pitch deck.',
} as const;

export const CAREERS_INTERNSHIPS = {
  title: 'Internships in Lahore',
  description:
    'We take interns at our Lahore studio. Interns work on real client projects, and senior engineers mentor them through code review and architecture sessions. Internship openings are listed with the roles above when we are hiring.',
} as const;

export const CAREERS_BENEFITS = [
  {
    title: 'Global delivery culture',
    description:
      'Collaborate across Lahore and UK offices with modern tooling and async discipline.',
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    title: 'Real product exposure',
    description: 'Work on ERP, SaaS, FinTech, and health platforms used by thousands of users.',
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: 'Growth by craft',
    description:
      'Senior engineers mentor through code review, architecture sessions, and shipped work.',
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: 'Small teams, big ownership',
    description: 'Fewer layers, clearer accountability, and room to influence technical direction.',
    icon: <Users className="h-5 w-5" />,
  },
] as const;

export const CAREERS_PROCESS = [
  {
    step: '01',
    title: 'Apply',
    description: 'Share your portfolio, GitHub, or a project you are proud of.',
  },
  {
    step: '02',
    title: 'Technical conversation',
    description: 'A practical discussion focused on how you think, ship, and collaborate.',
  },
  {
    step: '03',
    title: 'Team fit & offer',
    description: 'Meet your lead, align on scope, and join a pod with a clear ramp plan.',
  },
] as const;

export const CAREERS_CTA = {
  title: 'Do not see your role listed?',
  description:
    'Send us your profile anyway. We are always meeting strong engineers for upcoming pods.',
  primary: { label: 'Get in touch', href: '/contact' },
} as const;
