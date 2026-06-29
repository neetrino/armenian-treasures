import { SimpleDropdown } from '@/components/navigation/SimpleDropdown';
import { isProjectsNavActive } from '@/components/navigation/nav-styles';
import type { NavDropdownLink } from '@/components/navigation/primary-links';

interface ProjectsDropdownProps {
  items: NavDropdownLink[];
}

export function ProjectsDropdown({ items }: ProjectsDropdownProps) {
  return (
    <SimpleDropdown
      label="Upcoming Projects"
      items={items}
      isActive={isProjectsNavActive}
      menuId="projects-menu"
      fallbackHref="/projects"
    />
  );
}
