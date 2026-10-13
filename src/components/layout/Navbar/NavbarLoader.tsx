'use client';

import dynamic from 'next/dynamic';
import NavbarSkeleton from './NavbarSkeleton';

// Server-rendered so the menu is in the first paint and its links are in the HTML; the
// skeleton still covers client-side loads of the chunk.
const PremiumNavbar = dynamic(() => import('@/components/layout/Navbar'), {
  loading: () => <NavbarSkeleton />,
});

export default function NavbarLoader() {
  return <PremiumNavbar />;
}
