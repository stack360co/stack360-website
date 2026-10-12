export const HISTORY_HERO = {
  eyebrow: 'Who We Are',
  title: 'Building custom solutions',
  highlight: 'for long-term success.',
  description:
    'We collaborate with startups and enterprises to develop software designed for growth, efficiency, and durable partnerships — not one-off handoffs.',
} as const;

export const HISTORY_STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '200+', label: 'Clients Served' },
  { value: '2019', label: 'Founded' },
  { value: '100%', label: 'Success Rate' },
] as const;

export const HISTORY_MILESTONES = [
  {
    year: 'Origins',
    title: 'Engineering-first studio',
    description:
      'Stack360 began as a team obsessed with shipping reliable software — custom products, not slide decks.',
  },
  {
    year: 'Growth',
    title: 'Products that scale',
    description:
      'From ERP and HR platforms to marketplaces and FinTech, we built systems that survived real users and real load.',
  },
  // {
  //   year: 'Global',
  //   title: 'Lahore delivery, UK presence',
  //   description:
  //     'A global delivery center in Pakistan and a regional office in the United Kingdom — follow-the-sun without losing accountability.',
  // },
  {
    year: 'Forward',
    title: 'Vision beyond 1,000 builders',
    description:
      'We are growing a diverse team of dedicated professionals — enriching skills and perspectives to serve clients and community better.',
  },
] as const;

export const HISTORY_VISION = {
  title: 'Our vision',
  paragraphs: [
    'We see a future where our team grows beyond 1,000 dedicated professionals, each bringing unique talent to the forefront of technology and innovation.',
    'Growing the team is how we add the skills and perspectives our clients and community need.',
    'Our journey forward is marked by a commitment to understanding market needs, driving positive change, and redefining excellence through growth, innovation, and a united team.',
  ],
  image: {
    src: '/assets/who-we-are/leaders/azmat-rana.webp',
    alt: 'Azmat Rana, CEO and Founder of Stack360',
  },
} as const;

export const HISTORY_CTA = {
  title: 'See our story in practice',
  description:
    'Our culture and delivery model turn this history into shipped products, retained clients, and partnerships that last beyond launch.',
  primary: { label: 'How we work', href: '/who-we-are/how-we-work' },
  secondary: { label: 'Our culture', href: '/who-we-are/culture' },
} as const;
