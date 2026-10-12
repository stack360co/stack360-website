import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import MotionCard from '@/components/shared/motion/MotionCard';
import MotionSection from '@/components/shared/motion/MotionSection';
import { MotionStagger, MotionStaggerItem } from '@/components/shared/motion/MotionStagger';
import type { HireInfoItem } from '@/constants/component/hire-talent-data';

interface HireInfoSectionProps {
  title: string;
  intro?: string;
  items: readonly HireInfoItem[];
  /** Number the cards "Step 1, Step 2…" for process sections. */
  steps?: boolean;
  columns?: 2 | 3 | 4;
  tinted?: boolean;
}

const GRID = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

/** Card section for the hiring pages, in the same style as the hire-by-technology steps. */
export default function HireInfoSection({
  title,
  intro,
  items,
  steps = false,
  columns = 3,
  tinted = false,
}: HireInfoSectionProps) {
  return (
    <MotionSection
      className={`border-b border-neutral-200 py-2xl ${tinted ? 'bg-neutral-100' : ''}`}
    >
      <div className="site-container">
        <MotionStagger className="mb-xl max-w-3xl">
          <MotionStaggerItem>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {title}
            </h2>
          </MotionStaggerItem>
          {intro ? (
            <MotionStaggerItem>
              <p className="mt-sm text-pretty text-sm leading-relaxed text-neutral-600">{intro}</p>
            </MotionStaggerItem>
          ) : null}
        </MotionStagger>

        <MotionStagger className={`grid grid-cols-1 gap-md ${GRID[columns]}`}>
          {items.map((item, index) => (
            <MotionStaggerItem key={item.title}>
              <MotionCard className="flex h-full flex-col rounded-xl border border-neutral-200 bg-neutral-50 p-lg shadow-sm">
                {steps ? (
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Step {index + 1}
                  </p>
                ) : null}
                <h3 className={`${steps ? 'mt-sm ' : ''}text-lg font-bold text-neutral-900`}>
                  {item.title}
                </h3>
                <p className="mt-sm flex-1 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-md inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
                  >
                    {item.linkLabel ?? 'Learn more'}
                    <span className="sr-only">: {item.title}</span>
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                ) : null}
              </MotionCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
