import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicTeamMember, type PublicTeamMemberDTO } from '@/lib/dto';

async function fetchActiveTeam(): Promise<PublicTeamMemberDTO[]> {
  try {
    const rows = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
    return rows.map(toPublicTeamMember);
  } catch {
    return [];
  }
}

export const getActiveTeam = unstable_cache(fetchActiveTeam, ['team-active'], {
  tags: ['team'],
  revalidate: 60,
});
