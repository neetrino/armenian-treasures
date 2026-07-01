export interface FooterLinkItem {
  href: string;
  label: string;
}

export const FOOTER_BRAND_DESCRIPTION =
  'A living portal dedicated to the art, history, and people of one of humanity’s oldest civilizations.';

export const FOOTER_LINKS_CULTURAL_PORTAL: FooterLinkItem[] = [
  { href: '/culture/architecture/churches', label: 'Churches' },
  { href: '/culture/architecture/castles', label: 'Castles' },
  { href: '/culture/museums', label: 'Museums' },
  { href: '/culture/history', label: 'History' },
  { href: '/culture/legends/myths-and-gods', label: 'Myths & Gods' },
  { href: '/culture/legends/legends-and-heroes', label: 'Legends' },
  { href: '/culture/people/famous-armenians', label: 'Famous Armenians' },
  { href: '/culture/heritage/paintings', label: 'Paintings' },
  { href: '/culture/heritage/music', label: 'Music' },
];

export const FOOTER_LINKS_EXPLORE: FooterLinkItem[] = [
  { href: '/virtual-museum', label: 'Virtual Museum' },
  { href: '/map', label: 'Heritage Map' },
  { href: '/#projects', label: 'Upcoming Projects' },
  { href: '/#partners', label: 'Partnership' },
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
