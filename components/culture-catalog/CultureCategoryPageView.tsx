import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogAbout } from '@/components/culture-catalog/CultureCatalogAbout';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { CultureCatalogSubcategoryGrid } from '@/components/culture-catalog/CultureCatalogSubcategoryGrid';
import { buildCultureCatalogBreadcrumb } from '@/lib/culture-catalog/build-culture-breadcrumb';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { buildCatalogSearchForm } from '@/lib/culture-catalog/catalog-filter-options';
import { filterCatalogItems } from '@/lib/culture-catalog/filter-catalog-entries';
import type { CatalogSearchFilters } from '@/lib/culture-catalog/catalog-search-params';
import type { MenuNode } from '@/lib/culture-menu';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import {
  buildCultureCatalogCategoryStats,
  filterMappableItems,
  resolveCultureCatalogHubDescription,
} from '@/lib/mappers/culture-catalog-page';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface CultureCategoryPageViewProps {
  category: MenuNode;
  subcategories: MenuNode[];
  items: PublicCultureItemDTO[];
  filters: CatalogSearchFilters;
}

function CultureCategoryHubPage({
  category,
  subcategories,
  content,
}: {
  category: MenuNode;
  subcategories: MenuNode[];
  content: ReturnType<typeof resolveCultureCatalogContent>;
}) {
  return (
    <CultureCatalogShell>
      <CultureCatalogSubcategoryGrid
        parent={category}
        nodes={subcategories}
        content={{
          ...content.items,
          label: content.about.label,
          description: resolveCultureCatalogHubDescription(
            category.description,
            content.about.description,
            content.items.description,
          ),
        }}
        variant="hub"
      />
    </CultureCatalogShell>
  );
}

function CultureCategoryLeafPage({
  category,
  items,
  filters,
  content,
}: {
  category: MenuNode;
  items: PublicCultureItemDTO[];
  filters: CatalogSearchFilters;
  content: ReturnType<typeof resolveCultureCatalogContent>;
}) {
  const visibility = content.sectionVisibility;
  const stats = buildCultureCatalogCategoryStats(0, items.length, {
    entries: content.statLabels.entries,
    regions: 'Total Entries',
  });
  const mapItems = filterMappableItems(items);
  const aboutContent = visibility.facts ? content.about : { ...content.about, facts: [] };
  const searchForm =
    items.length > 0
      ? buildCatalogSearchForm(items, filters, `/culture/${category.slug}`)
      : undefined;

  return (
    <CultureCatalogShell>
      {visibility.hero ? (
        <CultureCatalogLandingHero
          title={category.title}
          eyebrow={content.eyebrow}
          accent={content.accent}
          slogan={content.slogan}
          description={category.description ?? content.about.description}
          heroImage={content.heroImage}
          breadcrumb={buildCultureCatalogBreadcrumb(category)}
          ctas={
            visibility.entries
              ? [{ label: 'Explore Entries', href: '#entries', variant: 'gold' as const }]
              : []
          }
        />
      ) : null}
      {visibility.stats ? <CulturalPortalStatsBar stats={stats} /> : null}
      {visibility.about ? <CultureCatalogAbout content={aboutContent} /> : null}
      <LandingSectionStack>
        {visibility.entries && items.length > 0 ? (
          <CultureCatalogItemGrid
            items={filterCatalogItems(items, filters)}
            content={content.items}
            sectionId="entries"
            searchForm={searchForm}
          />
        ) : null}
        {visibility.map ? (
          <CulturalPortalMap
            eyebrow={content.map.eyebrow}
            title={content.map.title}
            description={content.map.description}
            items={mapItems}
          />
        ) : null}
      </LandingSectionStack>
    </CultureCatalogShell>
  );
}

export function CultureCategoryPageView({
  category,
  subcategories,
  items,
  filters,
}: CultureCategoryPageViewProps) {
  const hasChildren = subcategories.length > 0;
  const content = resolveCultureCatalogContent(category, undefined, { hasSubcategories: hasChildren });

  if (hasChildren) {
    return (
      <CultureCategoryHubPage
        category={category}
        subcategories={subcategories}
        content={content}
      />
    );
  }

  return (
    <CultureCategoryLeafPage
      category={category}
      items={items}
      filters={filters}
      content={content}
    />
  );
}
