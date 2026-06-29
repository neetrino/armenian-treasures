import type { MetadataRoute } from 'next';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { getPublishedCultureItemSlugs } from '@/lib/queries/culture-items';
import { getMenuTree } from '@/lib/queries/menu';
import { collectMenuSitemapPaths } from '@/lib/sitemap/menu-paths';
import { getSiteUrl } from '@/lib/site-url';

const STATIC_PATHS = [
  '/',
  '/about/mission',
  '/about/team',
  '/about/career',
  '/culture',
  '/culture/submit',
  '/projects',
  '/partnership',
  '/donate',
  '/contacts',
  '/khndzoresk',
  '/khachaturian-museum',
  '/national-gallery-armenia',
];

function entryForPath(
  base: string,
  path: string,
  now: Date,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
  };
}

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const pushPath = (path: string, priority: number): void => {
    if (seen.has(path)) return;
    seen.add(path);
    entries.push(entryForPath(base, path, now, priority));
  };

  for (const path of STATIC_PATHS) {
    pushPath(path, path === '/' ? 1 : 0.7);
  }

  try {
    const tree = await getMenuTree();
    for (const path of collectMenuSitemapPaths(tree)) {
      pushPath(path, 0.6);
    }
  } catch {
    // ignore DB failures (e.g. during local builds without DB)
  }

  try {
    const itemRows = await getPublishedCultureItemSlugs();
    for (const row of itemRows) {
      pushPath(resolveCultureItemHref(row.slug), 0.55);
    }
  } catch {
    // ignore DB failures (e.g. during local builds without DB)
  }

  return entries;
}

export default sitemap;
