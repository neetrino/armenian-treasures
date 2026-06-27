import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { CulturalPortalStatsBar } from '@/components/cultural-portal-page/CulturalPortalStatsBar';
import { CultureCatalogAbout } from '@/components/culture-catalog/CultureCatalogAbout';
import { CultureCatalogHero } from '@/components/culture-catalog/CultureCatalogHero';
import { CultureCatalogItemGrid } from '@/components/culture-catalog/CultureCatalogItemGrid';
import { CultureCatalogShell } from '@/components/culture-catalog/CultureCatalogShell';
import { CultureCatalogSubcategoryGrid } from '@/components/culture-catalog/CultureCatalogSubcategoryGrid';
import { resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { resolveCultureCatalogContent } from '@/lib/constants/culture-catalog-content';
import { buildCultureCatalogCategoryStats } from '@/lib/mappers/culture-catalog-page';
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
  const content = resolveCultureCatalogContent(category);
  const hasChildren = subcategories.length > 0;
  const stats = buildCultureCatalogCategoryStats(
    subcategories.length,
    hasChildren ? totalChildItems : items.length,
    { entries: hasChildren ? 'Sub-catalogs' : content.statLabels.entries, regions: 'Total Entries' },
  );

  const formHref = formChild ? resolveMenuHref(formChild, category) : null;

  return (
    <CultureCatalogShell>
      <CultureCatalogHero
        title={category.title}
        eyebrow={content.eyebrow}
        accent={content.accent}
        slogan={content.slogan}
        description={category.description ?? content.about.description}
        heroImage={content.heroImage}
        breadcrumb={[{ label: category.title }]}
        ctas={[
          { label: hasChildren ? 'Browse Sub-catalogs' : 'Explore Entries', href: '#entries', variant: 'gold' },
          { label: 'Add your project', href: '/culture/submit', variant: 'teal' },
          ...(formHref
            ? [{ label: 'Add sub-catalog', href: formHref, variant: 'outline' as const }]
            : []),
        ]}
      />
      <CulturalPortalStatsBar stats={stats} />
      <CultureCatalogAbout content={content.about} />
      <KhndzoreskDivider />
      {hasChildren ? (
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
      )}
    </CultureCatalogShell>
  );
}
