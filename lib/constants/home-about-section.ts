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
    'A team of historians, technologists, artists, and Armenians united by a single belief: that culture saved is culture alive.',
} as const;

export const HOME_ABOUT_CARDS: HomeAboutCard[] = [
  {
    title: 'OUR MISSION',
    description:
      'To document, preserve, and celebrate the full breadth of Armenian civilisation — making it accessible to every Armenian and every curious mind on Earth, forever.',
    href: '/about/mission',
    icon: 'mission',
  },
  {
    title: 'THE TEAM',
    description:
      'Historians, archivists, filmmakers, engineers, and cultural ambassadors from Armenia, the diaspora, and beyond — bound by shared purpose.',
    href: '/about/team',
    icon: 'team',
  },
  {
    title: 'CAREER',
    description:
      'Join us in building something that will outlast us all. We are always seeking passionate researchers, writers, designers, and technologists.',
    href: '/about/career',
    icon: 'career',
  },
  {
    title: 'CONTACT US',
    description:
      'Reach out for partnerships, research enquiries, media requests, or simply to share your family\u2019s Armenian story with the world.',
    href: '/contacts',
    icon: 'contact',
  },
];
