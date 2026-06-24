'use client';

import { NavLink } from './NavLink';
import { PRIMARY_LINKS } from './primary-links';
import { AboutDropdown } from './AboutDropdown';
import { CultureMegaMenu } from './CultureMegaMenu';
import { ProjectsDropdown } from './ProjectsDropdown';

export function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className="relative z-10 hidden h-full min-w-0 flex-nowrap items-center justify-start gap-[clamp(1rem,1.45vw,1.75rem)] lg:ml-5 xl:ml-6 lg:flex"
    >
      <NavLink href={PRIMARY_LINKS[0]!.href} homeSectionId={PRIMARY_LINKS[0]!.homeSectionId}>
        {PRIMARY_LINKS[0]!.label}
      </NavLink>
      <CultureMegaMenu />
      <ProjectsDropdown />
      {PRIMARY_LINKS.slice(1).map((link) => (
        <NavLink key={link.href} href={link.href} homeSectionId={link.homeSectionId}>
          {link.label}
        </NavLink>
      ))}
      <AboutDropdown />
    </nav>
  );
}
