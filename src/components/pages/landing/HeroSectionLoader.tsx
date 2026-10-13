'use client';

import dynamic from 'next/dynamic';
import HeroSectionLoading from '@/components/layout/Loading/HeroSectionLoading';
import { LANDING_HERO } from '@/constants/component/landing-data';

// Server-rendered so the hero text is in the first paint (it was the page's LCP element);
// the skeleton still covers client-side loads of the chunk.
const HeroSection = dynamic(() => import('@/components/pages/landing/HeroSection'), {
  loading: () => (
    <HeroSectionLoading
      hideNavbar
      copy={{ lead: LANDING_HERO.lead, phrase: LANDING_HERO.phrases[0], intro: LANDING_HERO.intro }}
    />
  ),
});

export default function HeroSectionLoader() {
  return <HeroSection />;
}
