import { isFormRoute, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
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

function toExtraMegaMenuItem(parent: MenuNode, child: MenuNode): MegaMenuItem {
  return {
    label: child.title,
    href: resolveMenuHref(child, parent),
    icon: resolveMenuIconKey(child.slug, parent.slug),
    menuPath: `${parent.slug}/${child.slug}`,
  };
}

function collectMissingLiveItems(
  column: MegaMenuColumn,
  parent: MenuNode | undefined,
): MegaMenuItem[] {
  if (!parent) return [];
  const existing = columnItemKeys(column);
  return (parent.children ?? [])
    .filter((child) => child.isActive && !isFormRoute(child.routeType))
    .filter((child) => !existing.has(child.slug) && !existing.has(`${parent.slug}/${child.slug}`))
    .map((child) => toExtraMegaMenuItem(parent, child));
}

function mergeLiveChildrenIntoColumn(
  column: MegaMenuColumn,
  tree: MenuNode[],
): MegaMenuColumn {
  const headingPath = column.headingMenuPath;
  if (!headingPath) return column;

  const extras = collectMissingLiveItems(
    column,
    tree.find((node) => node.slug === headingPath),
  );
  if (extras.length === 0) return column;

  return { ...column, items: [...column.items, ...extras] };
}

/** Appends admin-added catalog children that the AT Features sheet does not list. */
export function mergeLiveChildrenIntoMegaMenu(
  columns: MegaMenuColumn[],
  tree: MenuNode[],
): MegaMenuColumn[] {
  return columns.map((column) => mergeLiveChildrenIntoColumn(column, tree));
}
