import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Existing configuration options
  reactCompiler: true,
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
      // The Netlify default domain serves a duplicate copy of the site; send it to
      // the real domain. Exact host only, so deploy previews keep working.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'stack360static.netlify.app' }],
        destination: 'https://stack360.co/:path*',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/',
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
        destination: '/',
        permanent: true,
      },
      {
        source: '/our-work/learning-sessions',
        destination: '/',
        permanent: true,
      },

      // Services
      {
        source: '/services/web-development',
        destination: '/what-we-build/web-apps',
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
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/ui-ux',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/quality-assurance',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/digital-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/data-science',
        destination: '/',
        permanent: true,
      },

      // Hire Talent
      {
        source: '/hire-talent/react-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/angular-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/vue-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/next-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/ror-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/python-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/dotnet-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/django-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/node-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/nest-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/blockchain-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/react-native-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/flutter-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/xamarin-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },
      {
        source: '/hire-talent/swift-developer',
        destination: '/work-with-us/hire',
        permanent: true,
      },

      // Case Studies
      {
        source: '/case-studies/truck4-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/autobuffy-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/coach-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/atc-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/cercle-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/buffyhub-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/klingit-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/nextflag-case-study',
        destination: '/our-work/case-studies',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
