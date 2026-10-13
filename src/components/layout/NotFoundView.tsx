'use client';

import { MoveLeft, RefreshCw, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const POPULAR_PAGES = [
  { label: 'Hire developers', href: '/work-with-us/hire' },
  { label: 'What we build', href: '/what-we-build' },
  { label: 'Case studies', href: '/our-work/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function NotFoundView() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-black px-md py-2xl">
      {/* BACKGROUND GRAPHIC: Blueprint Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none select-none mix-blend-difference">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[32px_32px]" />
      </div>

      {/* Main Structural Layout Block */}
      <div className="relative z-10 w-full max-w-content border border-neutral-900 bg-neutral-950 p-lg md:p-xl rounded-md shadow-card overflow-hidden">
        {/* Technical Coordinate Indicators */}
        <div className="absolute top-xs left-xs font-mono text-[9px] text-neutral-700 pointer-events-none">
          + ERR_COORD_404
        </div>
        <div className="absolute bottom-xs right-xs font-mono text-[9px] text-neutral-700 pointer-events-none">
          {'ROUTE_DNE // STATUS_MISSING'}
        </div>

        <div className="flex flex-col items-center text-center space-y-md">
          {/* 1. Status Indicator Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-xs rounded-sm border border-danger/20 bg-danger/5 px-md py-xs text-xs font-mono font-bold uppercase tracking-widest text-danger"
          >
            <span className="h-2 w-2 rounded-full bg-danger animate-ping" />
            UNRESOLVED_ROUTE
          </motion.div>

          {/* 2. Massive Digital Error Indicator */}
          <div className="space-y-xs">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-neutral-50 font-sans">
              404<span className="text-primary font-light">.</span>
            </h1>
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
              Segment Address Not Found
            </p>
          </div>

          {/* 3. Terminal Diagnostics Log Box */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="w-full bg-neutral-black border border-neutral-900 rounded-sm p-md font-mono text-xs text-left text-neutral-500 space-y-xs"
          >
            <div className="flex items-center justify-between border-b border-neutral-900 pb-xs mb-xs">
              <span className="text-[10px] text-neutral-600 font-bold flex items-center gap-xs">
                <Terminal size={10} /> DIAGNOSTICS_SHELL
              </span>
              <span className="text-[10px] text-danger font-bold">ABORTED</span>
            </div>
            <p className="text-neutral-600">› looking up requested node address tree...</p>
            <p className="text-neutral-600">› [FAIL] address pointer returned NULL references.</p>
            <p className="text-neutral-400 font-medium">
              › The file structure or layout directory does not exist.
            </p>
          </motion.div>

          {/* 4. Structural Descriptive Copy */}
          <p className="text-sm leading-relaxed text-text-muted-on-dark max-w-4xl">
            This page doesn&apos;t exist or has moved. Try one of the pages below, or go back to the
            home page.
          </p>

          {/* 5. Clean Architectural Navigation Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-md pt-md w-full border-t border-neutral-900">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-xs bg-primary hover:bg-primary-dark text-neutral-50 px-lg py-md text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors group"
            >
              <MoveLeft size={12} className="transition-transform group-hover:-translate-x-xs" />
              Stack360 Home
            </Link>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-xs bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 px-lg py-md text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              <RefreshCw size={12} />
              Retry Sync
            </button>
          </div>

          {/* 6. Where people usually meant to go */}
          <nav aria-label="Popular pages" className="w-full pt-xs">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Try one of these
            </p>
            <ul className="mt-sm flex flex-wrap items-center justify-center gap-x-lg gap-y-sm">
              {POPULAR_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-sm font-bold text-neutral-300 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
