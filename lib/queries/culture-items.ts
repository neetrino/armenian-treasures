import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  toPublicCultureItem,
  toPublicCultureItemDetail,
  type PublicCultureItemDTO,
  type PublicCultureItemDetailDTO,
} from '@/lib/dto';
import { FEATURED_TREASURE_COUNT, HIGHLIGHT_TREASURE_COUNT } from '@/lib/constants/featured-treasures';
import { fetchHomepageFeaturedIds } from '@/lib/queries/featured-home-sql';

async function fetchPublishedItemsByMenu(
  locale: SiteLocaleCode,
  menuItemId: string,
): Promise<PublicCultureItemDTO[]> {
  try {
    const rows = await prisma.cultureItem.findMany({
      where: { menuItemId, status: 'PUBLISHED' },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    return rows.map((row) => toPublicCultureItem(row, locale));
  } catch {
    return [];
  }
}

const getItemsByMenuItemCached = unstable_cache(
  fetchPublishedItemsByMenu,
  ['culture-items-by-menu'],
  { tags: ['culture-items'], revalidate: 60 },
);

export async function getItemsByMenuItem(menuItemId: string): Promise<PublicCultureItemDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getItemsByMenuItemCached(locale, menuItemId);
}

async function fetchItemBySlug(locale: SiteLocaleCode, slug: string): Promise<PublicCultureItemDTO | null> {
  try {
    const row = await prisma.cultureItem.findUnique({ where: { slug } });
    if (!row || row.status !== 'PUBLISHED') return null;
    return toPublicCultureItem(row, locale);
  } catch {
    return null;
  }
}

const getCultureItemBySlugCached = unstable_cache(
  fetchItemBySlug,
  ['culture-item-by-slug'],
  { tags: ['culture-items'], revalidate: 60 },
);

export async function getCultureItemBySlug(slug: string): Promise<PublicCultureItemDTO | null> {
  const locale = await getCurrentSiteLocale();
  return getCultureItemBySlugCached(locale, slug);
}

async function fetchCultureItemDetailBySlug(
  locale: SiteLocaleCode,
  slug: string,
): Promise<PublicCultureItemDetailDTO | null> {
  try {
    const row = await prisma.cultureItem.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        menuItem: {
          include: { parent: true },
        },
      },
    });
    if (!row) return null;
    return toPublicCultureItemDetail(row, locale);
  } catch {
    return null;
  }
}

const getCultureItemDetailBySlugCached = unstable_cache(
  fetchCultureItemDetailBySlug,
  ['culture-item-detail-by-slug'],
  { tags: ['culture-items'], revalidate: 60 },
);

export async function getCultureItemDetailBySlug(
  slug: string,
): Promise<PublicCultureItemDetailDTO | null> {
  const locale = await getCurrentSiteLocale();
  return getCultureItemDetailBySlugCached(locale, slug);
}

async function fetchMapItems(locale: SiteLocaleCode): Promise<PublicCultureItemDTO[]> {
  try {
    const rows = await prisma.cultureItem.findMany({
      where: {
        showOnMap: true,
        status: 'PUBLISHED',
        latitude: { not: null },
        longitude: { not: null },
      },
      orderBy: { title: 'asc' },
    });
    return rows.map((row) => toPublicCultureItem(row, locale));
  } catch {
    return [];
  }
}

const getMapItemsCached = unstable_cache(fetchMapItems, ['culture-map-items'], {
  tags: ['culture-items'],
  revalidate: 60,
});

export async function getMapItems(): Promise<PublicCultureItemDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getMapItemsCached(locale);
}

async function fetchPublishedCultureItems(
  locale: SiteLocaleCode,
): Promise<PublicCultureItemDTO[]> {
  try {
    const rows = await prisma.cultureItem.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    return rows.map((row) => toPublicCultureItem(row, locale));
  } catch {
    return [];
  }
}

const getPublishedCultureItemsCached = unstable_cache(
  fetchPublishedCultureItems,
  ['culture-items-published'],
  { tags: ['culture-items'], revalidate: 60 },
);

export async function getPublishedCultureItems(): Promise<PublicCultureItemDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getPublishedCultureItemsCached(locale);
}

const cultureItemDetailInclude = {
  menuItem: {
    include: { parent: true },
  },
} as const;

function sortCultureItemsByIds<T extends { id: string }>(rows: T[], ids: string[]): T[] {
  const order = new Map(ids.map((id, index) => [id, index]));
  return [...rows].sort((left, right) => (order.get(left.id) ?? 0) - (order.get(right.id) ?? 0));
}

async function fetchFeaturedCultureItems(
  locale: SiteLocaleCode,
  limit = FEATURED_TREASURE_COUNT,
): Promise<PublicCultureItemDetailDTO[]> {
  try {
    const ids = await fetchHomepageFeaturedIds(limit);
    if (ids.length === 0) {
      return [];
    }
    const rows = await prisma.cultureItem.findMany({
      where: { id: { in: ids } },
      include: cultureItemDetailInclude,
    });
    return sortCultureItemsByIds(rows, ids).map((row) => toPublicCultureItemDetail(row, locale));
  } catch {
    return [];
  }
}

const getFeaturedCultureItemsCached = unstable_cache(
  fetchFeaturedCultureItems,
  ['culture-items-featured-v2'],
  { tags: ['culture-items'], revalidate: 60 },
);

export async function getFeaturedCultureItems(
  limit = FEATURED_TREASURE_COUNT,
): Promise<PublicCultureItemDetailDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getFeaturedCultureItemsCached(locale, limit);
}

async function fetchHighlightCultureItems(
  locale: SiteLocaleCode,
  limit = HIGHLIGHT_TREASURE_COUNT,
): Promise<PublicCultureItemDetailDTO[]> {
  try {
    const excludeIds = await fetchHomepageFeaturedIds(FEATURED_TREASURE_COUNT);
    const rows = await prisma.cultureItem.findMany({
      where: {
        status: 'PUBLISHED',
        ...(excludeIds.length > 0 ? { id: { notIn: excludeIds } } : {}),
      },
      include: cultureItemDetailInclude,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return rows.map((row) => toPublicCultureItemDetail(row, locale));
  } catch {
    return [];
  }
}

const getHighlightCultureItemsCached = unstable_cache(
  fetchHighlightCultureItems,
  ['culture-items-highlights-v2'],
  { tags: ['culture-items'], revalidate: 60 },
);

export async function getHighlightCultureItems(
  limit = HIGHLIGHT_TREASURE_COUNT,
): Promise<PublicCultureItemDetailDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getHighlightCultureItemsCached(locale, limit);
}

export async function getPublishedCultureItemSlugs(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  try {
    return await prisma.cultureItem.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: 'asc' },
    });
  } catch {
    return [];
  }
}
