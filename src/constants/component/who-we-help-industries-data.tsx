import {
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  Radio,
  ShoppingCart,
  Truck,
} from 'lucide-react';

export const INDUSTRIES_HERO = {
  eyebrow: 'Who We Help',
  title: 'Future-proofing',
  highlight: 'every industry.',
  description:
    'Domain expertise across regulated and high-velocity sectors — we architect systems that meet compliance requirements today and scale with your market tomorrow.',
} as const;

export const INDUSTRIES = [
  {
    name: 'Healthcare',
    icon: <HeartPulse className="h-5 w-5" />,
    painPoints: [
      'Fragmented EMR and patient data silos',
      'HIPAA audit exposure across vendors',
      'Slow intake and manual clinical workflows',
    ],
    solution:
      'HIPAA-aligned platforms with unified clinical data, role-based access, and automated compliance audit trails.',
    result: 'Our project: Nuvana · chronic-care billing for clinics',
  },
  {
    name: 'FinTech',
    icon: <Landmark className="h-5 w-5" />,
    painPoints: [
      'Fraud exposure on legacy payment rails',
      'PCI-DSS scope creep across integrations',
      'Slow time-to-market for new financial products',
    ],
    solution:
      'PCI-DSS ready architecture with real-time fraud signals, tokenized payments, and modular banking APIs.',
    result: 'Our project: CashKart · verified-agent cash-outs',
  },
  {
    name: 'E-commerce',
    icon: <ShoppingCart className="h-5 w-5" />,
    painPoints: [
      'Cart abandonment and checkout friction',
      'Inventory drift across channels',
      'Peak-season performance bottlenecks',
    ],
    solution:
      'Scalable storefronts with real-time inventory sync, conversion-optimized checkout, and elastic cloud infrastructure.',
    result: 'Our project: AutoBuffy · +50% sales via buy now, pay later',
  },
  {
    name: 'Logistics',
    icon: <Truck className="h-5 w-5" />,
    painPoints: [
      'Blind spots in fleet and warehouse ops',
      'Manual dispatch and routing decisions',
      'SLA misses eroding client trust',
    ],
    solution:
      'Route optimization engines, live tracking dashboards, and ERP-integrated dispatch automation.',
    result: 'Our project: Truck-4 · fleet rentals that absorb traffic spikes',
  },
  {
    name: 'Education',
    icon: <GraduationCap className="h-5 w-5" />,
    painPoints: [
      'Fragmented LMS and content systems',
      'Low learner engagement and completion',
      'Manual grading and reporting overhead',
    ],
    solution:
      'Unified learning platforms with progress analytics, automated assessment pipelines, and parent/admin portals.',
    result: 'Our project: Fisar · GDPR requests for schools',
  },
  {
    name: 'Manufacturing',
    icon: <Factory className="h-5 w-5" />,
    painPoints: [
      'Disconnected shop-floor data',
      'Unplanned downtime and maintenance gaps',
      'Quality escapes reaching customers',
    ],
    solution:
      'IoT-integrated MES with predictive maintenance alerts, production traceability, and quality dashboards.',
    result: 'Our project: Cad Cam Masters · dental labs matched with CAD designers',
  },
  {
    name: 'Travel & Tourism',
    icon: <Plane className="h-5 w-5" />,
    painPoints: [
      'Booking tools that refuse valid trips',
      'Sales that staff hear about too late',
      'Too few reviews on Google Maps',
    ],
    solution:
      'Booking platforms with online payments, a staff CMS, instant sale alerts and automated review requests.',
    result: 'Our project: Luxe Excursions · booking refusals from 75% to 0%',
  },
  {
    name: 'Media',
    icon: <Radio className="h-5 w-5" />,
    painPoints: [
      'Rights and licensing fragmentation',
      'Slow content delivery at scale',
      'Volatile ad yield and monetization gaps',
    ],
    solution:
      'Rights-aware CMS with CDN-backed delivery, audience segmentation, and programmatic monetization layers.',
    result: 'Our project: Aiode · AI-assisted music creation',
  },
] as const;

export const INDUSTRIES_TRUST = {
  title: 'Compliance and certifications you can defend',
  description:
    'We build for auditors, not slide decks. Our delivery teams align architecture, access controls, and documentation with the standards your industry demands.',
  certifications: ['HIPAA aligned', 'PCI-DSS ready'],
  caseStudyLink: {
    label: 'View industry case studies',
    href: '/our-work/case-studies',
  },
} as const;

export const INDUSTRIES_CTA = {
  title: 'Need software built for your sector?',
  description:
    'Partner with a studio that understands your compliance landscape, operational constraints, and growth targets — with transparent delivery from day one.',
  primary: { label: 'Talk to us', href: '/contact' },
  secondary: { label: 'Explore case studies', href: '/our-work/case-studies' },
} as const;
