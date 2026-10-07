import Link from 'next/link';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { seo } from '@/constants/seo';
import { SITE_EMAIL, SITE_EMAIL_HREF } from '@/constants/site';

export const metadata = seo.privacy;

export default function PrivacyPage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="policy."
        description="We collect only what we need to respond to inquiries and operate this marketing site — no mailing-list abuse."
      />

      <section className="site-section border-b border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl space-y-xl text-sm leading-relaxed text-neutral-600">
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">What we collect</h2>
            <p className="text-pretty">
              When you contact us or request talent, we may receive your name, work email, company,
              message content, and any skills or engagement preferences you submit. Server logs may
              include IP address and basic request metadata for security and reliability.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">How we use it</h2>
            <p className="text-pretty">
              We use inquiry data to respond to your request, qualify engagements, and improve our
              services. We do not sell personal data. We do not enroll you in marketing lists from
              contact or hire forms.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Sharing</h2>
            <p className="text-pretty">
              We share data with processors only as needed to run email, hosting, and analytics — or
              when required by law. Project delivery may involve authorized team members under
              confidentiality.
            </p>
          </div>
          <div id="cookies" className="scroll-mt-24 space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Cookies and analytics</h2>
            <p className="text-pretty">
              We use Google Analytics, loaded through Google Tag Manager, to understand how visitors
              find and use this site: which pages are viewed, where visits come from, and when a
              contact or hire form is sent. Google Analytics sets cookies (named <code>_ga</code>{' '}
              and <code>_ga_*</code>) that last up to two years. We don&apos;t use them for
              advertising.
            </p>
            <p className="text-pretty">
              If you&apos;re in the European Economic Area, the UK or Switzerland, these cookies are
              only set after you accept them in the cookie banner. Elsewhere they&apos;re on by
              default. Wherever you are, you can change your choice at any time from &ldquo;Cookie
              settings&rdquo; at the bottom of every page.
            </p>
          </div>
          <div className="space-y-sm">
            <h2 className="text-lg font-bold text-neutral-900">Contact</h2>
            <p className="text-pretty">
              Privacy questions:{' '}
              <a className="font-bold text-primary underline" href={SITE_EMAIL_HREF}>
                {SITE_EMAIL}
              </a>
              . Related:{' '}
              <Link href="/terms" className="font-bold text-primary underline">
                Terms of Use
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <PageClosingCta
        title="Have a project to discuss?"
        description="Reach the partnerships desk — we route you to the right lead."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Terms of use', href: '/terms' }}
      />
    </div>
  );
}
