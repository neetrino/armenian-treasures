import { SimpleDropdown } from '@/components/navigation/SimpleDropdown';
import { isProjectsNavActive } from '@/components/navigation/nav-styles';
import { buildHomeSectionHref, HOME_SECTION_IDS } from '@/lib/navigation/home-sections';
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
      homeSectionId={HOME_SECTION_IDS.upcomingProjects}
      fallbackHref={buildHomeSectionHref(HOME_SECTION_IDS.upcomingProjects)}
    />
  );
}
