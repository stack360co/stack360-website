import FaqAccordion from '@/components/pages/our-work/shared/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import { FAQS, FAQS_CTA, FAQS_HERO } from '@/constants/component/our-work-faqs-data';
import { seo } from '@/constants/seo';
import { pageJsonLdFromMeta } from '@/lib/seo/json-ld';

export default function FaqsPage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd data={pageJsonLdFromMeta(seo.ourWorkFaqs, { faqs: FAQS })} />
      <PageHero {...FAQS_HERO} />
      <MotionSection className="py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStagger className="space-y-md lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            <MotionStaggerItem>
              <h2 className="text-2xl font-black tracking-tight text-neutral-900">
                Answers before the call
              </h2>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                Sourced from how we work with clients on web, mobile, design, marketing, and quality
                — so expectations stay clear.
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          <div className="lg:col-span-8">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </MotionSection>
      <PageClosingCta {...FAQS_CTA} />
    </div>
  );
}
