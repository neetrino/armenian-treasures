'use client';

import { NavLink } from './NavLink';
import { PRIMARY_LINKS } from './primary-links';
import { AboutDropdown } from './AboutDropdown';
import { CultureMegaMenu } from './CultureMegaMenu';
import { ProjectsDropdown } from './ProjectsDropdown';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';
import type { NavDropdownLink } from './primary-links';

interface DesktopNavProps {
  cultureMegaMenu: MegaMenuColumn[];
  projectsMenu: NavDropdownLink[];
}

export function DesktopNav({ cultureMegaMenu, projectsMenu }: DesktopNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="relative z-10 hidden h-full min-w-0 flex-nowrap items-center justify-start gap-6 lg:ml-5 xl:ml-6 lg:flex"
    >
      <CultureMegaMenu columns={cultureMegaMenu} />
      <ProjectsDropdown items={projectsMenu} />
      {PRIMARY_LINKS.map((link) => (
        <NavLink key={link.href} href={link.href} homeSectionId={link.homeSectionId}>
          {link.label}
        </NavLink>
      ))}
      <AboutDropdown />
    </nav>
  );
}
