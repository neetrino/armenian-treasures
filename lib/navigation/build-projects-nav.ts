import type { PublicProjectDTO } from '@/lib/dto';
import type { NavDropdownLink } from '@/components/navigation/primary-links';

export function buildProjectsNavItems(projects: PublicProjectDTO[]): NavDropdownLink[] {
  if (projects.length === 0) {
    return [{ id: 'view-all', href: '/projects', label: 'View all projects' }];
  }

  return projects.slice(0, 6).map((project) => ({
    id: project.id,
    href: '/projects',
    label: project.title,
  }));
}
