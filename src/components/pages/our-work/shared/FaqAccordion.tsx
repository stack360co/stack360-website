'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

/**
 * All answers stay in the DOM (CSS collapse) so crawlers and no-JS users
 * see full FAQ content. Open state only controls visual expansion.
 * CSS does the animation, so the ads landing pages that use this don't load the motion library.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div key={item.id} className="py-md">
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-start justify-between gap-md rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="text-base font-bold tracking-tight text-neutral-900">
                {item.question}
              </span>
              <span
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  open
                    ? 'rotate-180 border-primary/30 bg-primary/5 text-primary'
                    : 'border-neutral-200 text-neutral-600'
                }`}
              >
                <ChevronDown size={16} aria-hidden />
              </span>
            </button>

            <section
              id={panelId}
              aria-labelledby={buttonId}
              data-open={open ? 'true' : 'false'}
              className={`faq-panel grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pt-md pb-sm text-pretty text-sm leading-relaxed text-neutral-600">
                  {item.answer}
                </p>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
