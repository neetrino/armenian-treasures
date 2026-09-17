import type { MenuNode } from '@/lib/culture-menu';
import type { NavDropdownLink } from '@/components/navigation/primary-links';
import { PROJECTS_MENU } from '@/components/navigation/primary-links';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { projectMenuLabel } from '@/lib/i18n/messages/menu';
import { buildCultureMegaMenuFromAtFeatures } from '@/lib/navigation/at-features-culture-menu';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';
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
export function resolveCultureMegaMenu(
  tree: MenuNode[],
  locale: SiteLocaleCode = 'EN',
): MegaMenuColumn[] {
  const columns = applyMenuHrefMap(buildCultureMegaMenuFromAtFeatures(locale), tree);
  return mergeLiveChildrenIntoMegaMenu(columns, tree);
}

export function resolveProjectsNavItems(locale: SiteLocaleCode = 'EN'): NavDropdownLink[] {
  return PROJECTS_MENU.map((item) => ({
    ...item,
    label: (item.id ? projectMenuLabel(locale, item.id) : null) ?? item.label,
  }));
}
