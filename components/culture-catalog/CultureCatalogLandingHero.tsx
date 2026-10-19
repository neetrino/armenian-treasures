import { LandingHero, type LandingHeroCta } from '@/components/landing/LandingHero';
import type { LandingBreadcrumbSegment } from '@/components/landing/LandingBreadcrumb';
import { CulturePortalLandingBreadcrumb } from '@/components/culture-catalog/CulturePortalLandingBreadcrumb';
import { CULTURE_CATALOG_DEFAULT_HERO_IMAGE } from '@/lib/constants/culture-catalog-content';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export type CultureCatalogLandingHeroCta = LandingHeroCta;

interface CultureCatalogLandingHeroProps {
  title: string;
  eyebrow: string;
  accent: string;
  slogan?: string;
  description?: string;
  breadcrumb: LandingBreadcrumbSegment[];
  ctas?: CultureCatalogLandingHeroCta[];
}

export function CultureCatalogLandingHero({
  title,
  eyebrow,
  accent,
  slogan,
  description,
  breadcrumb,
  ctas = [],
}: CultureCatalogLandingHeroProps) {
  const imageUrl = resolvePublicAssetUrl(CULTURE_CATALOG_DEFAULT_HERO_IMAGE);

  return (
    <LandingHero
      eyebrow={eyebrow}
      title={title}
      accent={accent}
      slogan={slogan}
      subtitle={description ?? ''}
      heroImage={imageUrl}
      ctas={ctas}
      heroClassName="culture-catalog-hero"
      breadcrumb={<CulturePortalLandingBreadcrumb segments={breadcrumb} />}
    />
  );
}
