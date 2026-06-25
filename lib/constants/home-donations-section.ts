export type DonationsPatronIconKey = 'gold' | 'silver' | 'bronze';

export interface DonationsPatronTier {
  id: DonationsPatronIconKey;
  label: string;
  icon: DonationsPatronIconKey;
  description: string;
}

export const HOME_DONATIONS_SECTION = {
  eyebrow: 'DONATORS',
  title: 'THOSE WHO MAKE IT POSSIBLE',
  description:
    'Armenian Treasures is funded by individuals and organisations who believe culture is humanity\u2019s most precious inheritance.',
  ctaLabel: 'SUPPORT OUR MISSION',
  ctaUrl: '/donate',
} as const;

export const HOME_DONATIONS_PATRONS: DonationsPatronTier[] = [
  {
    id: 'gold',
    label: '✦ GOLD PATRONS',
    icon: 'gold',
    description: 'Founding members — names listed at launch of the portal',
  },
  {
    id: 'silver',
    label: '◈ SILVER PATRONS',
    icon: 'silver',
    description: 'Supporting members — acknowledged in all publications',
  },
  {
    id: 'bronze',
    label: '◇ BRONZE PATRONS',
    icon: 'bronze',
    description: 'Community supporters — listed in the annual report',
  },
];
