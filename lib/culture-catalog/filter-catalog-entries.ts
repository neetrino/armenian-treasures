import type { MenuNode } from '@/lib/culture-menu';
import type { PublicCultureItemDTO } from '@/lib/dto';
import { filterMapItemsBySearch } from '@/lib/constants/heritage-map-filters';

export function filterCatalogItemsBySearch(
  items: PublicCultureItemDTO[],
  query: string,
): PublicCultureItemDTO[] {
  return filterMapItemsBySearch(items, query);
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
