export interface PrimaryLink {
  href: string;
  label: string;
}

export const PRIMARY_LINKS: PrimaryLink[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/map', label: 'Map' },
  { href: '/partnership', label: 'Partnership' },
  { href: '/donators', label: 'Donators' },
  { href: '/contacts', label: 'Contacts' },
];

export const ABOUT_TABS = [
  { href: '/about/mission', label: 'Mission' },
  { href: '/about/team', label: 'Team' },
  { href: '/about/career', label: 'Career' },
];
