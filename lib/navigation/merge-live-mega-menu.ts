import { isFormRoute, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cultureMenuLabel } from '@/lib/i18n/messages/menu';
import type { MegaMenuColumn, MegaMenuItem } from '@/lib/navigation/culture-mega-menu';
import { resolveMenuIconKey } from '@/lib/navigation/menu-icons';
import { isRetiredCultureSlug } from '@/lib/culture-routes';

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

function isOrnamentsAlias(parentSlug: string, childSlug: string): boolean {
  return parentSlug === 'architecture' && childSlug === 'armaments';
}

/** Armaments is removed. Epic stays in Myths & Gods. */
const SHEET_OMITTED_SLUGS = new Set(['armaments']);

function collectMissingLiveItems(
  column: MegaMenuColumn,
  parent: MenuNode | undefined,
  locale: SiteLocaleCode,
  listed: Set<string>,
): MegaMenuItem[] {
  if (!parent) return [];
  return (parent.children ?? [])
    .filter((child) => child.isActive && !isFormRoute(child.routeType))
    .filter((child) => !isOrnamentsAlias(parent.slug, child.slug))
    .filter((child) => !SHEET_OMITTED_SLUGS.has(child.slug) && !isRetiredCultureSlug(child.slug))
    .filter((child) => !listed.has(child.slug) && !listed.has(`${parent.slug}/${child.slug}`))
    .map((child) => toExtraMegaMenuItem(parent, child, locale));
}

function listedMenuKeys(columns: MegaMenuColumn[]): Set<string> {
  const listed = new Set<string>();
  for (const column of columns) {
    for (const key of columnItemKeys(column)) listed.add(key);
  }
  return listed;
}

function mergeLiveChildrenIntoColumn(
  column: MegaMenuColumn,
  tree: MenuNode[],
  locale: SiteLocaleCode,
  listed: Set<string>,
): MegaMenuColumn {
  const headingPath = column.headingMenuPath;
  if (!headingPath) return column;

  const extras = collectMissingLiveItems(
    column,
    tree.find((node) => node.slug === headingPath),
    locale,
    listed,
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
  const listed = listedMenuKeys(columns);
  return columns.map((column) => mergeLiveChildrenIntoColumn(column, tree, locale, listed));
}
