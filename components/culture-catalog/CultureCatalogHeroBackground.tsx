'use client';

import { useEffect, useState } from 'react';

const HERO_OVERLAY =
  'linear-gradient(to bottom,rgba(9,9,9,.88) 0%,rgba(9,9,9,.38) 40%,rgba(9,9,9,.82) 100%)';

interface CultureCatalogHeroBackgroundProps {
  imageUrl: string;
  fallbackUrl: string;
}

export function CultureCatalogHeroBackground({
  imageUrl,
  fallbackUrl,
}: CultureCatalogHeroBackgroundProps) {
  const [resolvedUrl, setResolvedUrl] = useState(imageUrl);

  useEffect(() => {
    setResolvedUrl(imageUrl);

    const probe = new window.Image();
    probe.onload = () => setResolvedUrl(imageUrl);
    probe.onerror = () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[culture-hero] image failed to load, using fallback:', imageUrl);
      }
      setResolvedUrl(fallbackUrl);
    };
    probe.src = imageUrl;
  }, [imageUrl, fallbackUrl]);

  return (
    <div
      className="hero-img-overlay"
      style={{
        backgroundImage: `${HERO_OVERLAY},url('${resolvedUrl}')`,
      }}
    />
  );
}
