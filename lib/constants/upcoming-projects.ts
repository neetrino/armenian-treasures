export type UpcomingProjectIconKey =
  | 'digitalArchive'
  | 'documentarySeries'
  | 'educationProgramme'
  | 'diasporaNetwork';

export type UpcomingProjectBadgeTone = 'teal' | 'gold';

export interface UpcomingProject {
  number: string;
  icon: UpcomingProjectIconKey;
  badge: string;
  badgeTone: UpcomingProjectBadgeTone;
  title: string;
  description: string;
  timeline: string;
}

export const UPCOMING_PROJECTS_SECTION = {
  eyebrow: 'UPCOMING PROJECTS',
  title: 'WHAT WE ARE BUILDING',
  description:
    'Four landmark initiatives to digitise, broadcast, educate, and connect Armenian heritage with the global community.',
} as const;

export const UPCOMING_PROJECTS: UpcomingProject[] = [
  {
    number: '01',
    icon: 'digitalArchive',
    badge: 'COMING Q3 2026',
    badgeTone: 'teal',
    title: 'DIGITAL ARCHIVE',
    description:
      'High-resolution digitisation of over 2,000 Armenian manuscripts from the Matenadaran collection — freely searchable by scholars and the public worldwide. Every illuminated page, every ancient inscription, preserved forever in digital form and accessible across devices.',
    timeline: 'Q3 2026',
  },
  {
    number: '02',
    icon: 'documentarySeries',
    badge: 'IN PRODUCTION',
    badgeTone: 'gold',
    title: 'DOCUMENTARY SERIES',
    description:
      'A six-part cinematic documentary series exploring the most significant sites, legends, and stories of Armenian civilisation. Co-produced with international broadcasters and featuring leading historians, archaeologists, and cultural figures from across the world.',
    timeline: 'Q4 2026',
  },
  {
    number: '03',
    icon: 'educationProgramme',
    badge: 'COMING Q2 2026',
    badgeTone: 'teal',
    title: 'EDUCATION PROGRAMME',
    description:
      'Curriculum-aligned educational materials for Armenian schools and diaspora communities globally. Interactive storytelling, digital lesson plans, and teacher training resources that bring 3,000 years of history alive for the next generation of guardians.',
    timeline: 'Q2 2026',
  },
  {
    number: '04',
    icon: 'diasporaNetwork',
    badge: 'IN DEVELOPMENT',
    badgeTone: 'gold',
    title: 'GLOBAL DIASPORA NETWORK',
    description:
      'A dedicated digital platform connecting the 11-million-strong global Armenian diaspora with cultural events, heritage research, family history tools, and community projects — bridging six continents with a shared ancestral identity and common digital home.',
    timeline: 'Q1 2027',
  },
];
