export type PartnershipCategoryIconKey =
  | 'museums'
  | 'universities'
  | 'unesco'
  | 'culturalNgos'
  | 'mediaPartners'
  | 'technology'
  | 'governments'
  | 'becomePartner';

export interface PartnershipCategory {
  title: string;
  icon: PartnershipCategoryIconKey;
  variant?: 'default' | 'cta';
  href?: string;
}

export const HOME_PARTNERSHIP_SECTION = {
  eyebrow: 'PARTNERSHIP',
  title: 'BUILD WITH US',
  description:
    'We collaborate with cultural institutions, universities, governments, and businesses who share our commitment to preserving Armenian heritage.',
  ctaLabel: 'APPLY FOR PARTNERSHIP',
  ctaUrl: '/partnership',
} as const;

export const HOME_PARTNERSHIP_CATEGORIES: PartnershipCategory[] = [
  { title: 'MUSEUMS', icon: 'museums' },
  { title: 'UNIVERSITIES', icon: 'universities' },
  { title: 'UNESCO BODIES', icon: 'unesco' },
  { title: 'CULTURAL NGOs', icon: 'culturalNgos' },
  { title: 'MEDIA PARTNERS', icon: 'mediaPartners' },
  { title: 'TECHNOLOGY', icon: 'technology' },
  { title: 'GOVERNMENTS', icon: 'governments' },
  {
    title: '+ BECOME A PARTNER',
    icon: 'becomePartner',
    variant: 'cta',
    href: '/partnership',
  },
];
