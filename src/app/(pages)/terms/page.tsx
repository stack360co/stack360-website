import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { seo } from '@/constants/seo';
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_NAME } from '@/constants/site';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.terms;

export default function TermsPage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        highlight="use."
        description="These terms govern access to stack360.co and how we engage when you inquire about or contract for software services."
      />

      <section className="site-section border-b border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl space-y-xl text-sm leading-relaxed text-neutral-600">
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Acceptance</h2>
            <p className="text-pretty">
              By using this website you agree to these terms. If you do not agree, do not use the
              site. Project engagements are governed by a separate statement of work or master
              services agreement.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Services described</h2>
            <p className="text-pretty">
              Capability pages and case studies describe typical offerings. They are not offers to
              contract. Scope, fees, and timelines are confirmed only in writing between {SITE_NAME}{' '}
              and the client or partner.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">How we write this site</h2>
            <p className="text-pretty">
              We draft some pages with AI tools, working from our own project records. A senior
              engineer reviews every page before it is published, and project details come from our
              case studies and portfolio.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Intellectual property</h2>
            <p className="text-pretty">
              Site content, branding, and materials are owned by {SITE_NAME} or its licensors. You
              may not copy or redistribute them without permission. Deliverables under a paid
              engagement follow the IP terms in that agreement.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Contact</h2>
            <p className="text-pretty">
              Questions about these terms:{' '}
              <a className="font-bold text-primary underline" href={SITE_EMAIL_HREF}>
                {SITE_EMAIL}
              </a>
              . See also our{' '}
              <Link href="/privacy" className="font-bold text-primary underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <PageClosingCta
        title="Ready to start a build?"
        description="Tell us what you need — we respond with a scoped next step."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Privacy policy', href: '/privacy' }}
      />
    </div>
  );
}
