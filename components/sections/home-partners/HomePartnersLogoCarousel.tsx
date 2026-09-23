'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { TintedPartnerLogo } from '@/components/sections/home-partners/TintedPartnerLogo';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import type { HighlightedPartnerLogo } from '@/lib/mappers/partner-logos';
import { cn } from '@/lib/utils';

interface HomePartnersLogoCarouselProps {
  logos: HighlightedPartnerLogo[];
  locale: SiteLocaleCode;
}

const CARD_PX = 164;
const SAFE_REPEAT = 14;

function rowLogos(logos: HighlightedPartnerLogo[], row: 0 | 1): HighlightedPartnerLogo[] {
  return logos.filter((_, index) => index % 2 === row);
}

function loopSequence(logos: HighlightedPartnerLogo[], min: number): HighlightedPartnerLogo[] {
  if (logos.length === 0) return [];
  const sequence: HighlightedPartnerLogo[] = [];
  do {
    sequence.push(...logos);
  } while (sequence.length < min);
  return [...sequence, ...sequence];
}

function useMinCards(): number {
  const [min, setMin] = useState(SAFE_REPEAT);

  useEffect(() => {
    const update = (): void => {
      const needed = Math.ceil(window.innerWidth / CARD_PX) + 2;
      setMin(Math.max(SAFE_REPEAT, needed));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return min;
}

function PartnerLogoLink({
  logo,
  duplicate,
}: {
  logo: HighlightedPartnerLogo;
  duplicate: boolean;
}) {
  return (
    <Link
      href={logo.href}
      className="home-partners-logos__item"
      aria-label={logo.name}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      <TintedPartnerLogo src={resolvePublicAssetUrl(logo.src)} alt={duplicate ? '' : logo.alt} />
    </Link>
  );
}

function LogoMarquee({
  logos,
  min,
  offset,
}: {
  logos: HighlightedPartnerLogo[];
  min: number;
  offset?: boolean;
}) {
  const slides = loopSequence(logos, min);
  const half = slides.length / 2;

  return (
    <div className={cn('home-partners-logos', offset && 'home-partners-logos--offset')}>
      {slides.map((logo, index) => (
        <PartnerLogoLink
          key={`${logo.name}-${logo.src}-${index}`}
          logo={logo}
          duplicate={index >= half}
        />
      ))}
    </div>
  );
}

export function HomePartnersLogoCarousel({ logos, locale }: HomePartnersLogoCarouselProps) {
  const reduced = useReducedMotion() ?? false;
  const minCards = useMinCards();
  const top = rowLogos(logos, 0);
  const bottom = rowLogos(logos, 1);

  return (
    <div
      className="home-partners-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={uiMessage(locale, 'ourPartners')}
    >
      {reduced ? (
        <div className="home-partners-logos home-partners-logos--static">
          {logos.map((logo) => (
            <PartnerLogoLink key={`${logo.name}-${logo.src}`} logo={logo} duplicate={false} />
          ))}
        </div>
      ) : (
        <>
          <LogoMarquee logos={top} min={minCards} />
          {bottom.length > 0 ? <LogoMarquee logos={bottom} min={minCards} offset /> : null}
        </>
      )}
    </div>
  );
}
