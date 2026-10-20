import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
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
import { buildCultureCatalogStats, resolveMappableCatalogItems } from '@/lib/mappers/culture-catalog-page';
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

type CatalogContent = ReturnType<typeof resolveCultureCatalogContent>;

function SubcategoryHero({
  parent,
  subcategory,
  content,
  locale,
}: {
  parent: MenuNode;
  subcategory: MenuNode;
  content: CatalogContent;
  locale: SiteLocaleCode;
}) {
  const visibility = content.sectionVisibility;
  if (!visibility.hero) return null;
  return (
    <CultureCatalogLandingHero
      title={content.about.title.trim() || subcategory.title}
      eyebrow={content.eyebrow}
      accent={content.accent}
      slogan={content.slogan}
      heroImage={content.heroImage}
      showEyebrow
      breadcrumb={buildCultureCatalogBreadcrumb(subcategory, parent)}
      ctas={[
        ...(visibility.map
          ? [{ label: uiMessage(locale, 'viewOnMap'), href: '#map', variant: 'teal' as const }]
          : []),
        ...(visibility.entries
          ? [{ label: uiMessage(locale, 'exploreEntries'), href: '#entries', variant: 'gold' as const }]
          : []),
        {
          label: `${uiMessage(locale, 'backTo')} ${parent.title}`,
          href: `/culture/${parent.slug}`,
          variant: 'outline' as const,
        },
      ]}
    />
  );
}

function SubcategorySections({
  content,
  items,
  mapItems,
  locale,
  searchForm,
}: {
  content: CatalogContent;
  items: PublicCultureItemDTO[];
  mapItems: PublicCultureItemDTO[];
  locale: SiteLocaleCode;
  searchForm: ReturnType<typeof buildCatalogSearchForm> | undefined;
}) {
  const visibility = content.sectionVisibility;
  return (
    <>
      {visibility.stats ? (
        <CulturalPortalStatsBar stats={buildCultureCatalogStats(items, content.statLabels)} />
      ) : null}
      <LandingSectionStack>
        {visibility.map ? (
          <CulturalPortalMap
            eyebrow={content.map.eyebrow}
            title={content.map.title}
            description={content.map.description}
            items={mapItems}
            locale={locale}
          />
        ) : null}
        {visibility.entries ? (
          <CultureCatalogItemGrid
            items={items}
            content={content.items}
            searchForm={searchForm}
            locale={locale}
          />
        ) : null}
      </LandingSectionStack>
    </>
  );
}

export async function CultureSubcategoryPageView({
  parent,
  subcategory,
  items,
  filters,
  locale = 'EN',
}: CultureSubcategoryPageViewProps) {
  const content = resolveCultureCatalogContent(subcategory, parent, { locale });
  const mapItems = await resolveMappableCatalogItems(items);
  const searchForm =
    items.length > 0
      ? buildCatalogSearchForm(items, filters, `/culture/${parent.slug}/${subcategory.slug}`)
      : undefined;

  return (
    <CultureCatalogShell>
      <SubcategoryHero parent={parent} subcategory={subcategory} content={content} locale={locale} />
      <SubcategorySections
        content={content}
        items={filterCatalogItems(items, filters)}
        mapItems={mapItems}
        locale={locale}
        searchForm={searchForm}
      />
    </CultureCatalogShell>
  );
}
