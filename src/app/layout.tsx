import { Geist, Geist_Mono } from 'next/font/google';
import ConsentBanner from '@/components/analytics/ConsentBanner';
import LeadAttribution from '@/components/analytics/LeadAttribution';
import { seo } from '@/constants/seo';
import { GTM_HEAD_SNIPPET, GTM_ID } from '@/lib/analytics';
import type { ReactComponentChildren } from '@/types/component';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = seo.root;

export default function RootLayout({ children }: Readonly<ReactComponentChildren>) {
  return (
    // suppressHydrationWarning: the head script adds `js` to <html> before React hydrates.
    // The font variables sit on <html> because Tailwind's theme defines --font-sans on :root as
    // var(--font-geist-sans); set only on <body>, it was undefined there and Geist never loaded.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint, so `js-only` chrome (the navbar) takes its space from the
            start instead of popping in once the bundle loads, which shifted the page. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static one-line class toggle
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }}
        />
        {/* Consent defaults must be in place before Tag Manager loads. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static Consent Mode and GTM loader
          dangerouslySetInnerHTML={{ __html: GTM_HEAD_SNIPPET }}
        />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <noscript>
          <style>{`
            .js-only { display: none !important; }
            .initial-load-gate { display: none !important; }
            main [style*="opacity"], header [style*="opacity"], footer [style*="opacity"],
            main [style*="transform"], header [style*="transform"] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          `}</style>
        </noscript>
        {/* The site's loading cover, route progress bar and toasts live in the (pages) layout, so
            the ads landing pages (/lp) don't download them. */}
        {children}
        <ConsentBanner />
        <LeadAttribution />
      </body>
    </html>
  );
}
