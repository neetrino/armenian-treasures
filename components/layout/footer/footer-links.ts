export interface FooterLinkItem {
  href: string;
  label: string;
}

export const FOOTER_LINKS_ABOUT: FooterLinkItem[] = [
  { href: '/about/mission', label: 'Mission' },
  { href: '/about/team', label: 'Team' },
  { href: '/about/career', label: 'Career' },
];

export const FOOTER_LINKS_EXPLORE: FooterLinkItem[] = [
  { href: '/culture', label: 'Culture Portal' },
  { href: '/projects', label: 'Projects' },
  { href: '/map', label: 'Interactive map' },
  { href: '/donators', label: 'Donators' },
];

export const FOOTER_LINKS_SUPPORT: FooterLinkItem[] = [
  { href: '/partnership', label: 'Partnership' },
  { href: '/culture/submit', label: 'Submit a project' },
  { href: '/contacts', label: 'Contact us' },
];
