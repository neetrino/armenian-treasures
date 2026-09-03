'use client';

import { NavLink } from './NavLink';
import { PRIMARY_LINKS } from './primary-links';
import { AboutDropdown } from './AboutDropdown';
import { CultureMegaMenu } from './CultureMegaMenu';
import { ProjectsDropdown } from './ProjectsDropdown';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';
import type { NavDropdownLink } from './primary-links';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { headerPrimaryLinkLabel } from '@/lib/i18n/ui-chrome';

interface DesktopNavProps {
  cultureMegaMenu: MegaMenuColumn[];
  projectsMenu: NavDropdownLink[];
  locale: SiteLocaleCode;
}

export function DesktopNav({ cultureMegaMenu, projectsMenu, locale }: DesktopNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="relative z-10 hidden h-full min-w-0 flex-nowrap items-center justify-start gap-6 lg:ml-5 lg:flex xl:ml-6"
    >
      <CultureMegaMenu columns={cultureMegaMenu} locale={locale} />
      <ProjectsDropdown items={projectsMenu} locale={locale} />
      {PRIMARY_LINKS.map((link) => (
        <NavLink key={link.href} href={link.href} homeSectionId={link.homeSectionId}>
          {headerPrimaryLinkLabel(link.href, locale)}
        </NavLink>
      ))}
      <AboutDropdown locale={locale} />
    </nav>
  );
}
