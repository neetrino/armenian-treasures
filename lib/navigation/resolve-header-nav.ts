import type { MenuNode } from '@/lib/culture-menu';
import type { NavDropdownLink } from '@/components/navigation/primary-links';
import { PROJECTS_MENU } from '@/components/navigation/primary-links';
import {
  CULTURE_MEGA_MENU,
  type MegaMenuColumn,
} from '@/lib/navigation/culture-mega-menu';
import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';
import { mergeLiveChildrenIntoMegaMenu } from '@/lib/navigation/merge-live-mega-menu';

function applyMenuHrefMap(columns: MegaMenuColumn[], tree: MenuNode[]): MegaMenuColumn[] {
  const hrefMap = buildMenuHrefMap(tree);

  return columns.map((column) => ({
    ...column,
    headingHref: column.headingMenuPath
      ? resolveMenuHrefFromMap(hrefMap, column.headingMenuPath, column.headingHref)
      : column.headingHref,
    items: column.items.map((item) => ({
      ...item,
      href: item.menuPath
        ? resolveMenuHrefFromMap(hrefMap, item.menuPath, item.href)
        : item.href,
    })),
  }));
}

/** AT Features columns plus any extra children from the live admin menu tree. */
export function resolveCultureMegaMenu(tree: MenuNode[]): MegaMenuColumn[] {
  return mergeLiveChildrenIntoMegaMenu(applyMenuHrefMap(CULTURE_MEGA_MENU, tree), tree);
}

export function resolveProjectsNavItems(): NavDropdownLink[] {
  return PROJECTS_MENU;
}
