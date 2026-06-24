export type HomeAboutCardIconKey = 'mission' | 'team' | 'career' | 'contact';

export interface HomeAboutCard {
  title: string;
  description: string;
  href: string;
  icon: HomeAboutCardIconKey;
}

export const HOME_ABOUT_SECTION = {
  eyebrow: 'ABOUT US',
  title: 'WHO WE ARE',
  description:
    'A non-profit foundation of historians, technologists and curators working to preserve Armenia’s cultural memory at archival quality.',
} as const;

export const HOME_ABOUT_CARDS: HomeAboutCard[] = [
  {
    title: 'OUR MISSION',
    description:
      'Why we exist, how we work with institutions, and the principles that guide every capture and publication.',
    href: '/about/mission',
    icon: 'mission',
  },
  {
    title: 'THE TEAM',
    description:
      'Meet the specialists behind the archive — field operators, curators, engineers and cultural researchers.',
    href: '/about/team',
    icon: 'team',
  },
  {
    title: 'CAREER',
    description:
      'Open roles for drone pilots, developers and heritage researchers across Yerevan, the regions and remote.',
    href: '/about/career',
    icon: 'career',
  },
  {
    title: 'CONTACT US',
    description:
      'Partnerships, press, research enquiries and volunteer applications — every message is read by our team.',
    href: '/contacts',
    icon: 'contact',
  },
];
