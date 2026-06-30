import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { logQueryFallback } from '@/lib/observability/log-query-fallback';
import { resolveLandingImg } from '@/lib/page-content-images';
import {
  buildDefaultCulturalPortalPageContent,
  buildDefaultDonationPageContent,
  buildDefaultKhachaturianContent,
  buildDefaultKhndzoreskContent,
  buildDefaultNationalGalleryContent,
  buildDefaultPartnershipPageContent,
  buildDefaultStaticPageHeroContent,
  parseCulturalPortalPageContent,
  parseDonationPageContent,
  parseKhachaturianPageContent,
  parseKhndzoreskPageContent,
  parseNationalGalleryPageContent,
  parsePartnershipPageContent,
  parseStaticPageHeroContent,
  type CulturalPortalPageContent,
  type DonationPageContent,
  type KhachaturianPageContent,
  type KhndzoreskPageContent,
  type NationalGalleryPageContent,
  type PageContentSlug,
  type PartnershipPageContent,
  type StaticPageHeroContent,
} from '@/lib/types/page-content';

async function fetchPageContentRaw(slug: PageContentSlug): Promise<unknown | null> {
  try {
    const row = await prisma.pageContent.findUnique({ where: { slug } });
    return row?.content ?? null;
  } catch {
    logQueryFallback({ query: `page-content:${slug}`, reason: 'db-error' });
    return null;
  }
}

function createPageContentGetter<T>(
  slug: PageContentSlug,
  fallback: () => T,
  parse: (value: unknown) => T,
): () => Promise<T> {
  return unstable_cache(
    async () => {
      const raw = await fetchPageContentRaw(slug);
      if (raw === null) return fallback();
      return parse(raw);
    },
    [`page-content-${slug}`],
    { tags: [`page-content-${slug}`, 'page-content'], revalidate: 60 },
  );
}

export const getDonationPageContent = createPageContentGetter(
  'donation-page',
  buildDefaultDonationPageContent,
  parseDonationPageContent,
);

export const getPartnershipPageContent = createPageContentGetter(
  'partnership-page',
  buildDefaultPartnershipPageContent,
  parsePartnershipPageContent,
);

export const getCulturalPortalPageContent = createPageContentGetter(
  'cultural-portal-page',
  buildDefaultCulturalPortalPageContent,
  parseCulturalPortalPageContent,
);

export const getKhndzoreskPageContent = createPageContentGetter(
  'khndzoresk',
  buildDefaultKhndzoreskContent,
  parseKhndzoreskPageContent,
);

export const getKhachaturianPageContent = createPageContentGetter(
  'khachaturian-museum',
  buildDefaultKhachaturianContent,
  parseKhachaturianPageContent,
);

export const getNationalGalleryPageContent = createPageContentGetter(
  'national-gallery-armenia',
  buildDefaultNationalGalleryContent,
  parseNationalGalleryPageContent,
);

export const getContactsPageContent = createPageContentGetter(
  'contacts-page',
  buildDefaultStaticPageHeroContent,
  parseStaticPageHeroContent,
);

export const getProjectsPageContent = createPageContentGetter(
  'projects-page',
  buildDefaultStaticPageHeroContent,
  parseStaticPageHeroContent,
);

export type {
  CulturalPortalPageContent,
  DonationPageContent,
  KhachaturianPageContent,
  KhndzoreskPageContent,
  NationalGalleryPageContent,
  PartnershipPageContent,
  StaticPageHeroContent,
};

export function khndzoreskImg(imgBase: string, filename: string): string {
  return resolveLandingImg(imgBase, filename);
}

export function khachaturianImg(imgBase: string, filename: string): string {
  return resolveLandingImg(imgBase, filename);
}

export function ngaImg(imgBase: string, filename: string): string {
  return resolveLandingImg(imgBase, filename);
}
