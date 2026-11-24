'use client';

import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import MotionCard from '@/components/shared/motion/MotionCard';
import { EASE_OUT_EXPO, viewport } from '@/components/shared/motion/variants';

export interface IndustryCard {
  name: string;
  icon: ReactNode;
  painPoints: readonly string[];
  solution: string;
  result: string;
  /** A page with more for this industry. */
  link?: { label: string; href: string };
}

interface IndustryGridProps {
  industries: readonly IndustryCard[];
}

export default function IndustryGrid({ industries }: IndustryGridProps) {
  const reduced = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
      {industries.map((industry, index) => (
        <motion.article
          key={industry.name}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={reduced ? undefined : viewport}
          transition={{ duration: 0.48, delay: index * 0.04, ease: EASE_OUT_EXPO }}
        >
          <MotionCard className="rounded-xl border border-neutral-200 bg-neutral-50 p-lg">
            <div className="flex items-center gap-md">
              <motion.div
                whileHover={reduced ? undefined : { rotate: 4, scale: 1.05 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary"
              >
                {industry.icon}
              </motion.div>
              <h3 className="text-lg font-bold tracking-tight text-neutral-900">{industry.name}</h3>
            </div>

            <div className="mt-lg space-y-md">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Pain points
                </p>
                <ul className="mt-sm space-y-xs text-sm leading-relaxed text-neutral-600">
                  {industry.painPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Our approach
                </p>
                <p className="mt-sm text-sm leading-relaxed text-neutral-600">
                  {industry.solution}
                </p>
              </div>

              <motion.p
                whileHover={reduced ? undefined : { scale: 1.01 }}
                className="rounded-md bg-primary/5 px-md py-sm font-mono text-xs font-bold text-primary"
              >
                {industry.result}
              </motion.p>

              {'link' in industry && industry.link ? (
                <Link
                  href={industry.link.href}
                  className="inline-flex items-center gap-xs text-sm font-bold text-primary hover:text-primary-dark"
                >
                  {industry.link.label}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              ) : null}
            </div>
          </MotionCard>
        </motion.article>
      ))}
    </div>
  );
}
