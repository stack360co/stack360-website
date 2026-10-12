'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  dropdownPanel,
  fadeUp,
  motionVariants,
  staggerContainer,
} from '@/components/shared/motion/variants';
import type { NavSection } from '@/constants/component/navigation';
import { cn } from '@/styles/tailwind.utils';
import { isPathActive } from '@/utils/url';

interface NavItemDesktopProps {
  item: NavSection;
  isDropdownOpen: boolean;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onToggleDropdown: (label: string) => void;
  onCloseDropdown: () => void;
}

export default function NavItemDesktop({
  item,
  isDropdownOpen,
  onMouseEnter,
  onMouseLeave,
  onToggleDropdown,
  onCloseDropdown,
}: NavItemDesktopProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const hasActiveSubItem = item.columns?.some((col) =>
    col.items.some((subItem) => isPathActive(pathname, subItem.href))
  );
  const isItemSelected = isPathActive(pathname, item.href) || Boolean(hasActiveSubItem);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelShift, setPanelShift] = useState(0);

  // The panel is centred under its trigger, which pushes the outer menus past the
  // screen edge on laptop widths. Nudge it back inside a 16px gutter.
  useEffect(() => {
    const panel = panelRef.current;
    const anchor = panel?.parentElement;
    if (!panel || !anchor) {
      return;
    }
    const place = () => {
      const gutter = 16;
      const viewport = document.documentElement.clientWidth;
      const trigger = anchor.getBoundingClientRect();
      const left = trigger.left + trigger.width / 2 - panel.offsetWidth / 2;
      const right = left + panel.offsetWidth;
      if (left < gutter) {
        setPanelShift(gutter - left);
      } else if (right > viewport - gutter) {
        setPanelShift(viewport - gutter - right);
      } else {
        setPanelShift(0);
      }
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, []);

  if (item.type === 'link') {
    return (
      <div className="relative flex h-full items-center">
        <Link
          href={item.href ?? '/'}
          className={cn(
            'relative inline-flex items-center rounded-md px-sm py-xs text-sm font-semibold transition-all duration-200 lg:px-md',
            isItemSelected ? 'text-primary' : 'text-neutral-700 hover:text-neutral-950'
          )}
        >
          {isItemSelected && (
            <motion.span
              layoutId="nav-active-bg"
              className="absolute inset-0 rounded-md bg-primary/10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </Link>
      </div>
    );
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover-driven desktop dropdown
    <div
      className="relative flex h-full items-center"
      onMouseEnter={() => onMouseEnter(item.label)}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        onClick={() => onToggleDropdown(item.label)}
        className={cn(
          'group/nav relative inline-flex h-9 items-center gap-xs rounded-md px-sm py-xs text-sm font-semibold transition-colors duration-200 lg:px-md hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          isDropdownOpen || isItemSelected
            ? 'text-primary'
            : 'text-neutral-700 hover:text-neutral-950'
        )}
      >
        {isItemSelected && !isDropdownOpen && (
          <motion.span
            layoutId="nav-active-bg"
            className="absolute inset-0 rounded-md bg-primary/10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className="relative z-10">{item.label}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={2.25}
          className={cn(
            'relative z-10 size-3.5 shrink-0 transition-all duration-300 ease-out',
            isDropdownOpen
              ? 'rotate-180 text-primary'
              : 'text-neutral-400 group-hover/nav:text-neutral-700'
          )}
        />
      </button>

      {isDropdownOpen && (
        <motion.span
          layoutId="dropdown-arrow"
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-xs -translate-x-1/2 -translate-y-[calc(100%-1px)]"
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            className="block overflow-visible"
            aria-hidden="true"
          >
            <path d="M0 9 L8 0.5 L16 9 Z" fill="#f6f0ed" />
            <path
              d="M0.75 8.25 L8 1.25 L15.25 8.25"
              className="stroke-neutral-300"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}

      {/* Always in the DOM so the sub-page links are in the server HTML for crawlers;
          closed panels are invisible and inert, so they can't be clicked or tabbed into. */}
      {item.columns && (
        <motion.div
          ref={panelRef}
          variants={motionVariants(reduced, dropdownPanel)}
          initial={false}
          animate={isDropdownOpen ? 'show' : 'exit'}
          inert={!isDropdownOpen}
          style={{ marginLeft: panelShift }}
          className={cn(
            'absolute left-1/2 top-full z-40 -translate-x-1/2 pt-xs transition-[visibility]',
            item.columns.length > 2
              ? 'w-[min(60rem,calc(100vw-2rem))]'
              : 'w-[min(48rem,calc(100vw-2rem))]',
            isDropdownOpen ? 'visible delay-0' : 'pointer-events-none invisible delay-200'
          )}
          onMouseEnter={() => onMouseEnter(item.label)}
          onMouseLeave={onMouseLeave}
        >
          <div className="overflow-hidden rounded-2xl border border-neutral-300/80 bg-linear-to-b from-neutral-100/90 via-white to-white p-lg shadow-2xl shadow-neutral-900/15 backdrop-blur-xl">
            <motion.div
              variants={motionVariants(reduced, staggerContainer)}
              initial={false}
              animate={isDropdownOpen ? 'show' : 'hidden'}
              className={cn('grid gap-lg', item.columns.length > 2 ? 'grid-cols-3' : 'grid-cols-2')}
            >
              {item.columns.map((col) => (
                <div key={col.title ?? col.items[0]?.title} className="space-y-sm">
                  {col.title && (
                    <h4 className="px-sm font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      {col.title}
                    </h4>
                  )}
                  <ul className="space-y-xs">
                    {col.items.map((subItem) => {
                      const isSubItemSelected = isPathActive(pathname, subItem.href);

                      return (
                        <motion.li key={subItem.title} variants={motionVariants(reduced, fadeUp)}>
                          <Link
                            href={subItem.href}
                            onClick={onCloseDropdown}
                            className={cn(
                              'group/item flex flex-col rounded-lg p-sm transition-all duration-200',
                              isSubItemSelected
                                ? 'bg-neutral-200/60 shadow-2xs'
                                : 'hover:bg-neutral-200/40'
                            )}
                          >
                            <div
                              className={cn(
                                'flex items-center justify-between text-sm font-bold transition-colors',
                                isSubItemSelected
                                  ? 'text-primary'
                                  : 'text-neutral-900 group-hover/item:text-primary'
                              )}
                            >
                              <span>{subItem.title}</span>
                              <ArrowRight
                                aria-hidden
                                strokeWidth={2}
                                className="size-3.5 shrink-0 -translate-x-1 text-neutral-400 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:text-primary group-hover/item:opacity-100"
                              />
                            </div>
                            {subItem.desc && (
                              <p className="mt-0.5 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                                {subItem.desc}
                              </p>
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </motion.div>
            {item.href && (
              <div className="mt-md border-t border-neutral-200 pt-sm">
                <Link
                  href={item.href}
                  onClick={onCloseDropdown}
                  className="group/item flex items-center justify-between rounded-lg p-sm text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-200/40 hover:text-primary"
                >
                  <span>{item.label} overview</span>
                  <ArrowRight aria-hidden strokeWidth={2} className="size-3.5 shrink-0" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
