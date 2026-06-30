'use client';

import { useEffect, useState } from 'react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export const HERO_IMAGE_OVERLAY_GRADIENT =
  'linear-gradient(to bottom,rgba(9,9,9,.88) 0%,rgba(9,9,9,.38) 40%,rgba(9,9,9,.82) 100%)';

interface HeroImageOverlayProps {
  imageUrl: string;
  fallbackUrl?: string;
  overlay?: string;
  className?: string;
}

export function HeroImageOverlay({
  imageUrl,
  fallbackUrl,
  overlay = HERO_IMAGE_OVERLAY_GRADIENT,
  className = 'hero-img-overlay',
}: HeroImageOverlayProps) {
  const resolvedPrimary = resolvePublicAssetUrl(imageUrl);
  const resolvedFallback = fallbackUrl ? resolvePublicAssetUrl(fallbackUrl) : resolvedPrimary;
  const [resolvedUrl, setResolvedUrl] = useState(resolvedPrimary);

  useEffect(() => {
    setResolvedUrl(resolvedPrimary);

    const probe = new window.Image();
    probe.onload = () => setResolvedUrl(resolvedPrimary);
    probe.onerror = () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[hero-image] image failed to load, using fallback:', resolvedPrimary);
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
