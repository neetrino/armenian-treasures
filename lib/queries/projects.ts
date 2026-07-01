import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { toPublicProject, type PublicProjectDTO } from '@/lib/dto';

export const HOME_UPCOMING_PROJECTS_LIMIT = 3;

async function fetchPublishedProjects(
  locale: SiteLocaleCode,
  limit?: number,
): Promise<PublicProjectDTO[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      ...(limit !== undefined ? { take: limit } : {}),
    });
    return rows.map((row) => toPublicProject(row, locale));
  } catch {
    return [];
  }
}

const getPublishedProjectsCached = unstable_cache(
  fetchPublishedProjects,
  ['projects-published'],
  { tags: ['projects'], revalidate: 60 },
);

export async function getPublishedProjects(limit?: number): Promise<PublicProjectDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getPublishedProjectsCached(locale, limit);
}
