import { LandingHero, type LandingHeroCta } from '@/components/landing/LandingHero';
import type { LandingBreadcrumbSegment } from '@/components/landing/LandingBreadcrumb';
import { CulturePortalLandingBreadcrumb } from '@/components/culture-catalog/CulturePortalLandingBreadcrumb';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { hasTrimmedText } from '@/lib/landing/landing-section-utils';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';

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
  showScroll?: boolean;
  locale?: SiteLocaleCode;
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
  showScroll = true,
  locale = 'EN',
}: CultureCatalogLandingHeroProps) {
  const imageUrl = hasTrimmedText(heroImage) ? resolvePublicAssetUrl(heroImage!) : null;

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
      showScroll={showScroll}
      locale={locale}
      breadcrumb={<CulturePortalLandingBreadcrumb segments={breadcrumb} />}
    />
  );
}
