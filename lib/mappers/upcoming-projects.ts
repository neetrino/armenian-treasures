import type {
  UpcomingProject,
  UpcomingProjectBadgeTone,
  UpcomingProjectIconKey,
} from '@/lib/constants/upcoming-projects';
import type { PublicProjectDTO } from '@/lib/dto';
import type { ProjectStatus } from '@prisma/client';

const STATUS_BADGE: Record<
  ProjectStatus,
  { badge: string; tone: UpcomingProjectBadgeTone }
> = {
  UPCOMING: { badge: 'COMING SOON', tone: 'teal' },
  ACTIVE: { badge: 'IN PROGRESS', tone: 'gold' },
  FUNDED: { badge: 'FUNDED', tone: 'gold' },
  COMPLETED: { badge: 'COMPLETED', tone: 'teal' },
  ARCHIVED: { badge: 'ARCHIVED', tone: 'teal' },
};

const CATEGORY_ICON: Record<string, UpcomingProjectIconKey> = {
  Architecture: 'digitalArchive',
  Manuscripts: 'digitalArchive',
  Music: 'documentarySeries',
  Sculpting: 'educationProgramme',
};

function resolveProjectIcon(category: string): UpcomingProjectIconKey {
  return CATEGORY_ICON[category] ?? 'diasporaNetwork';
}

export function mapProjectToUpcomingProject(
  project: PublicProjectDTO,
  index: number,
): UpcomingProject {
  const statusMeta = STATUS_BADGE[project.status];
  const region = project.region ? ` · ${project.region}` : '';

  return {
    number: String(index + 1).padStart(2, '0'),
    icon: resolveProjectIcon(project.category),
    badge: statusMeta.badge,
    badgeTone: statusMeta.tone,
    title: project.title.toUpperCase(),
    description: project.description ?? '',
    timeline: `${project.category}${region}`,
  };
}

export function mapProjectsToUpcomingProjects(projects: PublicProjectDTO[]): UpcomingProject[] {
  return projects.map(mapProjectToUpcomingProject);
}
