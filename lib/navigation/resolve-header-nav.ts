import type { MenuNode } from '@/lib/culture-menu';
import type { NavDropdownLink } from '@/components/navigation/primary-links';
import { PROJECTS_MENU } from '@/components/navigation/primary-links';
import {
  CULTURE_MEGA_MENU,
  type MegaMenuColumn,
} from '@/lib/navigation/culture-mega-menu';
import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';

function applyMenuHrefMap(columns: MegaMenuColumn[], tree: MenuNode[]): MegaMenuColumn[] {
  const hrefMap = buildMenuHrefMap(tree);

  return columns.map((column) => ({
    ...column,
    items: column.items.map((item) => ({
      ...item,
      href: item.menuPath
        ? resolveMenuHrefFromMap(hrefMap, item.menuPath, item.href)
        : item.href,
    })),
  }));
}

/** Figma canonical 4-column Cultural Portal mega menu (19 items). */
export function resolveCultureMegaMenu(tree: MenuNode[]): MegaMenuColumn[] {
  return applyMenuHrefMap(CULTURE_MEGA_MENU, tree);
}

export function resolveProjectsNavItems(): NavDropdownLink[] {
  return PROJECTS_MENU;
}
