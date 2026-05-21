import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicDonator, type PublicDonatorDTO } from '@/lib/dto';

async function fetchPublicDonators(): Promise<PublicDonatorDTO[]> {
  try {
    const rows = await prisma.donator.findMany({
      where: { isPublic: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
    return rows.map(toPublicDonator);
  } catch {
    return [];
  }
}

export const getPublicDonators = unstable_cache(fetchPublicDonators, ['donators-public'], {
  tags: ['donators'],
  revalidate: 60,
});
