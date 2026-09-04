import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import type { MenuNode } from '@/lib/culture-menu';
import { buildCultureCatalogBreadcrumb } from '@/lib/culture-catalog/build-culture-breadcrumb';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import { buildCatalogSearchForm } from '@/lib/culture-catalog/catalog-filter-options';
import { filterCatalogItems } from '@/lib/culture-catalog/filter-catalog-entries';
import type { CatalogSearchFilters } from '@/lib/culture-catalog/catalog-search-params';
import { filterMappableItems } from '@/lib/mappers/culture-catalog-page';
import type { PublicCultureItemDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CultureSubcategoryPageViewProps {
  parent: MenuNode;
  subcategory: MenuNode;
  items: PublicCultureItemDTO[];
  filters: CatalogSearchFilters;
  locale?: SiteLocaleCode;
}

export function CultureSubcategoryPageView({
  parent,
  subcategory,
  items,
  filters,
  locale = 'EN',
}: CultureSubcategoryPageViewProps) {
  const content = resolveCultureCatalogContent(subcategory, parent);
  const visibility = content.sectionVisibility;
  const mapItems = filterMappableItems(items);
  const visibleItems = filterCatalogItems(items, filters);
  const searchForm =
    items.length > 0
      ? buildCatalogSearchForm(items, filters, `/culture/${parent.slug}/${subcategory.slug}`)
      : undefined;

  return (
    <CultureCatalogShell>
      {visibility.hero ? (
        <CultureCatalogLandingHero
          title={content.about.title}
          eyebrow={content.eyebrow}
          accent={content.accent}
          slogan={content.slogan}
          heroImage={content.heroImage}
          breadcrumb={buildCultureCatalogBreadcrumb(subcategory, parent)}
          ctas={[
            ...(visibility.map
              ? [{ label: uiMessage(locale, 'viewOnMap'), href: '#map', variant: 'teal' as const }]
              : []),
            ...(visibility.entries
              ? [{ label: uiMessage(locale, 'exploreEntries'), href: '#entries', variant: 'gold' as const }]
              : []),
            { label: `${uiMessage(locale, 'backTo')} ${parent.title}`, href: `/culture/${parent.slug}`, variant: 'outline' as const },
          ]}
        />
      ) : null}
      <LandingSectionStack>
        {visibility.map ? (
          <CulturalPortalMap
            eyebrow={content.map.eyebrow}
            title={content.map.title}
            description={content.map.description}
            items={mapItems}
          />
        ) : null}
        {visibility.entries ? (
          <CultureCatalogItemGrid
            items={visibleItems}
            content={content.items}
            searchForm={searchForm}
            locale={locale}
          />
        ) : null}
      </LandingSectionStack>
    </CultureCatalogShell>
  );
}
