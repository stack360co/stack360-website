import BlueprintGrid from '@/components/layout/BlueprintGrid';
import Footer from '@/components/layout/Footer';
import RouteLoadingOverlay from '@/components/layout/Loading/RouteLoadingOverlay';
import NavbarLoader from '@/components/layout/Navbar/NavbarLoader';
import NoJsSiteNav from '@/components/layout/Navbar/NoJsSiteNav';
import JsonLd from '@/components/seo/JsonLd';
import FloatingActions from '@/components/shared/FloatingActions';
import { seo } from '@/constants/seo';
import { founderJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';

export const metadata = seo.pages;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-neutral-50 selection:bg-primary/20 selection:text-primary">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), founderJsonLd()]} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-md focus:top-md focus:z-100 focus:rounded-sm focus:bg-primary focus:px-md focus:py-sm focus:text-sm focus:font-bold focus:text-neutral-50"
      >
        Skip to main content
      </a>
      <BlueprintGrid />

      <div className="sticky top-0 z-50 w-full">
        <NavbarLoader />
        {/* Only parsed/shown when JS is disabled — never visible with scripting on */}
        <noscript>
          <NoJsSiteNav />
        </noscript>
      </div>

      <RouteLoadingOverlay />

      <main id="main-content" className="relative z-10 min-h-[calc(100vh-4.5rem)] w-full">
        {children}
      </main>
      <Footer />
      <div className="js-only">
        <FloatingActions />
      </div>
    </div>
  );
}
