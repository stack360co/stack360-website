import Image from 'next/image';
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/analytics/ConsentBanner';
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_NAME,
  UK_COMPANY_NAME,
  UK_COMPANY_NUMBER,
  UK_OFFICE_ADDRESS,
} from '@/constants/site';

/**
 * Shell for the ads landing pages: no site navigation, chat or floating buttons, so nothing pulls
 * a visitor away from booking. The logo isn't a link for the same reason. The footer keeps what UK
 * law and the cookie rules need: company details, privacy, terms and cookie settings.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-primary/20 selection:text-primary">
      <header className="border-b border-neutral-200 bg-white">
        <div className="site-container flex h-16 items-center justify-between gap-md">
          <span className="flex items-center gap-sm">
            <Image src="/favicon.svg" alt="" width={32} height={32} priority />
            <Image
              src="/stack360-text.svg"
              alt={SITE_NAME}
              width={108}
              height={20}
              priority
              className="h-5 w-auto"
            />
          </span>
          <a
            href="#book"
            className="inline-flex min-h-10 items-center rounded-md bg-primary px-md text-sm font-bold text-neutral-50 shadow-sm transition-colors hover:bg-primary-dark hover:text-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Book a free review
          </a>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="border-t border-neutral-200 bg-white py-xl">
        <div className="site-container flex flex-col gap-md text-xs text-neutral-600 md:flex-row md:items-end md:justify-between">
          <div className="space-y-xs">
            <p>
              © {year} {SITE_NAME} ·{' '}
              <a href={SITE_EMAIL_HREF} className="text-neutral-700 hover:text-primary">
                {SITE_EMAIL}
              </a>
            </p>
            {/* UK law asks a company's website to show these details. */}
            <p>
              {UK_COMPANY_NAME} is registered in England and Wales, company number{' '}
              {UK_COMPANY_NUMBER}. Registered office: {UK_OFFICE_ADDRESS}.
            </p>
          </div>
          <nav aria-label="Legal" className="flex shrink-0 items-center gap-lg text-sm">
            <Link href="/privacy" className="text-neutral-600 hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="text-neutral-600 hover:text-primary">
              Terms
            </Link>
            <CookieSettingsButton className="cursor-pointer text-neutral-600 transition-colors hover:text-primary" />
          </nav>
        </div>
      </footer>
    </div>
  );
}
