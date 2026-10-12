'use client';

import { useState } from 'react';
import { cn } from '@/styles/tailwind.utils';
import { LOCAL_ONLY_SLUGS, resolveFallbackIcon, resolveSlug, SERVICE_ICONS } from './icons';

type BrandIconVariant = 'service' | 'tech' | 'stack-dark';

const VARIANT_COLOR: Record<BrandIconVariant, string | undefined> = {
  service: undefined,
  tech: undefined,
  'stack-dark': '9f9f9f',
};

interface BrandIconProps {
  slug: string;
  size?: number;
  variant?: BrandIconVariant;
  className?: string;
  /**
   * Service / category slug (e.g. `crm`, `saas`, `cloud`) used when the brand
   * glyph is missing or the CDN fails — keeps chips visually consistent.
   */
  fallbackSlug?: string;
}

function FallbackIcon({
  slug,
  size,
  variant,
  className,
  fallbackSlug,
}: {
  slug: string;
  size: number;
  variant: BrandIconVariant;
  className?: string;
  fallbackSlug?: string;
}) {
  const Icon = resolveFallbackIcon(slug, fallbackSlug);

  return (
    <Icon
      size={size}
      aria-hidden
      className={cn(
        variant === 'service' && 'text-primary',
        variant === 'tech' && 'text-neutral-600',
        variant === 'stack-dark' && 'text-neutral-400',
        className
      )}
    />
  );
}

export default function BrandIcon({
  slug,
  size = 20,
  variant = 'service',
  className,
  fallbackSlug,
}: BrandIconProps) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveSlug(slug);
  const color = VARIANT_COLOR[variant];
  const isServiceIcon = slug in SERVICE_ICONS;
  const useLocalOnly = LOCAL_ONLY_SLUGS.has(slug) || LOCAL_ONLY_SLUGS.has(resolved);
  // Simple Icons SVGs (CC0) are self-hosted in /public/brand-icons, named
  // `<slug>.svg` (brand colour) and `<slug>-<hex>.svg` (tinted).
  const src = color ? `/brand-icons/${resolved}-${color}.svg` : `/brand-icons/${resolved}.svg`;

  // Service icons, known-missing CDN brands, and failed loads → Lucide.
  if (isServiceIcon || useLocalOnly || failed) {
    return (
      <FallbackIcon
        slug={slug}
        size={size}
        variant={variant}
        className={className}
        fallbackSlug={fallbackSlug}
      />
    );
  }

  const alt = resolved;

  return (
    // biome-ignore lint/performance/noImgElement: static brand SVG with onError fallback
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('object-contain', className)}
      onError={() => setFailed(true)}
    />
  );
}
