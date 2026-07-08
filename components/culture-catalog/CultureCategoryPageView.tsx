import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogAbout } from '@/components/culture-catalog/CultureCatalogAbout';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { CultureCatalogSubcategoryGrid } from '@/components/culture-catalog/CultureCatalogSubcategoryGrid';
import { buildCultureCatalogBreadcrumb } from '@/lib/culture-catalog/build-culture-breadcrumb';
import { HERITAGE_MAP_LEGEND } from '@/lib/constants/heritage-map-section';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import type { MenuNode } from '@/lib/culture-menu';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import {
  buildCultureCatalogCategoryStats,
  buildCultureCatalogMapPins,
  countMappableItems,
} from '@/lib/mappers/culture-catalog-page';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface CultureCategoryPageViewProps {
  category: MenuNode;
  subcategories: MenuNode[];
  items: PublicCultureItemDTO[];
}

export function CultureCategoryPageView({
  category,
  subcategories,
  items,
}: CultureCategoryPageViewProps) {
  const hasChildren = subcategories.length > 0;
  const content = resolveCultureCatalogContent(category, undefined, { hasSubcategories: hasChildren });
  const visibility = content.sectionVisibility;

  if (hasChildren) {
    return (
      <CultureCatalogShell>
        <CultureCatalogSubcategoryGrid
          parent={category}
          nodes={subcategories}
          content={content.items}
          variant="hub"
        />
      </CultureCatalogShell>
    );
  }

  const stats = buildCultureCatalogCategoryStats(
    subcategories.length,
    items.length,
    { entries: content.statLabels.entries, regions: 'Total Entries' },
  );
  const pins = buildCultureCatalogMapPins(items);
  const mapCount = countMappableItems(items);
  const aboutContent = visibility.facts ? content.about : { ...content.about, facts: [] };

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
          <CultureCatalogItemGrid items={items} content={content.items} sectionId="entries" />
        ) : null}
        {visibility.map && pins.length > 0 ? (
          <CulturalPortalMap
            eyebrow={content.map.eyebrow}
            title={content.map.title}
            description={content.map.description}
            ctaHref="/map"
            placeholderTitle={content.map.placeholderTitle}
            placeholderSubtitle={
              mapCount > 0
                ? `${mapCount} mapped location${mapCount === 1 ? '' : 's'} — open the full interactive map`
                : 'Full map integration launching with the portal'
            }
            pins={pins}
            legend={HERITAGE_MAP_LEGEND.filter((item) =>
              ['Religious Sites', 'Historical Monuments'].includes(item.label),
            )}
          />
        ) : null}
      </LandingSectionStack>
    </CultureCatalogShell>
  );
}
