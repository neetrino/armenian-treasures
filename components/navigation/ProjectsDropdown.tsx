import { SimpleDropdown } from '@/components/navigation/SimpleDropdown';
import { PROJECTS_MENU } from '@/components/navigation/primary-links';
import { isProjectsNavActive } from '@/components/navigation/nav-styles';

export function ProjectsDropdown() {
  return (
    <SimpleDropdown
      label="Upcoming Projects"
      items={PROJECTS_MENU}
      isActive={isProjectsNavActive}
      menuId="projects-menu"
    />
  );
}
