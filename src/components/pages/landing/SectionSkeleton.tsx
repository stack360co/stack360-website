import { cn } from '@/styles/tailwind.utils';

type SkeletonVariant = 'default' | 'tall' | 'carousel' | 'compact';

const HEIGHT: Record<SkeletonVariant, string> = {
  default: 'min-h-[28rem]',
  tall: 'min-h-[36rem]',
  carousel: 'min-h-[32rem]',
  compact: 'min-h-[16rem]',
};

export default function SectionSkeleton({
  variant = 'default',
  className,
}: {
  variant?: SkeletonVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'site-section w-full animate-pulse bg-neutral-100 py-2xl',
        HEIGHT[variant],
        className
      )}
    >
      <div className="site-container space-y-lg">
        <div className="h-3 w-24 rounded-sm bg-neutral-200" />
        <div className="h-10 max-w-[42rem] rounded-sm bg-neutral-200" />
        <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-48 rounded-lg bg-neutral-200/80" />
          ))}
        </div>
      </div>
    </div>
  );
}
