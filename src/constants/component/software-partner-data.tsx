import { Clock, Headphones, ShieldCheck, Users } from 'lucide-react';

export const SOFTWARE_PARTNER_HERO = {
  eyebrow: 'Work With Us',
  title: 'Looking for a software partner',
  highlight: 'you can trust under pressure.',
  description:
    "Poor development leads to missed deadlines and frustration. Stack360's expert team delivers scalable, high-performance solutions — on time, every time.",
} as const;

export const SOFTWARE_PARTNER_STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '100%', label: 'Success Rate' },
  { value: '48h', label: 'Typical Kickoff' },
] as const;

export const SOFTWARE_PARTNER_BENEFITS = [
  {
    title: '4+ Hours of US Overlap',
    description: 'Our engineers in Lahore overlap at least 4 hours with a US working day.',
    icon: <Headphones className="h-5 w-5" />,
  },
  {
    title: 'No Long-term Contracts',
    description: 'Start with a scoped engagement and scale only when the fit is proven.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: 'Start in 48 Hours',
    description: 'Pre-vetted engineers matched to your stack and sprint rhythm fast.',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: 'Dedicated Pods',
    description: 'Embedded teams that work as an extension of your product org.',
    icon: <Users className="h-5 w-5" />,
  },
] as const;

export const SOFTWARE_PARTNER_PROCESS = [
  {
    step: '01',
    title: 'Discovery call',
    description: 'We map goals, constraints, and the technical surface area in one session.',
  },
  {
    step: '02',
    title: 'Team & scope',
    description:
      'You receive a pod recommendation, timeline, and delivery plan with clear milestones.',
  },
  {
    step: '03',
    title: 'Build & ship',
    description: 'Engineers embed in your workflow with weekly demos and measurable outcomes.',
  },
] as const;

export const SOFTWARE_PARTNER_SERVICES = [
  'Web & mobile product development',
  'Staff augmentation & dedicated pods',
  'Cloud, DevOps & platform engineering',
  'QA, automation & release hardening',
] as const;

export const SOFTWARE_PARTNER_CTA = {
  title: 'Ready to bring your big ideas to life?',
  description:
    'Partner with us to grow your business with confidence. We will match you with the right pod and a delivery plan you can defend internally.',
  primary: { label: 'Contact us', href: '/contact' },
  secondary: { label: 'View case studies', href: '/our-work/case-studies' },
} as const;
