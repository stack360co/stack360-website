/** Canonical site origin — used by metadata, sitemap, robots, and JSON-LD. */
export const SITE_URL = 'https://stack360.co';
// export const SITE_URL = 'https://stack360static.netlify.app';
export const SITE_NAME = 'Stack360';
/** Page title / brand line from https://www.stack360.co/ */
export const SITE_TAGLINE = 'Your Reliable Software Development Agency';

/** Meta description aligned with the live Stack360 homepage positioning. */
export const SITE_DESCRIPTION =
  'Stack360 provides world-class software development and staff augmentation services. Build faster, scale smarter, and deliver exceptional results with our expert tech talent.';

/** Sales inbox — display value and mailto target. */
export const SITE_EMAIL = 'sales@stack360.co';
export const SITE_EMAIL_HREF = `mailto:${SITE_EMAIL}` as const;

/** UK phone — display, E.164, and tel: link. */
export const SITE_PHONE = '+44 7404 350490';
export const SITE_PHONE_USA = '+1 (713) 443 9180';
export const SITE_PHONE_2 = '+44 7460 333169';
export const SITE_PHONE_E164 = '+447404350490';
export const SITE_PHONE_E164_2 = '+447460333169';
export const SITE_PHONE_HREF = `tel:${SITE_PHONE_E164}` as const;
export const SITE_PHONE_HREF_2 = `tel:${SITE_PHONE_E164_2}` as const;

export const SITE_SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/stack360co',
  github: 'https://github.com/stack360co',
  x: 'https://x.com/stack360',
  instagram: 'https://www.instagram.com/stack360co',
  facebook: 'https://www.facebook.com/stack360co',
} as const;

/**
 * Third-party review and directory profiles that link back to stack360.co.
 * Listed in the Organization JSON-LD `sameAs` so Google can tell us apart from
 * other companies called Stack360. Only add a profile after checking it is ours.
 */
export const SITE_PROFILES = {
  clutch: 'https://clutch.co/profile/stack360',
  goodfirms: 'https://www.goodfirms.co/company/stack360',
  designrush: 'https://www.designrush.com/agency/profile/stack-360',
  crunchbase: 'https://www.crunchbase.com/organization/stack-b25e',
  fiverr: 'https://www.fiverr.com/agencies/stack360',
} as const;

/**
 * Published pricing, kept identical to the Clutch profile (confirmed by the team
 * 2026-10-12). Change it here and on Clutch together.
 */
export const SITE_PRICING = {
  hourly: '$25–49 an hour',
  minimumProject: '$5,000',
} as const;

export const SITE_OFFICES = [
  // {
  //   country: 'Pakistan',
  //   role: 'Global Delivery Center',
  //   streetAddress: '82-G, First Floor, DHA Phase 1',
  //   addressLocality: 'Lahore',
  //   addressRegion: 'Punjab',
  //   addressCountry: 'PK',
  // },
  {
    country: 'United States',
    role: 'Stack360 Ai Solutions LLC',
    streetAddress: '12828 Willow Centre Dr',
    addressLocality: 'Houston',
    addressRegion: 'TX',
    postalCode: '77066',
    addressCountry: 'US',
  },
  {
    country: 'United Kingdom',
    role: 'Regional Office',
    streetAddress: '58 St. Johns Road',
    addressLocality: 'Barking',
    addressRegion: 'Essex',
    postalCode: 'IG11 7XL',
    addressCountry: 'GB',
  },
] as const;
