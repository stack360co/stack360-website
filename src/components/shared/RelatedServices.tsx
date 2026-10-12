import Link from 'next/link';
import BrandIcon from '@/components/shared/BrandIcon';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import {
  CAPABILITY_ICONS,
  CAPABILITY_SERVICE_NAMES,
  type CapabilitySlug,
} from '@/constants/component/what-we-build-data';

interface RelatedServicesProps {
  title: string;
  intro: string;
  services: readonly CapabilitySlug[];
  /** One article that goes deeper on the page's topic. */
  reading?: { href: string; label: string };
}

/** Links to the service pages a page talks about, in the same chip style as the hire links. */
export default function RelatedServices({ title, intro, services, reading }: RelatedServicesProps) {
  return (
    <MotionSection className="border-b border-neutral-200 py-2xl">
      <div className="site-container">
        <MotionStagger className="mb-lg max-w-3xl">
          <MotionStaggerItem>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900">
              {title}
            </h2>
          </MotionStaggerItem>
          <MotionStaggerItem>
            <p className="mt-sm text-sm leading-relaxed text-neutral-600">{intro}</p>
          </MotionStaggerItem>
        </MotionStagger>
        <ul className="flex flex-wrap gap-sm">
          {services.map((slug) => (
            <li key={slug}>
              <Link
                href={`/what-we-build/${slug}`}
                className="inline-flex items-center gap-sm rounded-md border border-neutral-200 bg-neutral-50 px-md py-sm text-sm font-semibold text-neutral-800 transition-colors hover:border-primary/30 hover:text-primary"
              >
                <BrandIcon slug={CAPABILITY_ICONS[slug]} size={16} variant="service" />
                {CAPABILITY_SERVICE_NAMES[slug]}
              </Link>
            </li>
          ))}
        </ul>
        {reading ? (
          <p className="mt-lg text-sm text-neutral-600">
            Further reading:{' '}
            <Link
              href={reading.href}
              className="font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {reading.label}
            </Link>
          </p>
        ) : null}
      </div>
    </MotionSection>
  );
}
