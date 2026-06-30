'use client';

import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';

interface CultureCatalogHeroBackgroundProps {
  imageUrl: string;
  fallbackUrl: string;
}

export function CultureCatalogHeroBackground({
  imageUrl,
  fallbackUrl,
}: CultureCatalogHeroBackgroundProps) {
  return <HeroImageOverlay imageUrl={imageUrl} fallbackUrl={fallbackUrl} />;
}
