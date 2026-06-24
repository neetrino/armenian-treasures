export interface PrimaryLink {
  href: string;
  label: string;
}

export interface NavDropdownLink {
  href: string;
  label: string;
}

export const PRIMARY_LINKS: PrimaryLink[] = [
  { href: '/culture', label: 'Virtual Museum' },
  { href: '/map', label: 'Heritage Map' },
  { href: '/partnership', label: 'Partnership' },
  { href: '/donators', label: 'Donators' },
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
