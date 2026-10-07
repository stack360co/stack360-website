import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import ConsentBanner from '@/components/analytics/ConsentBanner';
import InitialLoadingGate from '@/components/layout/Loading/InitialLoadingGate';
import { seo } from '@/constants/seo';
import { GTM_HEAD_SNIPPET, GTM_ID } from '@/lib/analytics';
import Providers from '@/providers';
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
    // suppressHydrationWarning: beforeInteractive script may add `js` before React hydrates
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Consent defaults must be in place before Tag Manager loads. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static Consent Mode and GTM loader
          dangerouslySetInnerHTML={{ __html: GTM_HEAD_SNIPPET }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="enhance-js" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');`}
        </Script>
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
        <Providers>
          <InitialLoadingGate>{children}</InitialLoadingGate>
        </Providers>
        <ConsentBanner />
      </body>
    </html>
  );
}
