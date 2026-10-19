import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/analytics/ConsentBanner';
import {
  COMPANY_LINKS,
  CONTACT,
  type FooterLink,
  OFFICES,
  SERVICE_LINKS,
  SOCIAL_LINKS,
} from '@/constants/component/footer';
import { SITE_NAME, SITE_PROFILES } from '@/constants/site';
import { cn } from '@/styles/tailwind.utils';
import Stack360Logo from './Navbar/Stack360Logo';

function FooterLinkColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <div className={cn('md:space-y-lg space-y-xs', className)}>
      <h2 className="text-base font-bold tracking-tight text-neutral-900">{title}</h2>
      <ul className="md:space-y-md space-y-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-section border-t-2 border-primary bg-neutral-50">
      <div className="site-container py-2xl">
        <div className="grid grid-cols-1 gap-2xl sm:grid-cols-2 lg:grid-cols-12 lg:gap-xl">
          <div className="space-y-lg lg:col-span-4">
            <Stack360Logo animateWordmark={false} />
            <p className="max-w-content text-pretty text-sm leading-relaxed text-neutral-600">
              Stack360 is a software development company with its team in Lahore. Since 2019 we have
              built software and placed dedicated developers for companies in the US and UK.
            </p>

            <div className="space-y-xl">
              {OFFICES.map((office) => (
                <div key={office.label} className="space-y-xs">
                  <div className="flex items-center gap-xs">
                    <Image
                      src={`https://flagcdn.com/w40/${office.flag}.png`}
                      alt={`${office.label} flag`}
                      width={20}
                      height={14}
                      className="h-3.5 w-5 rounded-xs object-cover shadow-xs"
                    />
                    <p className="font-bold text-neutral-900 text-sm ml-1">
                      {office.href ? (
                        <Link href={office.href} className="transition-colors hover:text-primary">
                          {office.label}
                        </Link>
                      ) : (
                        office.label
                      )}
                      :
                    </p>
                  </div>

                  <div className="flex gap-sm pl-6">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                    <div className="text-sm leading-relaxed text-neutral-600">
                      {office.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="pl-6 pt-xs space-y-1">
                    {office.phones.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        target={phone.external ? '_blank' : undefined}
                        rel={phone.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-sm text-sm text-neutral-700 transition-colors hover:text-primary"
                      >
                        <Phone size={14} className="shrink-0 text-primary" aria-hidden />
                        <span>{phone.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FooterLinkColumn title="Services" links={SERVICE_LINKS} className="lg:col-span-3" />
          <FooterLinkColumn title="Company" links={COMPANY_LINKS} className="lg:col-span-3" />

          <div className="space-y-xl lg:col-span-2">
            <div className="md:space-y-lg space-y-sm">
              <h2 className="text-base font-bold tracking-tight text-neutral-900">Follow us</h2>
              <div className="flex items-center gap-md">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="z-1 flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-900 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:space-y-md space-y-xs border-t border-neutral-200 pt-lg">
              <h2 className="text-base font-bold tracking-tight text-neutral-900">Email</h2>
              <a
                href={CONTACT.email.href}
                className="flex items-center gap-sm text-sm text-neutral-700 transition-colors hover:text-primary"
              >
                <Mail size={16} className="shrink-0 text-primary" aria-hidden />
                {CONTACT.email.label}
              </a>
            </div>

            <div className="md:space-y-md space-y-xs border-t border-neutral-200 pt-lg">
              <h2 className="text-base font-bold tracking-tight text-neutral-900">Find us on</h2>
              <a
                href={SITE_PROFILES.goodfirms}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-opacity hover:opacity-80"
              >
                {/* GoodFirms' hosted badge, embedded as they provide it */}
                <Image
                  src="https://assets.goodfirms.co/badges/available-on-goodfirms.png"
                  alt="Available on GoodFirms"
                  width={160}
                  height={48}
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-2xl flex flex-col items-center gap-sm border-t border-neutral-200 pt-xl sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-neutral-600">
            © {currentYear} {SITE_NAME}. All Rights Reserved
          </p>
          <nav
            aria-label="Legal"
            className="flex items-center gap-lg text-sm text-neutral-600 sm:pr-[9rem]"
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
      </div>
    </footer>
  );
}
