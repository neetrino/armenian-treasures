import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicProject, type PublicProjectDTO } from '@/lib/dto';

async function fetchPublishedProjects(): Promise<PublicProjectDTO[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return rows.map(toPublicProject);
  } catch {
    return [];
  }
}

export const getPublishedProjects = unstable_cache(
  fetchPublishedProjects,
  ['projects-published'],
  { tags: ['projects'], revalidate: 60 },
);
