import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { toPublicCareer, type PublicCareerDTO } from '@/lib/dto';

async function fetchActiveCareers(locale: SiteLocaleCode): Promise<PublicCareerDTO[]> {
  try {
    const rows = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    return rows.map((row) => toPublicCareer(row, locale));
  } catch {
    return [];
  }
}

const getActiveCareersCached = unstable_cache(fetchActiveCareers, ['careers-active'], {
  tags: ['careers'],
  revalidate: 60,
});

export async function getActiveCareers(): Promise<PublicCareerDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getActiveCareersCached(locale);
}
