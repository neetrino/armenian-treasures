import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogAbout } from '@/components/culture-catalog/CultureCatalogAbout';
import { CultureCatalogHero } from '@/components/culture-catalog/CultureCatalogHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import type { MenuNode } from '@/lib/culture-menu';
import { HERITAGE_MAP_LEGEND } from '@/lib/constants/heritage-map-section';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import {
  buildCultureCatalogMapPins,
  buildCultureCatalogStats,
  countMappableItems,
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
  const stats = buildCultureCatalogStats(items, content.statLabels);
  const pins = buildCultureCatalogMapPins(items);
  const mapCount = countMappableItems(items);

  return (
    <CultureCatalogShell>
      <CultureCatalogHero
        title={subcategory.title}
        eyebrow={content.eyebrow}
        accent={content.accent}
        slogan={content.slogan}
        description={subcategory.description ?? content.about.description}
        heroImage={content.heroImage}
        breadcrumb={[
          { label: parent.title, href: `/culture/${parent.slug}` },
          { label: subcategory.title },
        ]}
        ctas={[
          { label: 'Explore Entries', href: '#entries', variant: 'gold' },
          { label: 'View on Map', href: '#map', variant: 'teal' },
          { label: `Back to ${parent.title}`, href: `/culture/${parent.slug}`, variant: 'outline' },
        ]}
      />
      <CulturalPortalStatsBar stats={stats} />
      <CultureCatalogAbout content={content.about} />
      <KhndzoreskDivider />
      <CultureCatalogItemGrid items={items} content={content.items} />
      <KhndzoreskDivider />
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
    </CultureCatalogShell>
  );
}
