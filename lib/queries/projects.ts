import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicProject, type PublicProjectDTO } from '@/lib/dto';

export const HOME_UPCOMING_PROJECTS_LIMIT = 3;

async function fetchPublishedProjects(limit?: number): Promise<PublicProjectDTO[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      ...(limit !== undefined ? { take: limit } : {}),
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
