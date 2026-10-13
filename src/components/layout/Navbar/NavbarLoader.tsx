'use client';

import PremiumNavbar from '@/components/layout/Navbar';

// Imported directly, not with next/dynamic: a dynamic import wraps the menu in a Suspense
// boundary, and a static page then ships it inside a hidden block that only JavaScript reveals.
export default function NavbarLoader() {
  return <PremiumNavbar />;
}
