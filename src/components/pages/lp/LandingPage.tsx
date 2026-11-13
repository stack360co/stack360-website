import { ArrowRight, Check, MessageCircle, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/analytics/ConsentBanner';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import { LANDING_TESTIMONIALS } from '@/constants/component/landing-data';
import {
  formatPrice,
  getLpPageContent,
  LP_PACKAGE_TERMS,
  LP_PACKAGES,
  LP_PROOF,
  LP_SHORT_QUOTE,
  LP_TRUST,
  type LpPackage,
  type LpProofId,
  type LpVariant,
  lpWhatsAppLink,
  VAT_LABEL,
} from '@/constants/component/lp-data';
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_NAME,
  UK_COMPANY_NAME,
  UK_COMPANY_NUMBER,
  UK_OFFICE_ADDRESS,
} from '@/constants/site';
import LpHero from './LpHero';
import LpWhatsAppTracker from './LpWhatsAppTracker';

/* The site's own type and component styles (PageHero, CapabilityPage, PageClosingCta). */
const sectionTitle = 'text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl';
const sectionIntro = 'mt-sm max-w-3xl text-pretty text-sm leading-relaxed text-neutral-600';
const eyebrow = 'font-mono text-[10px] font-bold uppercase tracking-widest text-primary';
const primaryButton =
  'inline-flex min-h-11 items-center justify-center gap-xs rounded-sm bg-primary px-lg py-sm text-sm font-bold text-neutral-50 shadow-md transition-colors hover:bg-primary-dark hover:text-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const whatsappButton =
  'inline-flex min-h-11 items-center justify-center gap-xs rounded-sm border border-neutral-300 bg-neutral-50 px-lg py-sm text-sm font-bold text-neutral-800 transition-colors hover:border-[#25D366] hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/** Mitchell's G2 review: the one client quote about automation, so every page shows it. */
const REVIEW = LANDING_TESTIMONIALS.find((t) => t.name === 'Mitchell Woods');

function ProofCard({ id }: { id: LpProofId }) {
  const proof = LP_PROOF[id];
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
      <p className="font-mono text-2xl font-black text-primary">{proof.metric}</p>
      <p className="mt-xs font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
        {proof.metricLabel}
      </p>
      <h3 className="mt-lg text-lg font-bold text-neutral-900">{proof.client}</h3>
      <p className="text-xs text-neutral-500">{proof.context}</p>
      <p className="mt-sm text-sm leading-relaxed text-neutral-600">{proof.description}</p>
    </div>
  );
}

function PackageCard({ pkg, summary }: { pkg: LpPackage; summary?: string }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
        {pkg.timing}
      </p>
      <h3 className="mt-sm text-lg font-bold text-neutral-900 lg:min-h-[3.5rem]">{pkg.name}</h3>
      <p className="mt-xs text-sm leading-relaxed text-neutral-600 lg:min-h-[3rem]">
        {summary ?? pkg.summary}
      </p>
      <p className="mt-md flex flex-wrap items-baseline gap-x-xs">
        {pkg.from ? <span className="text-sm font-semibold text-neutral-600">from</span> : null}
        <span className="text-3xl font-black tracking-tight text-neutral-900">
          {formatPrice(pkg.price)}
        </span>
        {pkg.per ? <span className="text-sm font-semibold text-neutral-600">{pkg.per}</span> : null}
      </p>
      <p className="text-xs font-semibold text-neutral-600">{VAT_LABEL}</p>
      <p className="mt-xs font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
        Fixed price · {pkg.payment}
      </p>
      <ul className="mt-md flex-1 space-y-sm">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-sm text-sm text-neutral-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-md text-xs leading-relaxed text-neutral-500">Not included: {pkg.excluded}</p>
      <a
        href="#book"
        className="mt-lg inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
      >
        Start with a free review
        <ArrowRight size={14} aria-hidden />
      </a>
    </div>
  );
}

function OfferCard({
  title,
  description,
  headingLevel,
}: {
  title: string;
  description: string;
  headingLevel: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <div className="flex flex-col gap-lg rounded-xl border-2 border-primary/40 bg-neutral-50 p-lg shadow-sm md:flex-row md:items-center md:justify-between md:p-xl">
      <div>
        <p className={eyebrow}>Start here · Free</p>
        <Heading
          id={headingLevel === 'h2' ? 'offer-heading' : undefined}
          className="mt-sm text-xl font-bold text-neutral-900 md:text-2xl"
        >
          {title}
        </Heading>
        <p className="mt-xs max-w-[40rem] text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
      <a href="#book" className={`shrink-0 ${primaryButton}`}>
        Book your free review
        <ArrowRight size={14} aria-hidden />
      </a>
    </div>
  );
}

export default function LandingPage({ variant }: { variant: LpVariant }) {
  const content = getLpPageContent(variant);
  const whatsapp = lpWhatsAppLink(variant);
  const lead = LP_PROOF[variant.proof[0]];
  const year = new Date().getFullYear();

  const pitch = (
    <div className="space-y-md">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
        {variant.eyebrow} · Free 20-minute review
      </p>
      <h1 className="text-balance text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl">
        {variant.headline}
      </h1>
      <p className="max-w-[40rem] text-base leading-relaxed text-neutral-600 md:text-lg">
        {variant.subhead}
      </p>
      <ul className="flex flex-wrap gap-x-lg gap-y-xs pt-xs" aria-label="Ratings and track record">
        {LP_TRUST.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-xs text-xs text-neutral-700 sm:text-sm"
          >
            <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" aria-hidden />
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 underline decoration-neutral-300 underline-offset-2 hover:text-primary"
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const details = (
    <figure className="rounded-xl border border-neutral-200 bg-neutral-50 p-md shadow-sm sm:p-lg">
      <div className="flex flex-wrap items-baseline gap-x-md gap-y-xs">
        <p className="font-mono text-2xl font-black text-primary">{lead.metric}</p>
        <p className="text-sm text-neutral-700">
          <span className="font-semibold text-neutral-900">{lead.metricLabel}</span> · {lead.client}
        </p>
      </div>
      {REVIEW ? (
        <>
          <blockquote className="mt-sm text-sm leading-relaxed text-neutral-700">
            “{LP_SHORT_QUOTE}”
          </blockquote>
          <figcaption className="mt-xs text-xs text-neutral-500">
            {REVIEW.name}, {REVIEW.role}, {REVIEW.company}
            {REVIEW.source ? (
              <>
                {' · '}
                <a
                  href={REVIEW.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 underline underline-offset-2 hover:text-primary"
                >
                  {REVIEW.source.label}
                </a>
              </>
            ) : null}
          </figcaption>
        </>
      ) : null}
    </figure>
  );

  return (
    <>
      <LpWhatsAppTracker />

      {/* The site's navbar bar, without the menu: nothing here leads off the page. */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral-50/90 shadow-xs backdrop-blur-md">
        <div className="site-container flex h-16 items-center justify-between gap-md sm:h-18">
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
          <div className="flex items-center gap-sm">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-10 items-center gap-xs rounded-sm border border-neutral-200 px-md text-xs font-bold uppercase tracking-wider text-neutral-800 transition-colors hover:border-[#25D366] hover:text-neutral-900 sm:inline-flex"
            >
              <MessageCircle size={14} className="text-[#1DA851]" aria-hidden />
              WhatsApp us
            </a>
            <a
              href="#book"
              className="inline-flex min-h-10 items-center whitespace-nowrap rounded-sm bg-primary px-md text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-primary-dark hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="sm:hidden">Free review</span>
              <span className="hidden sm:inline">Book a free review</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        <section className="site-section border-b border-neutral-200 bg-linear-to-b from-neutral-50/80 via-neutral-50/80 to-neutral-100 pt-xl pb-2xl md:pt-2xl">
          <div className="site-container">
            <LpHero
              pitch={pitch}
              details={details}
              offerTitle={content.offer.title}
              formTab={content.jobField.tab}
              jobLabel={content.jobField.label}
              jobPlaceholder={content.jobField.placeholder}
              whatsappHref={whatsapp}
            />
          </div>
        </section>

        <section
          aria-labelledby="proof-heading"
          className="site-section border-b border-neutral-200 py-2xl"
        >
          <div className="site-container">
            <p className={eyebrow}>Our work</p>
            <h2 id="proof-heading" className={`mt-sm ${sectionTitle}`}>
              What it looks like when it’s live
            </h2>
            <p className={sectionIntro}>
              {variant.proofNote ?? 'Results from projects we have built and run.'}
            </p>
            <div className="mt-xl grid grid-cols-1 gap-md md:grid-cols-3">
              {variant.proof.map((id) => (
                <ProofCard key={id} id={id} />
              ))}
            </div>
            {REVIEW ? (
              <figure className="mt-xl rounded-xl border border-neutral-200 bg-neutral-100 p-lg md:p-xl">
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <blockquote className="mt-sm max-w-4xl text-pretty text-base leading-relaxed text-neutral-800 md:text-lg">
                  “{REVIEW.quote}”
                </blockquote>
                <figcaption className="mt-md text-sm text-neutral-600">
                  <span className="font-bold text-neutral-900">{REVIEW.name}</span>, {REVIEW.role},{' '}
                  {REVIEW.company}
                  {REVIEW.source ? (
                    <>
                      {' · '}
                      <a
                        href={REVIEW.source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-primary"
                      >
                        {REVIEW.source.label}
                      </a>
                    </>
                  ) : null}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </section>

        {variant.legalAccounting ? (
          <section
            id="legal-accounting"
            aria-labelledby="legal-heading"
            className="site-section scroll-mt-24 border-b border-neutral-200 bg-neutral-100 py-2xl"
          >
            <div className="site-container">
              <p className={eyebrow}>Law firms and accountants</p>
              <h2 id="legal-heading" className={`mt-sm ${sectionTitle}`}>
                Paperwork and new enquiries, handled on their own
              </h2>
              <p className={sectionIntro}>
                Two jobs that fill a practice’s week: preparing documents and answering new leads
                before they go cold.
              </p>
              <div className="mt-xl grid grid-cols-1 gap-md md:grid-cols-2">
                <ProofCard id="legalatoms" />
                <ProofCard id="bookkeeping" />
              </div>
              <a href="#book" className={`mt-xl ${primaryButton}`}>
                Book a free review for your firm
                <ArrowRight size={14} aria-hidden />
              </a>
            </div>
          </section>
        ) : null}

        {variant.packages.length > 0 ? (
          <section
            id="pricing"
            aria-labelledby="pricing-heading"
            className="site-section scroll-mt-24 border-b border-neutral-200 bg-linear-to-b from-neutral-50 to-neutral-100 py-2xl"
          >
            <div className="site-container">
              <p className={eyebrow}>Fixed-price packages</p>
              <h2 id="pricing-heading" className={`mt-sm ${sectionTitle}`}>
                Fixed prices, agreed up front
              </h2>
              <p className={sectionIntro}>
                No hourly rates. 200+ projects since 2019, Top Rated Plus on Upwork, and 60% fewer
                manual workflows for Cercle. All prices are business prices, + VAT at 20%.
              </p>

              <div id="offer" className="mt-xl scroll-mt-24">
                <OfferCard
                  headingLevel="h3"
                  title={content.offer.cardTitle}
                  description={`${content.offer.description} A founder and a senior engineer join the call, and you get a written plan within two business days.`}
                />
              </div>

              <div
                className={`mt-md grid grid-cols-1 gap-md ${
                  variant.packages.length === 4
                    ? 'sm:grid-cols-2 lg:grid-cols-4'
                    : variant.packages.length === 3
                      ? 'md:grid-cols-3'
                      : 'md:grid-cols-2'
                }`}
              >
                {variant.packages.map((id) => (
                  <PackageCard
                    key={id}
                    pkg={LP_PACKAGES[id]}
                    summary={variant.packageSummaries?.[id]}
                  />
                ))}
              </div>

              <p className="mt-lg text-sm font-semibold text-neutral-800">{LP_PACKAGE_TERMS}</p>
              <p className="mt-xs text-sm text-neutral-600">
                Larger or custom projects: quoted after the review. Work outside a package is quoted
                in writing first.
              </p>
            </div>
          </section>
        ) : (
          <section
            id="offer"
            aria-labelledby="offer-heading"
            className="site-section scroll-mt-24 border-b border-neutral-200 bg-linear-to-b from-neutral-50 to-neutral-100 py-2xl"
          >
            <div className="site-container">
              <OfferCard
                headingLevel="h2"
                title={content.offer.cardTitle}
                description={`${content.offer.description} A founder and a senior engineer join the call. After it you get a written plan within two business days, and a fixed price agreed up front.`}
              />
            </div>
          </section>
        )}

        <section
          aria-labelledby="steps-heading"
          className="site-section border-b border-neutral-200 bg-neutral-100 py-2xl"
        >
          <div className="site-container">
            <h2 id="steps-heading" className={sectionTitle}>
              How it works
            </h2>
            <p className={sectionIntro}>Three steps from the first call to working software.</p>
            <ol className="mt-xl grid grid-cols-1 gap-md md:grid-cols-3">
              {content.steps.map((step) => (
                <li
                  key={step.title}
                  className="h-full rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm"
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {step.phase}
                  </p>
                  <h3 className="mt-sm text-lg font-bold text-neutral-900">{step.title}</h3>
                  <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="site-section py-2xl">
          <div className="site-container max-w-3xl">
            <h2
              id="faq-heading"
              className="text-balance text-2xl font-bold tracking-tight text-neutral-900"
            >
              Questions people ask first
            </h2>
            <p className="mt-sm mb-xl text-sm leading-relaxed text-neutral-600">
              Straight answers before you book.
            </p>
            <FaqAccordion items={content.faqs} />
          </div>
        </section>

        {/* The site's closing call to action, with WhatsApp as the second choice. */}
        <section className="site-section border-t border-neutral-200 bg-neutral-100 py-2xl">
          <div className="site-container flex flex-col items-start justify-between gap-lg md:flex-row md:items-center">
            <div className="max-w-3xl space-y-sm">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
                {content.closing.title}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                {content.closing.description}
              </p>
            </div>
            <div className="flex w-full flex-col gap-sm sm:w-auto sm:flex-row">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto ${whatsappButton}`}
              >
                <MessageCircle size={16} className="text-[#1DA851]" aria-hidden />
                WhatsApp us
              </a>
              <a href="#book" className={`w-full sm:w-auto ${primaryButton}`}>
                Book your free review
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-section relative z-10 border-t-2 border-primary bg-neutral-50">
        <div className="site-container flex flex-col gap-md py-xl pb-24 sm:flex-row sm:items-end sm:justify-between sm:pb-xl">
          <div className="space-y-xs text-center sm:text-left">
            <p className="text-sm text-neutral-600">
              © {year} {SITE_NAME} ·{' '}
              <a href={SITE_EMAIL_HREF} className="text-neutral-700 hover:text-primary">
                {SITE_EMAIL}
              </a>
            </p>
            {/* UK law asks a company's website to show these details. */}
            <p className="text-xs text-neutral-600">
              {UK_COMPANY_NAME} is registered in England and Wales, company number{' '}
              {UK_COMPANY_NUMBER}. Registered office: {UK_OFFICE_ADDRESS}.
            </p>
          </div>
          <nav
            aria-label="Legal"
            className="flex shrink-0 items-center justify-center gap-lg whitespace-nowrap text-sm text-neutral-600"
          >
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms
            </Link>
            <CookieSettingsButton className="cursor-pointer transition-colors hover:text-primary" />
          </nav>
        </div>
      </footer>

      {/* Phones: WhatsApp stays one tap away while scrolling. */}
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        className="fixed right-md bottom-md z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1DA851] text-white shadow-lg transition-colors hover:bg-[#178F44] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:hidden"
      >
        <MessageCircle size={26} aria-hidden />
      </a>
    </>
  );
}
