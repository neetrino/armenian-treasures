import { revalidatePath, revalidateTag } from 'next/cache';
import { buildMenuTree, resolveMenuHref, type MenuNode } from '@/lib/culture-menu';
import { prisma } from '@/lib/db';
import { isIndexableInternalPath, collectMenuSitemapPaths } from '@/lib/sitemap/menu-paths';
import type { PageContentSlug } from '@/lib/types/page-content';

/** Public pages that share `(public)/layout` chrome (header + footer). */
export const PUBLIC_LAYOUT_PATHS = [
  '/',
  '/culture',
  '/culture/submit',
  '/projects',
  '/donate',
  '/blog',
  '/partnership',
  '/contacts',
  '/about/mission',
  '/about/team',
  '/about/career',
  '/khndzoresk',
  '/khachaturian-museum',
  '/national-gallery-armenia',
  '/map',
  '/virtual-museum',
] as const;

export const PAGE_CONTENT_PUBLIC_PATHS: Record<PageContentSlug, readonly string[]> = {
  'donation-page': ['/donate'],
  'partnership-page': ['/partnership'],
  'cultural-portal-page': ['/culture'],
  'contacts-page': ['/contacts'],
  'projects-page': ['/projects'],
  khndzoresk: ['/khndzoresk'],
  'khachaturian-museum': ['/khachaturian-museum'],
  'national-gallery-armenia': ['/national-gallery-armenia'],
};

export const PUBLIC_API_ROUTES = {
  home: '/api/home',
  settings: '/api/settings',
  projects: '/api/projects',
  donators: '/api/donators',
  map: '/api/map',
  cultureMenu: '/api/culture/menu',
  cultureItems: '/api/culture/items',
  team: '/api/team',
  careers: '/api/careers',
  blogPosts: '/api/blog-posts',
} as const;

export function revalidatePublicApiRoutes(routes: readonly string[]): void {
  for (const route of routes) {
    revalidatePath(route);
  }
}

/** Refreshes header/footer layout segments on all main public routes. */
export function revalidatePublicLayoutChrome(): void {
  for (const path of PUBLIC_LAYOUT_PATHS) {
    revalidatePath(path, 'layout');
  }
}

export function revalidatePublicPages(paths: readonly string[]): void {
  for (const path of paths) {
    revalidatePath(path);
  }
}

export async function revalidateCultureCatalogPaths(): Promise<void> {
  try {
    const rows = await prisma.cultureMenuItem.findMany({
      where: { isActive: true },
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
    });
    const tree = buildMenuTree(rows as MenuNode[]);
    for (const path of collectMenuSitemapPaths(tree)) {
      revalidatePath(path);
    }
  } catch {
    revalidatePath('/culture');
  }
}

export async function revalidateCultureCatalogPathForMenuItem(menuItemId: string): Promise<void> {
  try {
    const row = await prisma.cultureMenuItem.findUnique({
      where: { id: menuItemId },
      include: { parent: true },
    });
    if (!row?.isActive) return;
    const href = resolveMenuHref(row as MenuNode, (row.parent as MenuNode | null) ?? undefined);
    if (isIndexableInternalPath(href)) {
      revalidatePath(href);
    }
  } catch {
    // ignore — tag invalidation still applied by caller
  }
}

export function revalidatePageContentSlug(slug: PageContentSlug): void {
  revalidateTag(`page-content-${slug}`, 'max');
  revalidateTag('page-content', 'max');
  revalidatePublicPages(PAGE_CONTENT_PUBLIC_PATHS[slug]);
  revalidatePath(`/admin/page-content/${slug}`);
}

export function revalidateSiteSettingsCache(): void {
  revalidateTag('site-settings', 'max');
  revalidatePublicLayoutChrome();
  revalidatePublicPages(['/contacts']);
  revalidatePath('/admin/settings');
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.settings]);
}

export function revalidateHomeContentCache(): void {
  revalidateTag('home-content', 'max');
  revalidatePublicPages(['/', '/culture']);
  revalidatePath('/admin/home-content');
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.home]);
}

export function revalidateProjectsCache(): void {
  revalidateTag('projects', 'max');
  revalidatePublicPages(['/projects', '/', '/culture']);
  revalidatePath('/admin/projects');
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.projects]);
}

export function revalidateDonatorsCache(): void {
  revalidateTag('donators', 'max');
  revalidatePublicPages(['/donate', '/', '/culture']);
  revalidatePath('/admin/donators');
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.donators]);
}

export async function revalidateCultureMenuCache(): Promise<void> {
  revalidateTag('culture-menu', 'max');
  revalidateTag('culture-items', 'max');
  revalidatePublicLayoutChrome();
  revalidatePublicPages(['/', '/culture']);
  revalidatePath('/admin/culture-menu');
  revalidatePath('/admin/culture-pages');
  await revalidateCultureCatalogPaths();
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.cultureMenu]);
}

export async function revalidateCultureItemCache(
  slugs: string[],
  menuItemIds: string[] = [],
): Promise<void> {
  revalidateTag('culture-items', 'max');
  revalidatePublicPages(['/culture', '/']);
  revalidatePath('/admin/culture-items');
  for (const slug of slugs) {
    const trimmed = slug.trim();
    if (!trimmed) continue;
    revalidatePath(`/culture/item/${trimmed}`);
    revalidatePath(`/api/culture/items/${trimmed}`);
  }
  const uniqueMenuIds = [...new Set(menuItemIds.filter((id) => id.trim().length > 0))];
  await Promise.all(uniqueMenuIds.map((id) => revalidateCultureCatalogPathForMenuItem(id)));
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.map, PUBLIC_API_ROUTES.cultureItems]);
}

export function revalidateTeamCache(): void {
  revalidateTag('team', 'max');
  revalidatePublicPages(['/about/team']);
  revalidatePath('/admin/team');
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.team]);
}

export function revalidateCareersCache(): void {
  revalidateTag('careers', 'max');
  revalidatePublicPages(['/about/career']);
  revalidatePath('/admin/careers');
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.careers]);
}

export function revalidateBlogPostsCache(slugs: string[] = []): void {
  revalidateTag('blog-posts', 'max');
  revalidatePublicPages(['/blog']);
  revalidatePath('/admin/blog');
  for (const slug of slugs) {
    const trimmed = slug.trim();
    if (!trimmed) continue;
    revalidatePath(`/blog/${trimmed}`);
  }
  revalidatePublicApiRoutes([PUBLIC_API_ROUTES.blogPosts]);
}

export function revalidateAboutContentCache(): void {
  revalidateTag('about-content', 'max');
  revalidatePublicPages(['/about/mission', '/about/team', '/about/career']);
  revalidatePath('/admin/about-content');
}
