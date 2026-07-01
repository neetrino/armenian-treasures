import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { toPublicDonator, type PublicDonatorDTO } from '@/lib/dto';

async function fetchPublicDonators(locale: SiteLocaleCode): Promise<PublicDonatorDTO[]> {
  try {
    const rows = await prisma.donator.findMany({
      where: { isPublic: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
    return rows.map((row) => toPublicDonator(row, locale));
  } catch {
    return [];
  }
}

const getPublicDonatorsCached = unstable_cache(fetchPublicDonators, ['donators-public'], {
  tags: ['donators'],
  revalidate: 60,
});

export async function getPublicDonators(): Promise<PublicDonatorDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getPublicDonatorsCached(locale);
}
