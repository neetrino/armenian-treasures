import { LandingHero, type LandingHeroCta } from '@/components/landing/LandingHero';
import type { LandingBreadcrumbSegment } from '@/components/landing/LandingBreadcrumb';
import { CulturePortalLandingBreadcrumb } from '@/components/culture-catalog/CulturePortalLandingBreadcrumb';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export type CultureCatalogLandingHeroCta = LandingHeroCta;

interface CultureCatalogLandingHeroProps {
  title: string;
  eyebrow: string;
  accent: string;
  slogan?: string;
  description?: string;
  breadcrumb: LandingBreadcrumbSegment[];
  heroImage?: string;
  ctas?: CultureCatalogLandingHeroCta[];
  showEyebrow?: boolean;
}

export function CultureCatalogLandingHero({
  title,
  eyebrow,
  accent,
  slogan,
  description,
  breadcrumb,
  heroImage,
  ctas = [],
  showEyebrow = false,
}: CultureCatalogLandingHeroProps) {
  const trimmedHero = heroImage?.trim();
  const imageUrl = trimmedHero ? resolvePublicAssetUrl(trimmedHero) : null;

  return (
    <LandingHero
      eyebrow={eyebrow}
      title={title}
      accent={accent}
      slogan={slogan}
      subtitle={description ?? ''}
      heroImage={imageUrl}
      ctas={ctas}
      showEyebrow={showEyebrow}
      heroClassName="culture-catalog-hero"
      breadcrumb={<CulturePortalLandingBreadcrumb segments={breadcrumb} />}
    />
  );
}
