'use client';

import HeroSection from '@/components/pages/landing/HeroSection';

// Imported directly, not with next/dynamic, so the hero (and the page's h1) is in the HTML
// as visible text rather than in a hidden block that only JavaScript reveals. The hero
// skeleton now shows through RouteLoadingOverlay when a link to the home page is slow.
export default function HeroSectionLoader() {
  return <HeroSection />;
}
