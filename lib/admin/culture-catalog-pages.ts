import { CULTURE_MEGA_MENU, type MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';

export interface CultureCatalogPageNavItem {
  label: string;
  menuPath: string;
  publicHref: string;
  icon: string;
}

export interface CultureCatalogPageGroup {
  heading: string;
  items: CultureCatalogPageNavItem[];
}

export const CULTURE_CATALOG_PAGE_GROUPS: CultureCatalogPageGroup[] = CULTURE_MEGA_MENU.map(
  (column: MegaMenuColumn) => ({
    heading: column.heading,
    items: column.items.map((item) => ({
      label: item.label,
      menuPath: item.menuPath ?? item.href.replace(/^\/culture\/?/, ''),
      publicHref: item.href,
      icon: item.icon,
    })),
  }),
);

export const CULTURE_CATALOG_PAGE_PATHS: readonly string[] = [
  ...new Set(CULTURE_CATALOG_PAGE_GROUPS.flatMap((group) => group.items.map((item) => item.menuPath))),
];

export function isCultureCatalogPagePath(value: string): boolean {
  return (CULTURE_CATALOG_PAGE_PATHS as readonly string[]).includes(value);
}

export function findCultureCatalogNavItem(menuPath: string): CultureCatalogPageNavItem | undefined {
  for (const group of CULTURE_CATALOG_PAGE_GROUPS) {
    const match = group.items.find((item) => item.menuPath === menuPath);
    if (match) return match;
  }
  return undefined;
}

export function cultureCatalogPageAdminHref(menuPath: string): string {
  return `/admin/culture-pages/${menuPath}`;
}
