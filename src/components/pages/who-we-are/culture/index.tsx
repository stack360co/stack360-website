import Image from 'next/image';
import MasonryGallery from '@/components/pages/who-we-are/shared/MasonryGallery';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import PageClosingCta from '@/components/shared/PageClosingCta';
import PageHero from '@/components/shared/PageHero';
import {
  // CULTURE_COLLAGE_PHOTOS,
  CULTURE_CTA,
  CULTURE_FOUNDER,
  CULTURE_GOAL,
  CULTURE_HERO,
  CULTURE_OFFICE_PHOTOS,
} from '@/constants/component/who-we-are-culture-data';

export default function CulturePage() {
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={CULTURE_HERO.eyebrow}
        title={CULTURE_HERO.title}
        highlight={CULTURE_HERO.highlight}
        description={CULTURE_HERO.description}
      />

      <MotionSection className="py-2xl">
        <div className="site-container grid grid-cols-1 gap-2xl lg:grid-cols-12">
          <MotionStaggerItem className="lg:col-span-5">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              {CULTURE_GOAL.title}
            </h2>
          </MotionStaggerItem>
          <MotionStagger className="space-y-md lg:col-span-7">
            {CULTURE_GOAL.paragraphs.map((paragraph) => (
              <MotionStaggerItem key={paragraph.slice(0, 40)}>
                <p className="text-sm leading-relaxed text-neutral-600">{paragraph}</p>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </MotionSection>

      {/* <MotionSection className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
        <div className="site-container space-y-xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Life at Stack360
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                Retreats, studio days, and the people who make the work feel like a team — not a org
                chart.
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MasonryGallery photos={CULTURE_COLLAGE_PHOTOS} />
        </div>
      </MotionSection> */}

      <MotionSection className="py-2xl border-t border-neutral-200 bg-neutral-100/50">
        <div className="site-container space-y-xl">
          <MotionStagger className="max-w-3xl space-y-sm">
            <MotionStaggerItem>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Where the work actually happens
              </h2>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="text-sm leading-relaxed text-neutral-600">
                Engineering halls, review rooms, and spaces to recharge — the environment behind the
                delivery discipline we bring to every client engagement.
              </p>
            </MotionStaggerItem>
          </MotionStagger>
          <MasonryGallery photos={CULTURE_OFFICE_PHOTOS} />
        </div>
      </MotionSection>

      <MotionSection className="py-2xl">
        <div id="azmat-rana" className="site-container scroll-mt-24">
          <MotionCard
            interactive={false}
            className="grid grid-cols-1 items-center gap-2xl rounded-xl border border-neutral-200 bg-neutral-50 p-xl lg:grid-cols-12"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-neutral-200 lg:col-span-4">
              <Image
                src={CULTURE_FOUNDER.image.src}
                alt={CULTURE_FOUNDER.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                {CULTURE_FOUNDER.role}
              </span>
              <h3 className="mt-sm text-2xl font-bold tracking-tight text-neutral-900">
                {CULTURE_FOUNDER.name}
              </h3>
              <blockquote className="mt-lg rounded-lg bg-neutral-100/80 p-lg text-base leading-relaxed text-neutral-700">
                “{CULTURE_FOUNDER.quote}”
              </blockquote>
            </div>
          </MotionCard>
        </div>
      </MotionSection>

      <PageClosingCta {...CULTURE_CTA} />
    </div>
  );
}
