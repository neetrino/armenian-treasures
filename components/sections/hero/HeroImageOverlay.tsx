'use client';

import { useEffect, useState } from 'react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export const HERO_IMAGE_OVERLAY_GRADIENT = 'var(--hero-image-overlay)';

interface HeroImageOverlayProps {
  imageUrl: string;
  fallbackUrl?: string;
  overlay?: string;
  className?: string;
}

function deriveLocalPublicPath(url: string): string | null {
  if (!/^https?:\/\//i.test(url)) return null;
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname;
    if (/^\/images\/.+/i.test(pathname)) {
      return pathname;
    }
    return null;
  } catch {
    return null;
  }
}

export function HeroImageOverlay({
  imageUrl,
  fallbackUrl,
  overlay = HERO_IMAGE_OVERLAY_GRADIENT,
  className = 'hero-img-overlay',
}: HeroImageOverlayProps) {
  const resolvedPrimary = resolvePublicAssetUrl(imageUrl);
  const localPathFallback = deriveLocalPublicPath(resolvedPrimary);
  const resolvedFallback = fallbackUrl
    ? resolvePublicAssetUrl(fallbackUrl)
    : localPathFallback ?? resolvedPrimary;
  const [resolvedUrl, setResolvedUrl] = useState(resolvedPrimary);

  useEffect(() => {
    setResolvedUrl(resolvedPrimary);

    const probe = new window.Image();
    probe.onload = () => setResolvedUrl(resolvedPrimary);
    probe.onerror = () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[hero-image] image failed to load, using fallback:', {
          primary: resolvedPrimary,
          fallback: resolvedFallback,
        });
      }
      setResolvedUrl(resolvedFallback);
    };
    probe.src = resolvedPrimary;
  }, [resolvedPrimary, resolvedFallback]);

  return (
    <div
      className={className}
      style={{
        backgroundImage: `${overlay},url('${resolvedUrl}')`,
      }}
    />
  );
}
