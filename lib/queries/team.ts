import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { toPublicTeamMember, type PublicTeamMemberDTO } from '@/lib/dto';

async function fetchActiveTeam(locale: SiteLocaleCode): Promise<PublicTeamMemberDTO[]> {
  try {
    const rows = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
    return rows.map((row) => toPublicTeamMember(row, locale));
  } catch {
    return [];
  }
}

const getActiveTeamCached = unstable_cache(fetchActiveTeam, ['team-active'], {
  tags: ['team'],
  revalidate: 60,
});

export async function getActiveTeam(): Promise<PublicTeamMemberDTO[]> {
  const locale = await getCurrentSiteLocale();
  return getActiveTeamCached(locale);
}
