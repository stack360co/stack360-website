import Link from 'next/link';
import type { ReactNode } from 'react';
import JsonLd from '@/components/seo/JsonLd';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { seo } from '@/constants/seo';
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  UK_COMPANY_NAME,
  UK_COMPANY_NUMBER,
  UK_ICO_REGISTRATION_NUMBER,
  UK_OFFICE_ADDRESS,
} from '@/constants/site';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export const metadata = seo.privacy;

/** Bump when the notice changes. UK GDPR notices should say when they were last updated. */
const LAST_UPDATED = '18 November 2026';

const linkClass = 'font-bold text-primary underline';

/**
 * Anchors are linked from outside the site: UK cold emails link to #prospecting, so keep the ids.
 */
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 space-y-sm">
      <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
      {children}
    </div>
  );
}

function Email() {
  return (
    <a className={linkClass} href={SITE_EMAIL_HREF}>
      {SITE_EMAIL}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd data={pageJsonLdFromMeta(metadata)} />
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="policy."
        description="How Stack360 Ltd collects and uses personal data under UK GDPR: enquiries, client work, business prospecting and cookies."
      />

      <section className="site-section border-b border-neutral-200 py-2xl">
        <div className="site-container max-w-3xl space-y-xl text-sm leading-relaxed text-neutral-600">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            Last updated {LAST_UPDATED}
          </p>

          <Section id="who-we-are" title="Who we are">
            <p className="text-pretty">
              {UK_COMPANY_NAME} is the controller of the personal data described here. We are
              registered in England and Wales, company number {UK_COMPANY_NUMBER}, registered
              office: {UK_OFFICE_ADDRESS}. {UK_COMPANY_NAME} is registered with the Information
              Commissioner’s Office, registration number {UK_ICO_REGISTRATION_NUMBER}. For anything
              about your data, email <Email />.
            </p>
          </Section>

          <Section id="what-we-collect" title="What we collect">
            <p className="text-pretty">
              When you contact us or request talent, we may receive your name, work email, company,
              message content, and any skills or engagement preferences you submit. Server logs may
              include IP address and basic request metadata for security and reliability.
            </p>
            <p className="text-pretty">
              With each enquiry or call booking we also record how you found us: the first page you
              visited and when, the site that referred you, any campaign tags in the link, your
              approximate location (city and country, from your IP address) and whether you used a
              phone or a computer. If you arrived from one of our Google ads and allowed advertising
              cookies, we also record Google’s ad click ID.
            </p>
          </Section>

          <Section id="lawful-basis" title="What we use your data for, and our lawful basis">
            <ul className="list-disc space-y-xs pl-lg">
              <li className="text-pretty">
                <strong className="text-neutral-800">Enquiries, bookings and proposals:</strong> to
                answer you and, if you ask, to prepare a proposal. Lawful basis: taking steps at
                your request before a contract, or our legitimate interest in responding to business
                enquiries.
              </li>
              <li className="text-pretty">
                <strong className="text-neutral-800">Delivering projects for clients:</strong> to
                perform our contract with you or your organisation.
              </li>
              <li className="text-pretty">
                <strong className="text-neutral-800">Business prospecting:</strong> see{' '}
                <a className={linkClass} href="#prospecting">
                  below
                </a>
                . Lawful basis: our legitimate interests.
              </li>
              <li className="text-pretty">
                <strong className="text-neutral-800">Analytics and advertising cookies:</strong>{' '}
                your consent, given in the cookie banner. See{' '}
                <a className={linkClass} href="#cookies">
                  cookies
                </a>
                .
              </li>
            </ul>
            <p className="text-pretty">
              We do not sell personal data, and we do not add you to marketing lists from our
              contact or hire forms.
            </p>
          </Section>

          <Section id="prospecting" title="Business prospecting">
            <p className="text-pretty">
              {UK_COMPANY_NAME} sometimes emails people at UK companies about our automation
              services when their role suggests the service may be relevant. We use your name, job
              title, work email address and company details, which we obtain from Apollo.io (a
              business contact data provider), your company’s website and Companies House. Our
              lawful basis is our legitimate interest in telling businesses about relevant services.
            </p>
            <p className="text-pretty">
              We only email people at incorporated companies, never personal email addresses, and we
              send no more than three emails unless you reply. If you don’t reply, we delete your
              details from our sending tool 14 days after our last email, and keep a minimal record
              (email address and dates) for 24 months so we don’t contact you again by mistake.
            </p>
            <p className="text-pretty">
              If you ask us to stop, we stop at once and keep your email address on a suppression
              list so it stays that way. You can object, or ask what we hold about you, at any time
              by replying to our email or writing to <Email />.
            </p>
          </Section>

          <Section id="sharing" title="Who we share data with">
            <p className="text-pretty">
              We don’t sell personal data. We share it only with service providers who process it
              for us under contract:
            </p>
            <ul className="list-disc space-y-xs pl-lg">
              <li>website hosting (Amazon Web Services);</li>
              <li>email and calendar (Google Workspace);</li>
              <li>emails that pass website enquiries to our team (Resend);</li>
              <li>our email sending tool (Instantly);</li>
              <li>our business contact data provider (Apollo.io);</li>
              <li>scheduling (Calendly);</li>
              <li>analytics (Google Analytics, Microsoft Clarity);</li>
              <li>advertising measurement (Google Ads), as described under cookies;</li>
              <li>our own customer records and team chat systems.</li>
            </ul>
            <p className="text-pretty">
              Project delivery may involve authorised team members under confidentiality. We also
              share data when the law requires it.
            </p>
          </Section>

          <Section id="transfers" title="International transfers">
            <p className="text-pretty">
              Some of these providers are based in the United States. When personal data leaves the
              UK, we protect it with the safeguards UK law provides: the UK–US data bridge for
              certified providers, or the UK International Data Transfer Agreement or Addendum.
            </p>
          </Section>

          <Section id="retention" title="How long we keep data">
            <ul className="list-disc space-y-xs pl-lg">
              <li>Enquiries that don’t become work: up to 24 months after our last contact.</li>
              <li>
                Client and contract records: for the length of the relationship, then 6 years for
                legal and tax purposes.
              </li>
              <li>
                Prospecting: as described under{' '}
                <a className={linkClass} href="#prospecting">
                  business prospecting
                </a>
                .
              </li>
              <li>
                Cookie data: as described under{' '}
                <a className={linkClass} href="#cookies">
                  cookies
                </a>
                .
              </li>
            </ul>
          </Section>

          <Section id="cookies" title="Cookies, analytics and advertising">
            <p className="text-pretty">
              We use Google Analytics, loaded through Google Tag Manager, to understand how visitors
              find and use this site: which pages are viewed, where visits come from, and when a
              contact or hire form is sent. Google Analytics sets cookies (named <code>_ga</code>{' '}
              and <code>_ga_*</code>) that last up to two years.
            </p>
            <p className="text-pretty">
              We use Google’s advertising features to measure whether our Google Ads lead to
              enquiries and to show our ads to people who have visited this site. Google may set
              advertising cookies for this, such as <code>_gcl_au</code>. When an enquiry that came
              from one of our ads becomes a qualified lead or a client, we may tell Google Ads,
              using the ad click ID and a hashed (scrambled, one-way) copy of your email address, so
              we can see which ads bring real work. We only do this if you allowed advertising
              cookies, or if you’re outside the European Economic Area, the UK and Switzerland.
              Google handles this data under the{' '}
              <a
                className={linkClass}
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
              .
            </p>
            <p className="text-pretty">
              We also use Microsoft Clarity, loaded the same way, to see how people use our pages:
              clicks, scrolling and session recordings. Clarity masks form fields and other
              sensitive text by default. It sets its own cookies (named <code>_clck</code> and{' '}
              <code>_clsk</code>), and Microsoft may set cookies such as <code>MUID</code>.
              Microsoft handles this data under the{' '}
              <a
                className={linkClass}
                href="https://privacy.microsoft.com/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Privacy Statement
              </a>
              .
            </p>
            <p className="text-pretty">
              If you’re in the European Economic Area, the UK or Switzerland, these cookies are only
              set after you accept them in the cookie banner, where you can allow analytics only, or
              analytics and advertising. Elsewhere they’re on by default. Wherever you are, you can
              change your choice at any time from &ldquo;Cookie settings&rdquo; at the bottom of
              every page.
            </p>
          </Section>

          <Section id="your-rights" title="Your rights">
            <p className="text-pretty">
              You can ask us for a copy of your data, to correct it, to delete it, to restrict how
              we use it, or to receive it in a portable format. You can object to our use of it at
              any time, and you can always object to direct marketing, which we will stop at once.
              Write to <Email /> and we will reply within one month.
            </p>
            <p className="text-pretty">
              If you are unhappy with how we handle your data, you can complain to the Information
              Commissioner’s Office (
              <a
                className={linkClass}
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk
              </a>
              , 0303 123 1113).
            </p>
          </Section>

          <Section id="contact" title="Contact">
            <p className="text-pretty">
              Privacy questions: <Email />. Related:{' '}
              <Link href="/terms" className={linkClass}>
                Terms of Use
              </Link>
              .
            </p>
          </Section>
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
