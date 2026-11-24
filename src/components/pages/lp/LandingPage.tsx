import { ArrowRight, Check, MessageCircle, Quote, ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/analytics/ConsentBanner';
import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import {
  formatPrice,
  getLpPageContent,
  isLpPlan,
  LP_ACCOUNTANTS,
  LP_GUARANTEE,
  LP_LUXE_CASE,
  LP_PACKAGE_TERMS,
  LP_PACKAGES,
  LP_PROOF,
  LP_REVIEWS,
  LP_SECTORS,
  LP_SHORT_QUOTE,
  LP_TRUST,
  type LpPackage,
  type LpPackageId,
  type LpProofId,
  type LpReview,
  type LpSectorId,
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

const caseLabel = 'font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500';

/** Mitchell's G2 review: shortened on the first screen of every page. */
const REVIEW = LP_REVIEWS.mitchell;

function ReviewCaption({ review }: { review: LpReview }) {
  return (
    <>
      <span className="font-bold text-neutral-900">{review.name}</span>, {review.role},{' '}
      {review.company}
      {review.source ? (
        <>
          {' · '}
          <a
            href={review.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-primary"
          >
            {review.source.label}
          </a>
        </>
      ) : null}
    </>
  );
}

function ReviewFigure({ review }: { review: LpReview }) {
  return (
    <figure className="mt-xl rounded-xl border border-neutral-200 bg-neutral-100 p-lg md:p-xl">
      <Quote className="h-6 w-6 text-primary" aria-hidden />
      <blockquote className="mt-sm max-w-4xl text-pretty text-base leading-relaxed text-neutral-800 md:text-lg">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-md text-sm text-neutral-600">
        <ReviewCaption review={review} />
      </figcaption>
    </figure>
  );
}

/** The Luxe case study (#luxe): Google Ads sitelinks may point straight at the id, so keep it. */
function LuxeCaseStudy({ version }: { version: 'automation' | 'google' }) {
  const built = version === 'google' ? LP_LUXE_CASE.builtGoogle : LP_LUXE_CASE.built;
  return (
    <article
      id="luxe"
      aria-labelledby="luxe-heading"
      className="mt-xl scroll-mt-24 rounded-xl border border-neutral-200 bg-neutral-100 p-lg md:p-xl"
    >
      <p className={eyebrow}>{LP_LUXE_CASE.eyebrow}</p>
      <h3
        id="luxe-heading"
        className="mt-sm max-w-3xl text-balance text-xl font-bold tracking-tight text-neutral-900 md:text-2xl"
      >
        {LP_LUXE_CASE.title}
      </h3>
      <div className="mt-lg grid grid-cols-1 gap-lg lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-xl">
        <div>
          <h4 className={caseLabel}>The problem</h4>
          <ul className="mt-sm space-y-sm">
            {LP_LUXE_CASE.problem.map((item) => (
              <li
                key={item}
                className="flex items-start gap-sm text-sm leading-relaxed text-neutral-700"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={caseLabel}>What we built</h4>
          <ul className="mt-sm space-y-md">
            {built.map((item) => (
              <li key={item.title} className="text-sm leading-relaxed text-neutral-700">
                <p className="font-bold text-neutral-900">{item.title}</p>
                <p className="mt-1">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={caseLabel}>The result</h4>
          <ul className="mt-sm space-y-sm">
            {LP_LUXE_CASE.result.map((item) => (
              <li
                key={item}
                className="flex items-start gap-sm text-sm leading-relaxed text-neutral-800"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-md rounded-lg border border-neutral-200 bg-neutral-50 p-sm text-sm font-semibold leading-relaxed text-neutral-900">
            {LP_LUXE_CASE.timeAndCost}
          </p>
        </div>
      </div>
      <figure className="mt-xl border-t border-neutral-200 pt-lg">
        <Quote className="h-6 w-6 text-primary" aria-hidden />
        <blockquote className="mt-sm max-w-4xl text-pretty text-base leading-relaxed text-neutral-800">
          “{LP_REVIEWS.mitchell.quote}”
        </blockquote>
        <figcaption className="mt-md text-sm text-neutral-600">
          <ReviewCaption review={LP_REVIEWS.mitchell} />
        </figcaption>
      </figure>
    </article>
  );
}

/** One strip under the pricing cards. The terms sit right under the promise (UK ad rules). */
function GuaranteeStrip({ showSecondHalf }: { showSecondHalf: boolean }) {
  return (
    <div
      id="guarantee"
      className="mt-lg grid scroll-mt-24 grid-cols-1 gap-lg rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm md:p-xl lg:grid-cols-[1.6fr_1fr] lg:gap-xl"
    >
      <div className="flex items-start gap-md">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden />
        <div>
          <h3 className="text-lg font-bold text-neutral-900">{LP_GUARANTEE.title}</h3>
          <p className="mt-xs max-w-3xl text-pretty text-sm leading-relaxed text-neutral-800 md:text-base">
            {LP_GUARANTEE.line}
            {showSecondHalf ? ` ${LP_GUARANTEE.secondHalf}` : null}
          </p>
          <p id="guarantee-terms" className="mt-md scroll-mt-24 text-xs font-bold text-neutral-700">
            Terms
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-md text-xs leading-relaxed text-neutral-600 marker:text-neutral-400">
            {LP_GUARANTEE.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </div>
      <figure className="border-neutral-200 lg:border-l lg:pl-xl">
        <Quote className="h-5 w-5 text-primary" aria-hidden />
        <blockquote className="mt-xs text-pretty text-base leading-relaxed text-neutral-800">
          “{LP_REVIEWS.bilel.quote}”
        </blockquote>
        <figcaption className="mt-sm text-xs text-neutral-600">
          <ReviewCaption review={LP_REVIEWS.bilel} />
        </figcaption>
      </figure>
    </div>
  );
}

/** One trade's section (#lettings, #vets): cold emails link straight to the id, so keep it. */
function SectorSection({ id, tinted }: { id: LpSectorId; tinted: boolean }) {
  const sector = LP_SECTORS[id];
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`site-section scroll-mt-24 border-b border-neutral-200 py-2xl ${tinted ? 'bg-neutral-100' : ''}`}
    >
      <div className="site-container">
        <p className={eyebrow}>{sector.eyebrow}</p>
        <h2 id={`${id}-heading`} className={`mt-sm ${sectionTitle}`}>
          {sector.title}
        </h2>
        <p className="mt-sm max-w-3xl text-pretty text-sm leading-relaxed text-neutral-700 md:text-base">
          {sector.intro}
        </p>
        <div className="mt-xl grid grid-cols-1 gap-md lg:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm md:p-xl">
            <h3 className="text-lg font-bold text-neutral-900">{sector.changesTitle}</h3>
            <dl className="mt-sm divide-y divide-neutral-200 text-sm">
              {sector.changes.map((row) =>
                typeof row.detail === 'string' ? (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-y-0.5 py-sm sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-md"
                  >
                    <dt className="font-semibold text-neutral-900">{row.label}</dt>
                    <dd className="text-neutral-700">{row.detail}</dd>
                  </div>
                ) : (
                  <div key={row.label} className="py-sm">
                    <dt className="font-semibold text-neutral-900">{row.label}</dt>
                    <dd>
                      <ul className="mt-xs list-disc space-y-1 pl-md leading-relaxed text-neutral-700 marker:text-neutral-400">
                        {row.detail.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )
              )}
            </dl>
            <p className="mt-md text-xs leading-relaxed text-neutral-600">
              {sector.sources.length > 1 ? 'Sources: ' : 'Source: '}
              {sector.sources.map((source, index) => (
                <span key={source.href}>
                  {index > 0 ? '; ' : null}
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
          <div className="flex flex-col rounded-xl border-2 border-primary/40 bg-neutral-50 p-lg shadow-sm md:p-xl">
            <h3 className="text-lg font-bold text-neutral-900">{sector.buildTitle}</h3>
            <ul className="mt-md space-y-sm">
              {sector.build.map((item) => (
                <li key={item} className="flex items-start gap-sm text-sm text-neutral-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-md text-sm leading-relaxed text-neutral-600">{sector.note}</p>
            <p className="mt-lg text-sm font-semibold leading-relaxed text-neutral-900">
              {sector.price} Start with a free 20-minute review.
            </p>
            <a href="#book" className={`mt-lg self-start ${primaryButton}`}>
              Book your free review
              <ArrowRight size={14} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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

/** Cards sit on a 6-column grid: 3 builds sit above the 2 plans, otherwise rows are shared evenly. */
function packageSpan(ids: readonly LpPackageId[], id: LpPackageId) {
  const builds = ids.filter((pkgId) => !isLpPlan(pkgId)).length;
  return builds === 2 || (builds === 3 && isLpPlan(id)) ? 'lg:col-span-3' : 'lg:col-span-2';
}

function PackageCard({
  pkg,
  summary,
  className = '',
}: {
  pkg: LpPackage;
  summary?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm ${className}`}
    >
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
  const heroReview = variant.heroReview ? LP_REVIEWS[variant.heroReview] : REVIEW;
  const year = new Date().getFullYear();

  const pitch = (
    <div className="space-y-md">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
        {variant.eyebrow} · Free 20-minute review
      </p>
      <h1 className="text-balance text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl">
        {variant.h1}
      </h1>
      <p className="text-balance text-xl font-bold leading-snug text-neutral-800 md:text-2xl">
        {variant.headline}
      </p>
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
      <blockquote className="mt-sm text-sm leading-relaxed text-neutral-700">
        “{variant.heroReview ? heroReview.quote : LP_SHORT_QUOTE}”
      </blockquote>
      <figcaption className="mt-xs text-xs text-neutral-500">
        {heroReview.name}, {heroReview.role}, {heroReview.company}
        {heroReview.source ? (
          <>
            {' · '}
            <a
              href={heroReview.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 underline underline-offset-2 hover:text-primary"
            >
              {heroReview.source.label}
            </a>
          </>
        ) : null}
      </figcaption>
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
            {/* The case study carries Mitchell's full review; other pages show one quote. */}
            {variant.caseStudy ? (
              <LuxeCaseStudy version={variant.caseStudy} />
            ) : (
              <ReviewFigure review={LP_REVIEWS[variant.proofReview ?? 'mitchell']} />
            )}
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

              {/* UK cold emails to accountancy practices link straight here: keep the id. */}
              <div
                id="accountants"
                className="mt-xl scroll-mt-24 rounded-xl border-2 border-primary/40 bg-neutral-50 p-lg shadow-sm md:p-xl"
              >
                <p className={eyebrow}>{LP_ACCOUNTANTS.title}</p>
                <h3 className="mt-sm text-balance text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
                  {LP_ACCOUNTANTS.pain}
                </h3>
                <p className="mt-sm max-w-3xl text-pretty text-sm leading-relaxed text-neutral-700">
                  {LP_ACCOUNTANTS.mtd}{' '}
                  <a
                    href={LP_ACCOUNTANTS.mtdSource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 underline underline-offset-2 hover:text-primary"
                  >
                    Source: {LP_ACCOUNTANTS.mtdSource.label}
                  </a>
                </p>
                <p className="mt-sm max-w-3xl text-pretty text-sm leading-relaxed text-neutral-700">
                  {LP_ACCOUNTANTS.automate}
                </p>
                <ul className="mt-md max-w-3xl space-y-sm">
                  {LP_ACCOUNTANTS.proof.map((item) => (
                    <li key={item} className="flex items-start gap-sm text-sm text-neutral-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <figure className="mt-lg max-w-3xl border-l-2 border-primary/50 pl-md">
                  <blockquote className="text-pretty text-sm leading-relaxed text-neutral-800 md:text-base">
                    “{LP_REVIEWS.ernest.quote}”
                  </blockquote>
                  <figcaption className="mt-xs text-xs text-neutral-600">
                    <ReviewCaption review={LP_REVIEWS.ernest} />
                  </figcaption>
                </figure>
                <p className="mt-lg text-sm font-semibold text-neutral-900">
                  Single automation from {formatPrice(LP_PACKAGES.single.price)} + VAT at 20%, or 3
                  workflows from {formatPrice(LP_PACKAGES.pack.price)} + VAT at 20%. Start with a
                  free 20-minute review.
                </p>
                {/* The accounting ads' own page. A plain link, so Next doesn't prefetch it. */}
                <a
                  href="/lp/accounting-automation"
                  className="mt-sm inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
                >
                  More on what we automate for accountancy practices
                  <ArrowRight size={14} aria-hidden />
                </a>
              </div>

              <a href="#book" className={`mt-xl ${primaryButton}`}>
                Book a free review for your firm
                <ArrowRight size={14} aria-hidden />
              </a>
            </div>
          </section>
        ) : null}

        {/* Alternating backgrounds: the law firms section, when shown, is already tinted. */}
        {variant.sectors?.map((id, index) => (
          <SectorSection
            key={id}
            id={id}
            tinted={(index + (variant.legalAccounting ? 1 : 0)) % 2 === 0}
          />
        ))}

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

              <div className="mt-md grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-6">
                {variant.packages.map((id) => (
                  <PackageCard
                    key={id}
                    pkg={LP_PACKAGES[id]}
                    summary={variant.packageSummaries?.[id]}
                    className={packageSpan(variant.packages, id)}
                  />
                ))}
              </div>

              {/* The "second half on go-live" line only where a 50/50 package is on the page. */}
              <GuaranteeStrip
                showSecondHalf={variant.packages.some((id) => id === 'pack' || id === 'presence')}
              />

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
