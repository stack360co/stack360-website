/**
 * Hero headline and intro. The hero renders in the browser only, so its server-rendered fallback
 * repeats this copy to give crawlers and first paint a real H1.
 */
export const LANDING_HERO = {
  lead: 'Building Products that',
  phrases: [
    'Scale Seamlessly.',
    'Drive Outcomes.',
    'Perform Under Load.',
    'Solves Problems',
    'Creates Value.',
    'Win Markets.',
  ],
  intro:
    'We build scalable digital products that solve complex business challenges, accelerate growth, improve efficiency, and create lasting value.',
} as const;

export const LANDING_STATS = [
  { value: '200+', label: 'Projects delivered' },
  { value: '200+', label: 'Active clients' },
  { value: '10+', label: 'Years building' },
  { value: '98%', label: 'Client satisfaction' },
] as const;

export const LANDING_SERVICES = [
  {
    category: 'Artificial Intelligence & ML',
    items: [
      {
        title: 'AI Solutions',
        description:
          'Develop AI solutions that automate processes, enhance UX, improve decisions, & drive growth.',
        icon: 'ai',
        href: '/what-we-build/ai-solutions',
        skills: [
          { name: 'TensorFlow', slug: 'tensorflow' },
          { name: 'PyTorch', slug: 'pytorch' },
          { name: 'Keras', slug: 'keras' },
          { name: 'OpenCV', slug: 'opencv' },
        ],
      },
      {
        title: 'Model Training & Tuning',
        description:
          'Train and fine-tune AI models using specialised data, algorithms, and performance optimisation techniques.',
        icon: 'training',
        href: '/what-we-build/ai-solutions',
        skills: [
          { name: 'Jupyter', slug: 'jupyter' },
          { name: 'NumPy', slug: 'numpy' },
          { name: 'Pandas', slug: 'pandas' },
          { name: 'scikit-learn', slug: 'scikitlearn' },
          { name: 'Hugging Face', slug: 'huggingface' },
          { name: 'AMD', slug: 'amd' },
        ],
      },
      {
        title: 'AI Integration',
        description:
          'Integrate AI technologies into existing software products, applications, workflows, and business systems seamlessly.',
        icon: 'integration',
        href: '/what-we-build/ai-solutions',
        skills: [
          { name: 'FastAPI', slug: 'fastapi' },
          { name: 'OpenAI', slug: 'openai' },
          { name: 'LangChain', slug: 'langchain' },
          { name: 'ReAct (Reasoning and Acting)', slug: 'langgraph' },
          { name: 'Ollama', slug: 'ollama' },
          { name: 'Pydantic AI', slug: 'pydantic' },
        ],
      },
      {
        title: 'MLOps & Pipelines',
        description:
          'Build scalable MLOps pipelines for machine learning deployment, monitoring, automation, management, and optimisation.',
        icon: 'mlops',
        href: '/what-we-build/ai-solutions',
        skills: [
          { name: 'DVC', slug: 'dvc' },
          { name: 'Docker', slug: 'docker' },
          { name: 'Kubernetes', slug: 'kubernetes' },
          { name: 'Python', slug: 'python' },
        ],
      },
      {
        title: 'Generative AI & LLMs',
        description:
          'Build custom LLM agents, retrieval-augmented generation (RAG) systems, and domain-specific generative interfaces.',
        icon: 'ai',
        href: '/what-we-build/ai-solutions',
        skills: [
          { name: 'LangChain', slug: 'langchain' },
          { name: 'LlamaIndex', slug: 'llamaindex' },
          { name: 'Pinecone', slug: 'pinecone' },
          { name: 'Python', slug: 'python' },
        ],
      },
      {
        title: 'Data Engineering',
        description:
          'Build automated data pipelines, warehouses, and ETL flows to power analytics and enterprise intelligence.',
        icon: 'mlops',
        href: '/what-we-build/ai-solutions',
        skills: [
          { name: 'Apache Spark', slug: 'apachespark' },
          { name: 'Snowflake', slug: 'snowflake' },
          { name: 'PostgreSQL', slug: 'postgresql' },
          { name: 'Python', slug: 'python' },
        ],
      },
    ],
  },
  {
    category: 'Platform & Infrastructure',
    items: [
      {
        title: 'Cloud',
        description:
          'Implement scalable cloud solutions for secure infrastructure, improved performance, flexibility, and business continuity.',
        icon: 'cloud',
        href: '/what-we-build/cloud',
        skills: [
          { name: 'Amazon Web Services (AWS)', slug: 'amazonaws' },
          { name: 'Google Cloud', slug: 'googlecloud' },
          { name: 'Microsoft Azure', slug: 'microsoftazure' },
          { name: 'DigitalOcean', slug: 'digitalocean' },
          { name: 'Cloudflare', slug: 'cloudflare' },
          { name: 'AWS Lambda', slug: 'awslambda' },
        ],
      },
      {
        title: 'DevOps',
        description:
          'Implement DevOps solutions to accelerate software development, deployment, automation, reliability, and continuous delivery.',
        icon: 'devops',
        href: '/what-we-build/devops',
        skills: [
          { name: 'Kubernetes', slug: 'kubernetes' },
          { name: 'Jenkins', slug: 'jenkins' },
          { name: 'CircleCI', slug: 'circleci' },
          { name: 'GitLab', slug: 'gitlab' },
          { name: 'Selenium', slug: 'selenium' },
          { name: 'Nginx', slug: 'nginx' },
          { name: 'Vercel', slug: 'vercel' },
          { name: 'Netlify', slug: 'netlify' },
        ],
      },
      {
        title: 'Automation',
        description:
          'Develop business process automation solutions that reduce manual work, improve accuracy, productivity, and efficiency.',
        icon: 'automation',
        href: '/what-we-build/automation',
        skills: [
          { name: 'Python', slug: 'python' },
          { name: 'Node.js', slug: 'nodedotjs' },
          { name: 'Zapier', slug: 'zapier' },
          { name: 'n8n', slug: 'n8n' },
        ],
      },
      {
        title: 'Mobile Apps',
        description:
          'Build high-performance mobile applications for iOS and Android with seamless user experiences and functionality.',
        icon: 'mobile',
        href: '/what-we-build/mobile-apps',
        skills: [
          { name: 'Swift', slug: 'swift' },
          { name: 'Android', slug: 'android' },
          { name: 'Flutter', slug: 'flutter' },
          { name: 'React Native', slug: 'reactnative' },
        ],
      },
      {
        title: 'Web Apps',
        description:
          'Develop scalable web applications delivering secure, responsive, and seamless experiences across multiple devices.',
        icon: 'web',
        href: '/what-we-build/web-apps',
        skills: [
          { name: 'React', slug: 'react' },
          { name: 'Vue.js', slug: 'vuedotjs' },
          { name: 'Angular', slug: 'angular' },
          { name: 'Next.js', slug: 'nextdotjs' },
        ],
      },
      {
        title: 'Staff Augmentation',
        description:
          'Strengthen development teams with skilled software engineers, developers, and technical specialists on demand.',
        icon: 'staff',
        href: '/work-with-us/software-partner',
        skills: [
          { name: 'React', slug: 'react' },
          { name: 'Node.js', slug: 'nodedotjs' },
          { name: 'Python', slug: 'python' },
          { name: 'Flutter', slug: 'flutter' },
        ],
      },
    ],
  },
  {
    category: 'Core Ecosystems',
    items: [
      {
        title: 'ERP',
        description:
          'Implement scalable ERP solutions to streamline operations, workflows, resource planning, and business management.',
        icon: 'erp',
        href: '/what-we-build/erp',
        skills: [
          { name: 'Ruby on Rails', slug: 'rubyonrails' },
          { name: '.NET', slug: 'dotnet' },
          { name: 'PostgreSQL', slug: 'postgresql' },
          { name: 'MySQL', slug: 'mysql' },
        ],
      },
      {
        title: 'CRM',
        description:
          'Develop powerful CRM solutions to manage customer relationships, sales pipelines, data, and business growth.',
        icon: 'crm',
        href: '/what-we-build/crm',
        skills: [
          { name: 'React', slug: 'react' },
          { name: 'Node.js', slug: 'nodedotjs' },
          { name: 'Salesforce', slug: 'salesforce' },
          { name: 'MongoDB', slug: 'mongodb' },
        ],
      },
      {
        title: 'SaaS',
        description:
          'Build scalable SaaS products with flexible architecture, seamless experiences, and reliable cloud infrastructure.',
        icon: 'saas',
        href: '/what-we-build/saas',
        skills: [
          { name: 'Next.js', slug: 'nextdotjs' },
          { name: 'GraphQL', slug: 'graphql' },
          { name: 'Heroku', slug: 'heroku' },
          { name: 'Docker', slug: 'docker' },
        ],
      },
      {
        title: 'Custom Software',
        description:
          'Develop custom software solutions tailored to unique business processes, challenges, workflows, and requirements.',
        icon: 'custom',
        href: '/what-we-build/custom-software',
        skills: [
          { name: 'Python', slug: 'python' },
          { name: 'Laravel', slug: 'laravel' },
          { name: 'Java', slug: 'openjdk' },
          { name: 'Ruby on Rails', slug: 'rubyonrails' },
        ],
      },
      {
        title: 'API & Microservices',
        description:
          'Design and deploy robust REST and GraphQL microservices that integrate enterprise platforms efficiently.',
        icon: 'integration',
        href: '/what-we-build/custom-software',
        skills: [
          { name: 'NestJS', slug: 'nestjs' },
          { name: 'Django', slug: 'django' },
          { name: 'FastAPI', slug: 'fastapi' },
          { name: 'Node.js', slug: 'nodedotjs' },
          { name: 'GraphQL', slug: 'graphql' },
          { name: 'REST API', slug: 'openapiinitiative' },
          { name: 'PostgreSQL', slug: 'postgresql' },
          { name: 'Redis', slug: 'redis' },
          { name: 'RabbitMQ', slug: 'rabbitmq' },
          { name: 'Apache Kafka', slug: 'apachekafka' },
          { name: 'gRPC', slug: 'grpc' },
          { name: 'Docker', slug: 'docker' },
        ],
      },
    ],
  },
] as const;

export const LANDING_WHY_CHOOSE = {
  eyebrow: 'Why Businesses Choose Stack360',
  title: 'Product Development Company',
  highlight: 'Built Around Your Business',
  description:
    'We combine product thinking, engineering expertise, and AI capabilities to build solutions that create lasting business value.',
  reasons: [
    {
      id: 'business-first',
      title: 'Business-First Approach',
      description:
        'We start with your business goals, users, and challenges to build products that solve meaningful problems.',
    },
    {
      id: 'end-to-end',
      title: 'End-to-End Expertise',
      description:
        'From product strategy and UX to development, deployment, and support, we manage the complete product lifecycle.',
    },
    {
      id: 'ai-ready',
      title: 'AI-Ready Engineering',
      description:
        'We integrate practical AI capabilities into products and workflows to create smarter, more efficient business solutions.',
    },
    {
      id: 'built-to-scale',
      title: 'Built to Scale',
      description:
        'Our products use scalable architecture and modern technologies designed to support your growth from launch onward.',
    },
  ],
} as const;

export const LANDING_TECH_STACK = [
  'react',
  'vuedotjs',
  'nodedotjs',
  'nextdotjs',
  'python',
  'pytorch',
  'openai',
  'angular',
  'rubyonrails',
  'dotnet',
  'swift',
  'android',
  'laravel',
  'openjdk',
] as const;

export const LANDING_PROCESS = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We understand your goals, users, challenges, and requirements to define a clear product vision and development roadmap.',
  },
  {
    step: '02',
    title: 'Design & Architect',
    description:
      'We shape user experiences, technical architecture, technology stacks, and product specifications before development begins.',
  },
  {
    step: '03',
    title: 'Build & Test',
    description:
      'Our engineering teams develop your product iteratively, with continuous testing, feedback, quality assurance, and transparent progress.',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    description:
      'We launch, monitor, optimise, and continuously improve your product with ongoing support built around long-term growth.',
  },
] as const;

export const LANDING_CASE_STUDIES = [
  {
    slug: 'atc',
    tag: 'Operations',
    title: 'ATC — Air Traffic Controller',
    metric: '40% faster',
    metricLabel: 'Project & HR coordination',
    description:
      'A centralized management tool for HR, project management, invoicing, and real-time updates with seamless communication integrations.',
    stack: ['rubyonrails', 'redis', 'kubernetes', 'trello'],
  },
  {
    slug: 'autobuffy',
    tag: 'eCommerce',
    title: 'Autobuffy',
    metric: '2× traffic',
    metricLabel: 'Website speed & growth',
    description:
      'Modern auto-parts commerce for the USA — affordable, high-quality inventory with streamlined search and checkout.',
    stack: ['rubyonrails', 'angular', 'kubernetes', 'postgresql'],
  },
  {
    slug: 'buffyhub',
    tag: 'Marketplace',
    title: 'BuffyHub',
    metric: '12+ channels',
    metricLabel: 'Unified in one dashboard',
    description:
      'Centralized e-commerce operations — inventory, orders, brands, and vendors managed from a single control plane.',
    stack: ['rubyonrails', 'github', 'kubernetes', 'postgresql'],
  },
  {
    slug: 'coach-catalyst',
    tag: 'HealthTech',
    title: 'Coach Catalyst',
    metric: '3× DAU',
    metricLabel: 'Daily active user growth',
    description:
      'Fitness coaching platform with automated client management, progress tracking, and nutrition app integrations.',
    stack: ['rubyonrails', 'vuedotjs', 'kubernetes', 'stripe'],
  },
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  /**
   * Real client photo. Local asset (e.g. '/assets/testimonials/kyle-david.webp') or a
   * remote URL (its host must be whitelisted in `next.config.ts` → images.remotePatterns).
   * Leave undefined when the client hasn't shared a photo — the carousel shows a fallback
   * user icon instead.
   */
  avatar?: string;
}

export const LANDING_TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'Stack360 brought enterprise-grade engineering to our build with thoughtful architecture, disciplined delivery, and a team that turned ambitious product requirements into production-ready systems.',
    name: 'Cameron Kashani',
    role: 'Data & Analytics Specialist, Strategic Accounts',
    company: 'Google',
    industry: 'Cloud & AI · United States',
    rating: 5,
    avatar: '/assets/clients/cameron-kashani.webp',
  },
  {
    quote:
      'Stack360 built the platforms behind our AI automation practice with scalable architecture, clean integrations, and reliable delivery. They gave us the technical foundation to focus on helping businesses adopt intelligent systems.',
    name: 'Daniel Spence',
    role: 'CEO',
    company: 'Cybix AI',
    industry: 'AI & Automation · United Kingdom',
    rating: 5,
    avatar: '/assets/clients/daniel-spence.webp',
  },
  {
    quote:
      'Stack360 built NPTAAS from the ground up, including multi-tenant workflows, secure client portals, and the automation we needed to run a modern accounting and tax practice at scale.',
    name: 'Ernest Tomkiewicz',
    role: 'Founder & Certified Public Accountant',
    company: 'NPTAAS',
    industry: 'Accounting & Taxation · United States',
    rating: 5,
    avatar: '/assets/clients/ernest-tomkiewicz.webp',
  },
  {
    quote:
      'Working with Stack360 gave us the technical expertise and support we needed to move our product forward. The team was responsive, solutions-focused, and committed to getting things right.',
    name: 'Juan Diaz',
    role: '',
    company: '',
    industry: '',
    rating: 5,
    avatar: '/assets/clients/juan-diaz.webp',
  },
  {
    quote:
      'Stack360 brought Somrex’s digital prescribing and pharmacy platform to life. The team delivered a secure, compliant solution built around the speed, reliability, and trust our patients and clinicians expect.',
    name: 'Mohammed Jafar',
    role: 'Founder & Superintendent Pharmacist',
    company: 'Somer Pharmacy',
    industry: 'Digital Pharmacy · United Kingdom',
    rating: 5,
    avatar: '/assets/clients/mohammad-jafar.webp',
  },
  {
    quote:
      'Stack360 took the time to understand what we were trying to build and translated our requirements into a solution that was practical, reliable, and built to grow with the business.',
    name: 'Seamus Ryan',
    role: '',
    company: '',
    industry: '',
    rating: 5,
    avatar: '/assets/clients/seamus-ryan.webp',
  },
];

export const LANDING_CTA = {
  title: 'Let’s Build Your Next Product',
  description:
    'Turn your idea into a scalable digital product with a team that combines product strategy, engineering, AI, and technology.',
  secondary: { label: 'Explore Our Services', href: '/what-we-build' },
  primary: { label: 'See Our Work', href: '/our-work/case-studies' },
} as const;
