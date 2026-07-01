import type { HomeSectionId } from '@/lib/navigation/home-sections';
import { buildHomeSectionHref, HOME_SECTION_IDS } from '@/lib/navigation/home-sections';

export interface PrimaryLink {
  href: string;
  label: string;
  homeSectionId?: HomeSectionId;
}

export interface NavDropdownLink {
  href: string;
  label: string;
  /** Stable React key when multiple items share the same href. */
  id?: string;
}

export function navDropdownLinkKey(item: NavDropdownLink): string {
  return item.id ?? `${item.href}::${item.label}`;
}

export const PRIMARY_LINKS: PrimaryLink[] = [
  {
    href: buildHomeSectionHref(HOME_SECTION_IDS.heritageMap),
    label: 'Heritage Map',
    homeSectionId: HOME_SECTION_IDS.heritageMap,
  },
  {
    href: '/partnership',
    label: 'Partnership',
  },
  {
    href: '/donate',
    label: 'Donate',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
];

export const PROJECTS_MENU: NavDropdownLink[] = [
  {
    id: 'digital-archive',
    href: '/projects',
    label: 'Digital Archive',
  },
  {
    id: 'documentary-series',
    href: '/projects',
    label: 'Documentary Series',
  },
  {
    id: 'education-programme',
    href: '/projects',
    label: 'Education Programme',
  },
  {
    id: 'global-diaspora-network',
    href: '/projects',
    label: 'Global Diaspora Network',
  },
];

export const ABOUT_MENU: NavDropdownLink[] = [
  { href: '/about/mission', label: 'Mission' },
  { href: '/about/team', label: 'Team' },
  { href: '/about/career', label: 'Career' },
  { href: '/contacts', label: 'Contact Us' },
];

/** @deprecated Use ABOUT_MENU */
export const ABOUT_TABS = ABOUT_MENU;
