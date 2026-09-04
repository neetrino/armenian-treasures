import Link from 'next/link';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { toLandingBreadcrumbSegments } from '@/components/culture-catalog/CulturePortalLandingBreadcrumb';
import { CultureItemMediaSections } from '@/components/culture-catalog/CultureItemMediaSections';
import { hasTrimmedText } from '@/lib/landing/landing-section-utils';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import { firstTourUrl } from '@/lib/culture-item-media';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureItemDetailViewProps {
  item: PublicCultureItemDetailDTO;
  locale?: SiteLocaleCode;
}

function formatEnumLabel(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
}

export function CultureItemDetailView({ item, locale = 'EN' }: CultureItemDetailViewProps) {
  const menu = item.menuItem;
  const parent = menu?.parent ?? null;
  const description = item.shortDescription ?? item.description ?? '';
  const heroImage = item.coverImage?.trim() || undefined;

  const breadcrumb = parent && menu
    ? [
        { label: parent.title, href: `/culture/${parent.slug}` },
        { label: menu.title, href: `/culture/${parent.slug}/${menu.slug}` },
        { label: item.title },
      ]
    : menu
      ? [{ label: menu.title, href: `/culture/${menu.slug}` }, { label: item.title }]
      : [{ label: item.title }];

  const stats = [
    item.region ? { value: item.region, label: uiMessage(locale, 'region') } : null,
    item.periodLabel ? { value: item.periodLabel, label: uiMessage(locale, 'period') } : null,
    { value: formatEnumLabel(item.itemType), label: uiMessage(locale, 'type') },
  ].filter((stat): stat is { value: string; label: string } => stat !== null);

  const backHref = parent && menu
    ? `/culture/${parent.slug}/${menu.slug}`
    : menu
      ? `/culture/${menu.slug}`
      : '/culture';
  const tourHref = item.tourUrl?.trim() || firstTourUrl(item.media);

  return (
    <CultureCatalogShell>
      <CultureCatalogLandingHero
        title={item.title}
        eyebrow={
          parent
            ? `✦ ${parent.title} · ${menu?.title} · ${uiMessage(locale, 'armenia')} ✦`
            : `✦ ${menu?.title ?? uiMessage(locale, 'culturePortal')} · ${uiMessage(locale, 'armenia')} ✦`
        }
        accent={item.periodLabel ?? item.region ?? uiMessage(locale, 'heritageEntry')}
        slogan={
          item.region
            ? `${item.region}${item.yearLabel ? ` · ${item.yearLabel}` : ''}`
            : uiMessage(locale, 'armenianArchive')
        }
        description={
          hasTrimmedText(description) ? description : uiMessage(locale, 'curatedArchiveEntry')
        }
        heroImage={heroImage}
        breadcrumb={toLandingBreadcrumbSegments(breadcrumb)}
        locale={locale}
        ctas={[
          { label: uiMessage(locale, 'viewDetails'), href: '#detail', variant: 'gold' },
          ...(tourHref
            ? [{ label: uiMessage(locale, 'tour3d'), href: '#tour', variant: 'teal' as const }]
            : []),
          { label: uiMessage(locale, 'backToCatalog'), href: backHref, variant: 'outline' },
        ]}
      />
      {stats.length > 0 ? <CulturalPortalStatsBar stats={stats} /> : null}
      <LandingSectionStack>
        <section id="detail" className="catalog-detail-section">
          <div className="catalog-detail-main">
            <CultureItemMediaSections
              title={item.title}
              media={item.media}
              locationName={item.locationName}
              showOnMap={item.showOnMap}
              mapUrl={item.mapUrl}
              latitude={item.latitude}
              longitude={item.longitude}
              locale={locale}
            />
          </div>
        </section>
        <div className="catalog-submit-cta reveal">
          <p>{uiMessage(locale, 'exploreMore')}</p>
          <Link href={backHref} className="btn-outline">
            {uiMessage(locale, 'backTo')} {menu?.title ?? uiMessage(locale, 'culturePortal')}
          </Link>
        </div>
      </LandingSectionStack>
    </CultureCatalogShell>
  );
}
