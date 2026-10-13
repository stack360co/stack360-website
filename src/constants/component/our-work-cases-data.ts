/** Our Work — case studies & featured projects (sourced from stack360.co). */

export const CASE_STUDIES_HERO = {
  eyebrow: 'Our Work',
  title: 'Our success',
  highlight: 'stories.',
  description:
    'How we built software for eight clients: the problem, what we did, the team and the hours it took. From eCommerce and fitness platforms to internal operations systems.',
} as const;

export const CASE_STUDIES = [
  {
    slug: 'autobuffy',
    featured: true,
    tag: 'eCommerce',
    title: 'Autobuffy',
    subtitle: 'Selling auto parts in the USA',
    metric: '2×',
    metricLabel: 'Website speed & traffic',
    description:
      'Autobuffy was created to make it easier to find affordable, high-quality auto parts using modern technology in the USA — with streamlined search and checkout.',
    stack: ['rubyonrails', 'angular', 'amazonaws', 'postgresql'],
    href: '/our-work/case-studies/autobuffy',
  },
  {
    slug: 'coach-catalyst',
    featured: true,
    tag: 'HealthTech',
    title: 'Coach Catalyst',
    subtitle: 'Fitness management',
    metric: '3×',
    metricLabel: 'Daily active users',
    description:
      'Streamlining fitness coaching with automated client management, progress tracking, and seamless integration with nutrition apps.',
    stack: ['rubyonrails', 'vuedotjs', 'amazonaws', 'stripe', 'postgresql'],
    href: '/our-work/case-studies/coach-catalyst',
  },
  {
    slug: 'atc',
    featured: true,
    tag: 'Operations',
    title: 'ATC — Air Traffic Controller',
    subtitle: 'Project & HR management',
    metric: '40%',
    metricLabel: 'Faster project & HR coordination',
    description:
      'ATC is a management tool developed for project handling and HR management — centralized workflows, invoicing, and real-time updates with communication integrations.',
    stack: ['rubyonrails', 'redis', 'amazonaws', 'stripe', 'trello'],
    href: '/our-work/case-studies/atc',
  },
  {
    slug: 'buffyhub',
    featured: true,
    tag: 'Marketplace',
    title: 'BuffyHub',
    subtitle: 'Unified e-commerce control plane',
    metric: '12+',
    metricLabel: 'Marketplaces in one dashboard',
    description:
      'BuffyHub is a unified e-commerce platform that centralizes inventory, orders, brands, and vendors into one place.',
    stack: ['rubyonrails', 'github', 'amazonaws', 'postgresql'],
    href: '/our-work/case-studies/buffyhub',
  },
  {
    slug: 'cercle',
    featured: true,
    tag: 'Fashion',
    title: 'Cercle',
    subtitle: 'Sustainable fashion rental',
    metric: '60%',
    metricLabel: 'Reduction in manual workflows',
    description:
      'Cercle is a fashion rental platform promoting sustainability by allowing users to borrow luxury fashion instead of buying — with scalable automation for rental management.',
    stack: ['rubyonrails', 'nextdotjs', 'amazonaws', 'stripe'],
    href: '/our-work/case-studies/cercle',
  },
  {
    slug: 'klingit',
    featured: true,
    tag: 'Creative',
    title: 'Klingit',
    subtitle: 'DesignOps for global creatives',
    metric: '40+',
    metricLabel: 'Global creatives synced',
    description:
      'Klingit is a tech-powered creative services platform that helps brands scale marketing with transparent DesignOps across a global talent pool.',
    stack: ['vuedotjs', 'rubyonrails', 'postgresql', 'redis', 'stripe'],
    href: '/our-work/case-studies/klingit',
  },
  {
    slug: 'nextflag',
    featured: true,
    tag: 'Social',
    title: 'Nextflag',
    subtitle: 'Location flags social app',
    metric: 'Map-first',
    metricLabel: 'Flags · follow · wishlist',
    description:
      'Nextflag is a social mobile app for creating and sharing personalized location flags — discover places and plan trips from real recommendations.',
    stack: ['reactnative', 'rubyonrails', 'postgresql', 'graphql'],
    href: '/our-work/case-studies/nextflag',
  },
  {
    slug: 'truck-4',
    featured: true,
    tag: 'Logistics',
    title: 'Truck-4',
    subtitle: 'Commercial fleet rentals',
    metric: 'K8s',
    metricLabel: 'Absorbs traffic spikes',
    description:
      'Truck-4 is a commercial vehicle rental marketplace — find, lease, or purchase trucks with secure auth, uploads, and microservices scale.',
    stack: ['react', 'nodedotjs', 'mongodb', 'kubernetes', 'docker'],
    href: '/our-work/case-studies/truck-4',
  },
] as const;

export const FEATURED_PROJECTS_HERO = {
  eyebrow: 'Our Work',
  title: 'Featured',
  highlight: 'projects.',
  description:
    'Highest-impact systems we have shipped — selected for engineering depth, measurable outcomes, and production durability.',
} as const;

export const FEATURED_PROJECTS = CASE_STUDIES.filter((c) => c.featured);

export const SUCCESS_STORIES_HERO = {
  eyebrow: 'Our Work',
  title: 'Client success',
  highlight: 'in their words.',
  description:
    'Real returns from partners who trusted Stack360 with complex products — from internal ops tools to consumer platforms.',
} as const;

/** Same shape as `LANDING_TESTIMONIALS` — quote, name, role, company, industry, rating, optional avatar. */
export const SUCCESS_STORIES = [
  {
    quote:
      'Stack360 built ATC exactly as we envisioned. Their team handled complex HR workflows and real-time updates, significantly improving our internal processes.',
    name: 'Kyle David',
    role: 'CEO',
    company: 'ATC',
    industry: 'Operations · United States',
    rating: 5,
  },
  {
    quote:
      "Thanks to Stack360's skilled developers, Cercle's platform launched flawlessly. They solved our scalability and automation issues, making rental management seamless.",
    name: 'Ritesh Goyal',
    role: 'CEO',
    company: 'Cercle',
    industry: 'Fashion rental · Global',
    rating: 5,
  },
  {
    quote:
      'Stack360 delivered a robust system that automated our coaching processes. Their seamless integration of nutrition and progress tracking features made our services more efficient.',
    name: 'Kane Sivesind',
    role: 'CEO',
    company: 'Coach Catalyst',
    industry: 'Fitness · United States',
    rating: 5,
  },
] as const;
