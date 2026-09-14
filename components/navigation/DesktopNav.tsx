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
import { uiMessage } from '@/lib/i18n/ui-messages';

interface DesktopNavProps {
  cultureMegaMenu: MegaMenuColumn[];
  projectsMenu: NavDropdownLink[];
  locale: SiteLocaleCode;
}

export function DesktopNav({ cultureMegaMenu, projectsMenu, locale }: DesktopNavProps) {
  return (
    <nav
      aria-label={uiMessage(locale, 'primaryNav')}
      className="relative z-10 hidden h-full min-w-0 flex-nowrap items-center justify-start gap-[clamp(0.55rem,1.05vw,1.15rem)] lg:ml-2 lg:flex xl:ml-4 xl:gap-5"
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
