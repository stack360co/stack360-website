import { Globe2, Layers, ShieldAlert, Terminal, Workflow } from 'lucide-react';

export const MOCK_WEDGES = [
  {
    number: '01',
    tagline: 'AI-FIRST BY DESIGN',
    title: 'AI That Creates Real Business Value',
    description:
      'We build AI-powered products and integrate intelligent capabilities that automate processes, improve experiences, and support better decisions.',
    icon: <Terminal />,
    points: [
      { primary: 'Smarter Products', secondary: 'AI built into product experiences' },
      { primary: 'Faster Operations', secondary: 'Intelligent process automation' },
      { primary: 'Better Decisions', secondary: 'Data-driven business intelligence' },
    ],
  },
  {
    number: '02',
    tagline: 'BUILT. NOT JUST BILLED.',
    title: 'We Build Products We Believe In',
    description:
      'We have hands-on experience building digital products, giving us practical insight into usability, scalability, performance, and growth.',
    icon: <Layers />,
    points: [
      { primary: 'Product Thinking', secondary: 'Strategy beyond technical execution' },
      { primary: 'Real Experience', secondary: 'Built from practical expertise' },
      { primary: 'Business Focus', secondary: 'Technology aligned with outcomes' },
    ],
  },
  {
    number: '03',
    tagline: 'ENTERPRISE-GRADE ENGINEERING',
    title: 'Built For Complex Business Needs',
    description:
      'We engineer secure, reliable software for businesses that demand performance, scalability, compliance, and long-term stability.',
    icon: <ShieldAlert />,
    points: [
      { primary: 'High Performance', secondary: 'Engineered for demanding workloads' },
      { primary: 'Enterprise Security', secondary: 'Protection built into every layer' },
      { primary: 'Future Ready', secondary: 'Architecture designed for growth' },
    ],
  },
  {
    number: '04',
    tagline: 'END-TO-END EXPERTISE',
    title: 'From Idea To Product Growth',
    description:
      'We cover strategy, UX, development, cloud, AI, deployment, and optimization throughout your product lifecycle.',
    icon: <Workflow />,
    points: [
      { primary: 'Product Strategy', secondary: 'From concept to clear roadmap' },
      { primary: 'Full-Stack Development', secondary: 'Frontend, backend, cloud, and AI' },
      { primary: 'Continuous Support', secondary: 'Optimization beyond product launch' },
    ],
  },
  {
    number: '05',
    tagline: 'GLOBAL ENGINEERING PARTNER',
    title: 'Expertise That Works Across Borders',
    description:
      'Our experienced teams collaborate with businesses worldwide, providing reliable product development and engineering support across time zones.',
    icon: <Globe2 />,
    points: [
      { primary: 'Global Collaboration', secondary: 'Seamless communication across locations' },
      { primary: 'Dedicated Expertise', secondary: 'Specialists aligned with your needs' },
      { primary: 'Flexible Engagements', secondary: 'Teams that adapt as you grow' },
    ],
  },
];
