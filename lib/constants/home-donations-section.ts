export type DonationsPatronIconKey = 'gold' | 'silver' | 'bronze';

export interface DonationsPatronTier {
  label: string;
  icon: DonationsPatronIconKey;
  description: string;
}

export const HOME_DONATIONS_SECTION = {
  eyebrow: 'DONATIONS',
  title: 'THOSE WHO MAKE IT POSSIBLE',
  description:
    'Every flight, scan and published entry is made possible by patrons who believe Armenian heritage belongs to the world — and to the future.',
  ctaLabel: 'SUPPORT OUR MISSION',
  ctaUrl: '/partnership',
} as const;

export const HOME_DONATIONS_PATRONS: DonationsPatronTier[] = [
  {
    label: 'GOLD PATRONS',
    icon: 'gold',
    description:
      'Founding members and major benefactors — names listed on the Heritage Site portal and in our annual reports.',
  },
  {
    label: 'SILVER PATRONS',
    icon: 'silver',
    description:
      'Sustaining partners who underwrite field seasons, digitisation campaigns and open-access publishing.',
  },
  {
    label: 'BRONZE PATRONS',
    icon: 'bronze',
    description:
      'Community supporters whose monthly gifts keep the archive online, searchable and free for everyone.',
  },
];
