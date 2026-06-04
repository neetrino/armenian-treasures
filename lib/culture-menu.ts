import type { MenuRouteType } from '@prisma/client';

export interface MenuNode {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  routeType: MenuRouteType;
  customUrl?: string | null;
  order: number;
  isActive: boolean;
  parentId?: string | null;
  children?: MenuNode[];
}

export function resolveMenuHref(item: MenuNode, parent?: MenuNode): string {
  switch (item.routeType) {
    case 'SUBCATEGORY_FORM':
      return `/culture/${parent?.slug ?? item.slug}/new`;
    case 'PROJECT_SUBMIT_FORM':
      return '/culture/submit';
    case 'CUSTOM_URL':
      return item.customUrl ?? '#';
    case 'SUBCATEGORY':
      return `/culture/${parent?.slug ?? ''}/${item.slug}`;
    case 'CATEGORY':
    default:
      return `/culture/${item.slug}`;
  }
}

export function isFormRoute(routeType: MenuRouteType): boolean {
  return routeType === 'SUBCATEGORY_FORM' || routeType === 'PROJECT_SUBMIT_FORM';
}

/** Top-level categories shown in the home / culture portal carousel. */
export function filterCulturePortalCarouselNodes(nodes: MenuNode[]): MenuNode[] {
  return nodes.filter(
    (node) => node.isActive && !isFormRoute(node.routeType) && node.slug !== 'architecture',
  );
}

export function buildMenuTree<T extends MenuNode>(nodes: T[]): T[] {
  const byId = new Map<string, T & { children: T[] }>();
  for (const node of nodes) {
    byId.set(node.id, { ...node, children: [] });
  }
  const roots: T[] = [];
  for (const node of byId.values()) {
    if (node.parentId) {
      const parent = byId.get(node.parentId);
      if (parent) {
        parent.children.push(node);
        continue;
      }
    }
    roots.push(node);
  }
  const sortChildren = (list: T[]): void => {
    list.sort((a, b) => a.order - b.order);
    for (const child of list) {
      const inflated = child as T & { children?: T[] };
      if (inflated.children) sortChildren(inflated.children);
    }
  };
  sortChildren(roots);
  return roots;
}
