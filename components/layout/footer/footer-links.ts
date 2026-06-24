export interface FooterLinkItem {
  href: string;
  label: string;
}

export const FOOTER_BRAND_DESCRIPTION =
  'A living portal dedicated to the art, history, and people of one of humanity’s oldest civilizations.';

export const FOOTER_LINKS_CULTURAL_PORTAL: FooterLinkItem[] = [
  { href: '/culture/architecture', label: 'Architecture' },
  { href: '/culture/legends', label: 'Legends & Mythology' },
  { href: '/culture/museums', label: 'Museums' },
  { href: '/culture/history', label: 'History' },
  { href: '/culture', label: 'Arts & Culture' },
];

export const FOOTER_LINKS_EXPLORE: FooterLinkItem[] = [
  { href: '/#virtual-museum-heading', label: 'Virtual Museum' },
  { href: '/map', label: 'Heritage Map' },
  { href: '/projects', label: 'Upcoming Projects' },
  { href: '/partnership', label: 'Partnership' },
  { href: '/culture', label: 'Treasures' },
];

export const FOOTER_LINKS_ABOUT: FooterLinkItem[] = [
  { href: '/about/mission', label: 'Mission' },
  { href: '/about/team', label: 'Team' },
  { href: '/about/career', label: 'Career' },
  { href: '/contacts', label: 'Contact Us' },
];

export const FOOTER_LEGAL_LINKS: FooterLinkItem[] = [
  { href: '/contacts', label: 'Privacy Policy' },
  { href: '/contacts', label: 'Terms of Use' },
];

export const FOOTER_SITE_DOMAIN = 'armeniantreasures.com';
