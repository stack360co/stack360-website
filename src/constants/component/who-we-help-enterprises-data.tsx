import { Cloud, Headphones, Lock, Network, Users } from 'lucide-react';

export const ENTERPRISES_HERO = {
  eyebrow: 'Who We Help',
  title: 'Enterprise-grade security,',
  highlight: 'startup agility.',
  description:
    'Dedicated engineering teams for organizations that can’t afford downtime: compliant architecture, legacy integration and fast delivery without enterprise bureaucracy.',
} as const;

export const ENTERPRISES_DIFFERENTIATORS = [
  {
    title: 'Security practices for enterprise reviews',
    description:
      'Access controls, audit logging, secure SDLC, and documentation built for enterprise security reviews from sprint one.',
    icon: <Lock className="h-5 w-5" />,
  },
  {
    title: 'Scalable cloud architecture',
    description:
      'Multi-region deployments, auto-scaling, and cost governance on AWS, Azure, and GCP — designed for peak load, not best-case demos.',
    icon: <Cloud className="h-5 w-5" />,
  },
  {
    title: 'Dedicated delivery teams',
    description:
      'Named pods with continuity — engineers who learn your domain, not a rotating bench of strangers.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Legacy integration',
    description:
      'API layers, event buses, and phased migrations that connect ERP, CRM, and mainframe systems without breaking production.',
    icon: <Network className="h-5 w-5" />,
  },
  {
    title: 'Production support',
    description:
      'Maintenance and support after launch, with engineers who overlap at least 4 hours with a US working day.',
    icon: <Headphones className="h-5 w-5" />,
  },
] as const;

export const ENTERPRISES_TRUST = {
  cloudPartners: ['AWS', 'Azure', 'GCP'],
  clients: ['AutoBuffy', 'Cercle', 'Klingit', 'Coach Catalyst', 'Truck-4', 'BuffyHub'],
  sla: {
    title: 'Long-term partnerships',
    description:
      'Engagements that stay with a product for years. ATC and Coach Catalyst each ran for 30 months, including maintenance and support after launch.',
  },
} as const;

export const ENTERPRISES_CTA = {
  title: 'Need an enterprise delivery partner?',
  description:
    'Bring us your compliance requirements, integration map and uptime goals. We will propose a dedicated team and a delivery plan your procurement team can approve.',
  primary: { label: 'Talk to us', href: '/contact' },
  secondary: { label: 'Partner with us', href: '/work-with-us/software-partner' },
} as const;
