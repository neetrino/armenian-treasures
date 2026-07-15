import type {
  CulturalPortalProject,
  CulturalPortalProjectIcon,
  CulturalPortalProjectStatus,
} from '@/lib/constants/cultural-portal-page';
import type { PublicProjectDTO } from '@/lib/dto';
import type { ProjectStatus } from '@prisma/client';

const STATUS_META: Record<
  ProjectStatus,
  { status: CulturalPortalProjectStatus; statusLabel: string }
> = {
  UPCOMING: { status: 'soon', statusLabel: 'Coming Soon' },
  ACTIVE: { status: 'dev', statusLabel: 'In Development' },
  FUNDED: { status: 'dev', statusLabel: 'Funded' },
  COMPLETED: { status: 'plan', statusLabel: 'Completed' },
  ARCHIVED: { status: 'plan', statusLabel: 'Archived' },
};

const CATEGORY_ICON: Record<string, CulturalPortalProjectIcon> = {
  Architecture: 'archive',
  Manuscripts: 'archive',
  Music: 'documentary',
  Documentary: 'documentary',
  Education: 'education',
  Diaspora: 'diaspora',
  Archaeology: 'archaeology',
  Technology: 'arApp',
};

function resolveProjectIcon(category: string): CulturalPortalProjectIcon {
  return CATEGORY_ICON[category] ?? 'archive';
}

export function mapProjectToCulturalPortalProject(
  project: PublicProjectDTO,
): CulturalPortalProject {
  const statusMeta = STATUS_META[project.status];
  const timeline = project.region ? `${project.category} · ${project.region}` : project.category;

  return {
    status: statusMeta.status,
    statusLabel: statusMeta.statusLabel,
    icon: resolveProjectIcon(project.category),
    title: project.title,
    description: project.description ?? '',
    date: timeline,
    href: '/projects',
    goalUsd: project.goalAmount,
    raisedUsd: project.raisedAmount,
    cardBackgroundImage: project.image,
  };
}

export function mapProjectsToCulturalPortalProjects(
  projects: PublicProjectDTO[],
): CulturalPortalProject[] {
  return projects.map(mapProjectToCulturalPortalProject);
}
