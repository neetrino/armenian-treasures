import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { CulturalPortalMap } from '@/components/cultural-portal-page/CulturalPortalMap';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogAbout } from '@/components/culture-catalog/CultureCatalogAbout';
import { CultureCatalogHero } from '@/components/culture-catalog/CultureCatalogHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { CultureCatalogSubcategoryGrid } from '@/components/culture-catalog/CultureCatalogSubcategoryGrid';
import { buildCultureCatalogBreadcrumb } from '@/lib/culture-catalog/build-culture-breadcrumb';
import { HERITAGE_MAP_LEGEND } from '@/lib/constants/heritage-map-section';
import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import {
  buildCultureCatalogCategoryStats,
  buildCultureCatalogMapPins,
  countMappableItems,
} from '@/lib/mappers/culture-catalog-page';
import type { PublicCultureItemDTO } from '@/lib/dto';

interface CultureCategoryPageViewProps {
  category: MenuNode;
  subcategories: MenuNode[];
  formChild?: MenuNode;
  items: PublicCultureItemDTO[];
  totalChildItems?: number;
}

export function CultureCategoryPageView({
  category,
  subcategories,
  formChild,
  items,
  totalChildItems = 0,
}: CultureCategoryPageViewProps) {
  const hasChildren = subcategories.length > 0;
  const content = resolveCultureCatalogContent(category, undefined, { hasSubcategories: hasChildren });
  const sectionVisibility = content.sectionVisibility;
  const stats = buildCultureCatalogCategoryStats(
    subcategories.length,
    hasChildren ? totalChildItems : items.length,
    { entries: hasChildren ? 'Sub-catalogs' : content.statLabels.entries, regions: 'Total Entries' },
  );
  const pins = buildCultureCatalogMapPins(items);
  const mapCount = countMappableItems(items);
  const aboutContent = sectionVisibility.facts ? content.about : { ...content.about, facts: [] };

  const formHref = formChild ? resolveMenuHref(formChild, category) : null;

  return (
    <CultureCatalogShell>
      {sectionVisibility.hero ? (
        <CultureCatalogHero
          title={category.title}
          eyebrow={content.eyebrow}
          accent={content.accent}
          slogan={content.slogan}
          description={category.description ?? content.about.description}
          heroImage={content.heroImage}
          breadcrumb={buildCultureCatalogBreadcrumb(category)}
          ctas={[
            ...(sectionVisibility.entries
              ? [
                  {
                    label: hasChildren ? 'Browse Sub-catalogs' : 'Explore Entries',
                    href: '#entries',
                    variant: 'gold' as const,
                  },
                ]
              : []),
            { label: 'Add your project', href: '/culture/submit', variant: 'teal' as const },
            ...(formHref
              ? [{ label: 'Add sub-catalog', href: formHref, variant: 'outline' as const }]
              : []),
          ]}
        />
      ) : null}
      {sectionVisibility.stats ? <CulturalPortalStatsBar stats={stats} /> : null}
      {sectionVisibility.about ? <CultureCatalogAbout content={aboutContent} /> : null}
      {sectionVisibility.entries || sectionVisibility.map ? <KhndzoreskDivider /> : null}
      {sectionVisibility.entries ? (
        hasChildren ? (
          <>
            <CultureCatalogSubcategoryGrid
              parent={category}
              nodes={subcategories}
              formChild={formChild}
              content={content.items}
            />
            {items.length > 0 ? (
              <>
                <KhndzoreskDivider />
                <CultureCatalogItemGrid
                  items={items}
                  content={content.items}
                  sectionId="catalog-entries"
                />
              </>
            ) : null}
          </>
        ) : (
          <CultureCatalogItemGrid items={items} content={content.items} />
        )
      ) : null}
      {sectionVisibility.entries && sectionVisibility.map ? <KhndzoreskDivider /> : null}
      {sectionVisibility.map ? (
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
    </CultureCatalogShell>
  );
}
