import type { HomeSectionId } from '@/lib/navigation/home-sections';
import { buildHomeSectionHref, HOME_SECTION_IDS } from '@/lib/navigation/home-sections';

export interface PrimaryLink {
  href: string;
  label: string;
  homeSectionId: HomeSectionId;
}

export interface NavDropdownLink {
  href: string;
  label: string;
}

export const PRIMARY_LINKS: PrimaryLink[] = [
  { href: '/culture', label: 'Virtual Museum', homeSectionId: HOME_SECTION_IDS.virtualMuseum },
  {
    href: buildHomeSectionHref(HOME_SECTION_IDS.heritageMap),
    label: 'Heritage Map',
    homeSectionId: HOME_SECTION_IDS.heritageMap,
  },
  { href: '/partnership', label: 'Partnership', homeSectionId: HOME_SECTION_IDS.partnership },
  { href: '/donators', label: 'Donators', homeSectionId: HOME_SECTION_IDS.donators },
];

export const PROJECTS_MENU: NavDropdownLink[] = [
  { href: '/culture', label: 'Digital Archive' },
  { href: '/projects', label: 'Documentary Series' },
  { href: '/about/career', label: 'Education Programme' },
  { href: '/partnership', label: 'Global Diaspora Network' },
];

export const ABOUT_MENU: NavDropdownLink[] = [
  { href: '/about/mission', label: 'Mission' },
  { href: '/about/team', label: 'Team' },
  { href: '/about/career', label: 'Career' },
  { href: '/contacts', label: 'Contact Us' },
];

/** @deprecated Use ABOUT_MENU */
export const ABOUT_TABS = ABOUT_MENU;
