'use client';

import dynamic from 'next/dynamic';
import HeroSectionLoading from '@/components/layout/Loading/HeroSectionLoading';
import { LANDING_HERO } from '@/constants/component/landing-data';

const HeroSection = dynamic(() => import('@/components/pages/landing/HeroSection'), {
  ssr: false,
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
