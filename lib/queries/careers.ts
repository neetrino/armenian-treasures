import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicCareer, type PublicCareerDTO } from '@/lib/dto';

async function fetchActiveCareers(): Promise<PublicCareerDTO[]> {
  try {
    const rows = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    });
    return rows.map(toPublicCareer);
  } catch {
    return [];
  }
}

export const getActiveCareers = unstable_cache(fetchActiveCareers, ['careers-active'], {
  tags: ['careers'],
  revalidate: 60,
});
