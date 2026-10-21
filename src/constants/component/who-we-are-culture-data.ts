export const CULTURE_HERO = {
  eyebrow: 'Who We Are',
  title: 'A workplace built for',
  highlight: 'craft and collaboration.',
  description:
    'We thrive on diversity, straightforward problem-solving, and environments where engineers do their best work — in the hall, the meeting room, and the spaces between.',
} as const;

export const CULTURE_GOAL = {
  title: 'Our goal',
  paragraphs: [
    'At Stack360, our aim is simple: boost your business success. We deliver solutions that streamline processes, improve efficiency, and strengthen your digital presence.',
    'We pride ourselves on a straightforward approach to problem-solving — simplifying complexity and offering clear, actionable insight so your business reaches its full potential.',
    'Ultimately, we foster long-term partnerships. We aim to be more than a vendor; we want to be part of your success story, aligning our work with your objectives so you stay ahead in a fast-paced world.',
  ],
} as const;

/**
 * Intrinsic `width`/`height` are the real pixel dimensions of each asset. They let the
 * masonry render every photo uncropped at its natural aspect ratio with zero layout shift.
 */
export const CULTURE_OFFICE_PHOTOS = [
  {
    src: '/assets/who-we-are/office/hr-department.webp',
    alt: 'Stack360 HR department workspace',
    caption: 'HR & operations',
    width: 720,
    height: 720,
  },
  {
    src: '/assets/who-we-are/office/dev-hall.webp',
    alt: 'Developers working in the main engineering hall',
    caption: 'Engineering hall',
    width: 1020,
    height: 1276,
  },
  {
    src: '/assets/who-we-are/office/dev-hall-way.webp',
    alt: 'Development hallway at Stack360 Lahore office',
    caption: 'Dev corridor',
    width: 1040,
    height: 644,
  },
  {
    src: '/assets/who-we-are/office/meeting-room.webp',
    alt: 'Team meeting room for architecture reviews',
    caption: 'Meeting room',
    width: 1020,
    height: 660,
  },
  {
    src: '/assets/who-we-are/office/gaming-area.webp',
    alt: 'Recreation and gaming area for team breaks',
    caption: 'Recreation space',
    width: 1024,
    height: 660,
  },
] as const;

/** PicsArt-style collage — placement is intentionally irregular, not sectioned by name. */
export const CULTURE_COLLAGE_PHOTOS = [
  {
    src: '/assets/culture/tour.webp',
    alt: 'Stack360 team on an outdoor retreat holding the company banner',
    caption: 'Team retreat',
    width: 4928,
    height: 3264,
  },
  {
    src: '/assets/culture/IMG_3329.webp',
    alt: 'Two Stack360 teammates in the studio lobby',
    caption: 'In the studio',
    width: 3024,
    height: 4032,
  },
  {
    src: '/assets/culture/DSC_0144.webp',
    alt: 'Stack360 team members posing in the office',
    caption: 'The crew',
    width: 4928,
    height: 3264,
  },
  {
    src: '/assets/culture/IMG_5568.webp',
    alt: 'Team members collaborating on laptops during a studio session',
    caption: 'Studio day',
    width: 3024,
    height: 4032,
  },
  {
    src: '/assets/culture/DSC_0208.webp',
    alt: 'Large Stack360 team group photo in the office',
    caption: 'All hands',
    width: 4928,
    height: 3264,
  },
  {
    src: '/assets/culture/DSC_0062.webp',
    alt: 'Stack360 teammates in traditional attire at the office',
    caption: 'Culture day',
    width: 4928,
    height: 3264,
  },
  {
    src: '/assets/culture/IMG_5569.webp',
    alt: 'Two Stack360 colleagues sharing a casual moment',
    caption: 'Between sessions',
    width: 3024,
    height: 4032,
  },
  {
    src: '/assets/culture/DSC_0149.webp',
    alt: 'Two Stack360 teammates at a desk in the studio',
    caption: 'Heads down',
    width: 4928,
    height: 3264,
  },
] as const;

export const CULTURE_FOUNDER = {
  name: 'Azmat Rana',
  role: 'CEO & Founder',
  linkedin: 'https://www.linkedin.com/in/azmatrana50',
  image: {
    src: '/assets/who-we-are/leaders/azmat-rana.webp',
    alt: 'Azmat Rana, CEO and Founder of Stack360',
  },
  quote:
    'Our team works tirelessly to develop solutions that meet immediate needs and ensure long-term success for every partner we serve.',
} as const;

export const CULTURE_CTA = {
  title: 'Culture that ships',
  description:
    'See how collaboration, craft, and accountability translate into the delivery model we bring to every client engagement.',
  primary: { label: 'How we work', href: '/who-we-are/how-we-work' },
  secondary: { label: 'Talk to us', href: '/contact' },
} as const;
