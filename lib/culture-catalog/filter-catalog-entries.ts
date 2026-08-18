import type { CatalogSearchFilters } from '@/lib/culture-catalog/catalog-search-params';
import type { MenuNode } from '@/lib/culture-menu';
import type { PublicCultureItemDTO } from '@/lib/dto';
import { filterMapItemsBySearch } from '@/lib/constants/heritage-map-filters';

export function filterCatalogItemsBySearch(
  items: PublicCultureItemDTO[],
  query: string,
): PublicCultureItemDTO[] {
  return filterMapItemsBySearch(items, query);
}

function matchesRegion(item: PublicCultureItemDTO, region: string): boolean {
  if (!region) return true;
  return item.region?.toLowerCase() === region.toLowerCase();
}

function matchesType(item: PublicCultureItemDTO, type: string): boolean {
  if (!type) return true;
  return item.itemType === type;
}

function matchesPeriod(item: PublicCultureItemDTO, period: string): boolean {
  if (!period) return true;
  const needle = period.toLowerCase();
  const label = item.periodLabel?.toLowerCase() ?? '';
  if (label === needle || label.includes(needle) || needle.includes(label)) {
    return label.length > 0;
  }
  const centuryMatch = needle.match(/^(\d+)(?:st|nd|rd|th)/);
  if (centuryMatch && item.century != null) {
    return item.century === Number(centuryMatch[1]);
  }
  return false;
}

export function filterCatalogItems(
  items: PublicCultureItemDTO[],
  filters: CatalogSearchFilters,
): PublicCultureItemDTO[] {
  return filterCatalogItemsBySearch(items, filters.q).filter(
    (item) =>
      matchesRegion(item, filters.region) &&
      matchesPeriod(item, filters.period) &&
      matchesType(item, filters.type),
  );
}

export function filterCatalogSubcategoriesBySearch(
  nodes: MenuNode[],
  query: string,
): MenuNode[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return nodes;

  return nodes.filter((node) => {
    const searchable = [node.title, node.description, node.slug.replaceAll('-', ' ')];
    return searchable.some((value) => value?.toLowerCase().includes(normalized));
  });
}
