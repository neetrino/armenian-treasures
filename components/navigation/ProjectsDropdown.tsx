import { NavLink } from '@/components/navigation/NavLink';
import type { NavDropdownLink } from '@/components/navigation/primary-links';

interface ProjectsDropdownProps {
  items: NavDropdownLink[];
}

export function ProjectsDropdown({ items: _items }: ProjectsDropdownProps) {
  return (
    <NavLink href="/projects">Upcoming Projects</NavLink>
  );
}
