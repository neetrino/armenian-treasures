'use client';

import { resolveHomeHeroImageUrls } from '@/components/sections/hero/hero-image';

interface HeroBackgroundProps {
  desktopImage?: string | null;
  mobileImage?: string | null;
}

export function HeroBackground({ desktopImage, mobileImage }: HeroBackgroundProps) {
  const { desktop, mobile } = resolveHomeHeroImageUrls(desktopImage, mobileImage);
  const heroSrc = desktop ?? mobile;
  const hasHeroImage = Boolean(heroSrc);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden hero-bg-base"
    >
      {hasHeroImage && heroSrc ? (
        <>
          <picture>
            <source media="(max-width: 767px)" srcSet={mobile ?? desktop ?? undefined} />
            <img
              src={heroSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 hero-bg-image-overlay" />
        </>
      ) : null}

      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-heritage-border-gold to-transparent opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-heritage-border-gold to-transparent opacity-40" />
    </div>
  );
}
