import { isFormRoute, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cultureMenuLabel } from '@/lib/i18n/messages/menu';
import type { MegaMenuColumn, MegaMenuItem } from '@/lib/navigation/culture-mega-menu';
import { resolveMenuIconKey } from '@/lib/navigation/menu-icons';

function columnItemKeys(column: MegaMenuColumn): Set<string> {
  const keys = new Set<string>();
  for (const item of column.items) {
    const path = item.menuPath ?? '';
    if (!path) continue;
    keys.add(path);
    const slug = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path;
    if (slug) keys.add(slug);
  }
  return keys;
}

function toExtraMegaMenuItem(
  parent: MenuNode,
  child: MenuNode,
  locale: SiteLocaleCode,
): MegaMenuItem {
  const menuPath = `${parent.slug}/${child.slug}`;
  return {
    label: cultureMenuLabel(locale, menuPath) ?? cultureMenuLabel(locale, child.slug) ?? child.title,
    href: resolveMenuHref(child, parent),
    icon: resolveMenuIconKey(child.slug, parent.slug),
    menuPath,
  };
}

function collectMissingLiveItems(
  column: MegaMenuColumn,
  parent: MenuNode | undefined,
  locale: SiteLocaleCode,
): MegaMenuItem[] {
  if (!parent) return [];
  const existing = columnItemKeys(column);
  return (parent.children ?? [])
    .filter((child) => child.isActive && !isFormRoute(child.routeType))
    .filter((child) => !existing.has(child.slug) && !existing.has(`${parent.slug}/${child.slug}`))
    .map((child) => toExtraMegaMenuItem(parent, child, locale));
}

function mergeLiveChildrenIntoColumn(
  column: MegaMenuColumn,
  tree: MenuNode[],
  locale: SiteLocaleCode,
): MegaMenuColumn {
  const headingPath = column.headingMenuPath;
  if (!headingPath) return column;

  const extras = collectMissingLiveItems(
    column,
    tree.find((node) => node.slug === headingPath),
    locale,
  );
  if (extras.length === 0) return column;

  return { ...column, items: [...column.items, ...extras] };
}

/** Appends admin-added catalog children that the AT Features sheet does not list. */
export function mergeLiveChildrenIntoMegaMenu(
  columns: MegaMenuColumn[],
  tree: MenuNode[],
  locale: SiteLocaleCode = 'EN',
): MegaMenuColumn[] {
  return columns.map((column) => mergeLiveChildrenIntoColumn(column, tree, locale));
}
