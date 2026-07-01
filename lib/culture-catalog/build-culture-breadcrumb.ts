import type { CultureCatalogBreadcrumbSegment } from '@/components/culture-catalog/CultureCatalogBreadcrumb';
import type { MenuNode } from '@/lib/culture-menu';

/** Builds breadcrumb segments from Cultural Portal root through optional parent category. */
export function buildCultureCatalogBreadcrumb(
  category: MenuNode,
  parent?: MenuNode | null,
): CultureCatalogBreadcrumbSegment[] {
  const segments: CultureCatalogBreadcrumbSegment[] = [];

  if (parent && parent.slug !== category.slug) {
    segments.push({ label: parent.title, href: `/culture/${parent.slug}` });
  }

  segments.push({ label: category.title });
  return segments;
}
