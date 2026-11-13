import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Existing configuration options
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
  async headers() {
    return [
      {
        // Brand logos rarely change; rename the file if one ever does.
        source: '/brand-icons/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }],
      },
    ];
  },
  async redirects() {
    return [
      // Hosts that serve a duplicate copy of the site go to the real domain: www, and AWS
      // Amplify's own address. Amplify's console redirect rules didn't survive redeploys, so the
      // redirects live here. Amplify passes the visitor's host as `host` or `x-forwarded-host`.
      ...['www.stack360.co', 'main.dh71mgyv937gh.amplifyapp.com'].flatMap((duplicateHost) =>
        (['host', 'x-forwarded-host'] as const).map((headerName) => ({
          source: '/:path*',
          has:
            headerName === 'host'
              ? [{ type: 'host' as const, value: duplicateHost }]
              : [{ type: 'header' as const, key: headerName, value: duplicateHost }],
          destination: 'https://stack360.co/:path*',
          permanent: true,
        }))
      ),
      // Old URLs still collect impressions in Search Console; send each one to the
      // page that matches its intent rather than the home page.
      {
        source: '/about-us',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/what-we-build',
        permanent: true,
      },
      {
        source: '/hire-talent',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/our-work/news',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/our-work/learning-sessions',
        destination: '/blog',
        permanent: true,
      },
      // The blog moved from /our-work/blog; Search Console still finds the old addresses (404s).
      {
        source: '/our-work/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/our-work/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },

      // Services
      {
        source: '/services/web-development',
        destination: '/what-we-build/web-apps',
        permanent: true,
      },
      // Old root-level service URLs that still have backlinks (found in Ahrefs, 2026-10-13).
      {
        source: '/web-development',
        destination: '/what-we-build/web-apps',
        permanent: true,
      },
      {
        source: '/qa-testing',
        destination: '/what-we-build/qa-testing',
        permanent: true,
      },
      {
        source: '/services/mobile-development',
        destination: '/what-we-build/mobile-apps',
        permanent: true,
      },
      {
        source: '/services/devops',
        destination: '/what-we-build/devops',
        permanent: true,
      },
      {
        source: '/services/graphic-designing',
        destination: '/what-we-build',
        permanent: true,
      },
      {
        source: '/services/ui-ux',
        destination: '/what-we-build',
        permanent: true,
      },
      {
        source: '/services/quality-assurance',
        destination: '/what-we-build/qa-testing',
        permanent: true,
      },
      {
        source: '/services/digital-marketing',
        destination: '/what-we-build/digital-marketing',
        permanent: true,
      },
      {
        source: '/services/data-science',
        destination: '/what-we-build/ai-solutions',
        permanent: true,
      },

      // Hire Talent: technologies with their own page go there, the rest to the hire page
      {
        source: '/hire-talent/react-developer',
        destination: '/work-with-us/hire/react-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/angular-developer',
        destination: '/work-with-us/hire/angular-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/vue-developer',
        destination: '/work-with-us/hire/vue-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/next-developer',
        destination: '/work-with-us/hire/react-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/ror-developer',
        destination: '/work-with-us/hire/ruby-on-rails-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/python-developer',
        destination: '/work-with-us/hire/python-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/dotnet-developer',
        destination: '/work-with-us/hire/dotnet-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/django-developer',
        destination: '/work-with-us/hire/python-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/node-developer',
        destination: '/work-with-us/hire/nodejs-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/nest-developer',
        destination: '/work-with-us/hire/nodejs-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/blockchain-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/react-native-developer',
        destination: '/work-with-us/hire/react-native-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/flutter-developer',
        destination: '/work-with-us/hire/flutter-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/xamarin-developer',
        destination: '/work-with-us/hire/dotnet-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/swift-developer',
        destination: '/work-with-us/hire/swift-developers',
        permanent: true,
      },
      {
        source: '/hire-talent/ruby-on-rails-developer',
        destination: '/work-with-us/hire/ruby-on-rails-developers',
        permanent: true,
      },
      // Any other old hire-talent variant lands on the hire hub rather than a 404.
      {
        source: '/hire-talent/:path+',
        destination: '/work-with-us/hire',
        permanent: true,
      },

      // Old portfolio address for a project that now has a case study
      {
        source: '/portfolio/autobuffy',
        destination: '/our-work/case-studies/autobuffy',
        permanent: true,
      },
      {
        source: '/portfolio/:path*',
        destination: '/our-work/featured-projects',
        permanent: true,
      },
      {
        source: '/portfolio-category/:path*',
        destination: '/our-work/featured-projects',
        permanent: true,
      },

      // Old WordPress pages still crawled by Ahrefs (2026-10-13). Theme internals stay 404.
      { source: '/our-team', destination: '/who-we-are/culture', permanent: true },
      { source: '/home-new', destination: '/', permanent: true },
      { source: '/SEO', destination: '/what-we-build/digital-marketing', permanent: true },
      { source: '/seo', destination: '/what-we-build/digital-marketing', permanent: true },
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/blog', permanent: true },

      // Case Studies: each old address goes to the same study's new page
      {
        source: '/case-studies/truck4-case-study',
        destination: '/our-work/case-studies/truck-4',
        permanent: true,
      },
      {
        source: '/case-studies/autobuffy-case-study',
        destination: '/our-work/case-studies/autobuffy',
        permanent: true,
      },
      {
        source: '/case-studies/coach-case-study',
        destination: '/our-work/case-studies/coach-catalyst',
        permanent: true,
      },
      {
        source: '/case-studies/atc-case-study',
        destination: '/our-work/case-studies/atc',
        permanent: true,
      },
      {
        source: '/case-studies/cercle-case-study',
        destination: '/our-work/case-studies/cercle',
        permanent: true,
      },
      {
        source: '/case-studies/buffyhub-case-study',
        destination: '/our-work/case-studies/buffyhub',
        permanent: true,
      },
      {
        source: '/case-studies/klingit-case-study',
        destination: '/our-work/case-studies/klingit',
        permanent: true,
      },
      {
        source: '/case-studies/nextflag-case-study',
        destination: '/our-work/case-studies/nextflag',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
