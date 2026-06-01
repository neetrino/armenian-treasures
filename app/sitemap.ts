import type { MetadataRoute } from 'next';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { getPublishedCultureItemSlugs } from '@/lib/queries/culture-items';
import { prisma } from '@/lib/db';

const STATIC_PATHS = [
  '/',
  '/about/mission',
  '/about/team',
  '/about/career',
  '/culture',
  '/culture/submit',
  '/projects',
  '/map',
  '/partnership',
  '/donators',
  '/contacts',
];

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));

  try {
    const menuRows = await prisma.cultureMenuItem.findMany({
      where: { isActive: true },
      orderBy: [{ parentId: 'asc' }, { order: 'asc' }],
      include: { parent: true },
    });
    for (const row of menuRows) {
      const path = row.parent ? `/culture/${row.parent.slug}/${row.slug}` : `/culture/${row.slug}`;
      entries.push({
        url: `${base}${path}`,
        lastModified: row.updatedAt ?? now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  } catch {
    // ignore DB failures (e.g. during local builds without DB)
  }

  try {
    const itemRows = await getPublishedCultureItemSlugs();
    for (const row of itemRows) {
      entries.push({
        url: `${base}${resolveCultureItemHref(row.slug)}`,
        lastModified: row.updatedAt ?? now,
        changeFrequency: 'monthly',
        priority: 0.55,
      });
    }
  } catch {
    // ignore DB failures (e.g. during local builds without DB)
  }

  return entries;
}

export default sitemap;
