import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogAbout } from '@/components/culture-catalog/CultureCatalogAbout';
import { CultureCatalogLandingHero } from '@/components/culture-catalog/CultureCatalogLandingHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import type { MenuNode } from '@/lib/culture-menu';
import { buildCultureCatalogBreadcrumb } from '@/lib/culture-catalog/build-culture-breadcrumb';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { LandingSectionStack } from '@/lib/landing/LandingSectionStack';
import {
  buildCultureCatalogStats,
  filterMappableItems,
} from '@/lib/mappers/culture-catalog-page';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface CultureSubcategoryPageViewProps {
  parent: MenuNode;
  subcategory: MenuNode;
  items: PublicCultureItemDTO[];
}

export function CultureSubcategoryPageView({
  parent,
  subcategory,
  items,
}: CultureSubcategoryPageViewProps) {
  const content = resolveCultureCatalogContent(subcategory, parent);
  const visibility = content.sectionVisibility;
  const stats = buildCultureCatalogStats(items, content.statLabels);
  const mapItems = filterMappableItems(items);
  const aboutContent = visibility.facts ? content.about : { ...content.about, facts: [] };

  return (
    <CultureCatalogShell>
      {visibility.hero ? (
        <CultureCatalogLandingHero
          title={subcategory.title}
          eyebrow={content.eyebrow}
          accent={content.accent}
          slogan={content.slogan}
          description={subcategory.description ?? content.about.description}
          heroImage={content.heroImage}
          breadcrumb={buildCultureCatalogBreadcrumb(subcategory, parent)}
          ctas={[
            ...(visibility.entries
              ? [{ label: 'Explore Entries', href: '#entries', variant: 'gold' as const }]
              : []),
            ...(visibility.map && mapItems.length > 0
              ? [{ label: 'View on Map', href: '/map', variant: 'teal' as const }]
              : []),
            { label: `Back to ${parent.title}`, href: `/culture/${parent.slug}`, variant: 'outline' as const },
          ]}
        />
      ) : null}
      {visibility.stats ? <CulturalPortalStatsBar stats={stats} /> : null}
      {visibility.about ? <CultureCatalogAbout content={aboutContent} /> : null}
      <LandingSectionStack>
        {visibility.entries ? (
          <CultureCatalogItemGrid items={items} content={content.items} />
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
