import FloatingObject from '@/components/shared/FloatingObjects';

const STAT_CARD =
  'rounded-md border border-neutral-200 bg-neutral-50/90 px-sm py-xs text-right shadow-sm backdrop-blur-sm';

export default function RetentionRate() {
  return (
    <FloatingObject
      className="right-0 top-[9%]"
      floatY={[0, -6, 0]}
      floatDuration={5.3}
      contentClassName={`-rotate-1 ${STAT_CARD}`}
    >
      <p className="text-xl font-bold leading-none text-primary">30 mo</p>
      <p className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-500">
        Longest engagements
      </p>
    </FloatingObject>
  );
}
