import { isFormRoute, type MenuNode } from '@/lib/culture-menu';

export interface SubmitCategoryOption {
  id: string;
  title: string;
}

export interface ResolvedSubmitCategory {
  categoryLabel: string;
  parentCategorySlug: string | null;
  parentCategoryTitle: string | null;
}

interface MenuItemWithParent {
  id: string;
  title: string;
  slug: string;
  parent?: { title: string; slug: string } | null;
}

/** Flat list of assignable menu targets for the public submit form (IDs are unique). */
export function buildSubmitCategoryOptions(tree: MenuNode[]): SubmitCategoryOption[] {
  const options: SubmitCategoryOption[] = [];
  for (const node of tree) {
    if (!node.isActive || isFormRoute(node.routeType)) continue;
    options.push({ id: node.id, title: node.title });
    for (const child of node.children ?? []) {
      if (!child.isActive || isFormRoute(child.routeType)) continue;
      options.push({ id: child.id, title: `${node.title} / ${child.title}` });
    }
  }
  return options;
}

export function resolveSubmitCategoryFromMenuItem(
  menuItem: MenuItemWithParent,
): ResolvedSubmitCategory {
  if (menuItem.parent) {
    return {
      categoryLabel: `${menuItem.parent.title} / ${menuItem.title}`,
      parentCategorySlug: menuItem.parent.slug,
      parentCategoryTitle: menuItem.parent.title,
    };
  }
  return {
    categoryLabel: menuItem.title,
    parentCategorySlug: menuItem.slug,
    parentCategoryTitle: menuItem.title,
  };
}
