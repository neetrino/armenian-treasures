import {
  CULTURAL_PORTAL_CATEGORIES,
  CULTURAL_PORTAL_SECTION,
} from '@/lib/constants/cultural-portal';
import {
  HOME_ABOUT_CARDS,
  HOME_ABOUT_SECTION,
} from '@/lib/constants/home-about-section';
import {
  HOME_DONATIONS_SECTION,
} from '@/lib/constants/home-donations-section';
import {
  HOME_PARTNERSHIP_CATEGORIES,
  HOME_PARTNERSHIP_SECTION,
} from '@/lib/constants/home-partnership-section';

export const CULTURAL_PORTAL_PAGE = {
  metadata: {
    title: 'Armenian Treasures — Cultural Portal',
    description:
      'A living archive of Armenia\'s 3,000-year civilisation — its kingdoms, churches, legends, arts, and the people who shaped history.',
  },
  hero: {
    eyebrow: '✦ Discover · Preserve · Celebrate ✦',
    title: 'Armenian Treasures',
    accent: 'Cultural Heritage Portal',
    subtitle:
      'A living archive of Armenia\'s 3,000-year civilisation — its kingdoms, churches, legends, arts, and the people who shaped history.',
    primaryCta: { label: 'Explore the Portal', href: '#cultural' },
    secondaryCta: { label: 'Interactive Map', href: '#map' },
  },
} as const;

export const CULTURAL_PORTAL_STATS = [
  { num: '3,000+', label: 'Years of History' },
  { num: '850+', label: 'Heritage Sites' },
  { num: '12,000+', label: 'Artefacts Documented' },
  { num: '47', label: 'Partner Institutions' },
] as const;

export { CULTURAL_PORTAL_SECTION, CULTURAL_PORTAL_CATEGORIES };

export type CulturalPortalHighlightIcon =
  | 'geghard'
  | 'duduk'
  | 'tigranes'
  | 'areni';

export interface CulturalPortalHighlight {
  num: string;
  icon: CulturalPortalHighlightIcon;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  featured?: boolean;
}

export const CULTURAL_PORTAL_HIGHLIGHTS: CulturalPortalHighlight[] = [
  {
    num: '01',
    icon: 'geghard',
    tag: 'Heritage Site · Architecture',
    title: 'Geghard Monastery — Carved into Living Rock',
    excerpt:
      'A UNESCO World Heritage site where the monastery is literally hewn from the mountainside. Founded in the 4th century, Geghard enshrines the lance said to have wounded Christ — and an acoustic beauty that stills every visitor.',
    href: '/culture/architecture/churches',
    featured: true,
  },
  {
    num: '02',
    icon: 'duduk',
    tag: 'Music · Tradition',
    title: 'The Duduk — Soul of a Nation',
    excerpt:
      'UNESCO-listed intangible heritage, the apricot-wood wind instrument has voiced Armenian sorrow and joy for over 1,500 years.',
    href: '/culture/heritage/music',
  },
  {
    num: '03',
    icon: 'tigranes',
    tag: 'History · Kings',
    title: 'Tigranes the Great\'s Empire',
    excerpt:
      'At its zenith, the Armenian Empire stretched from the Caspian to the Mediterranean — the largest state in the Roman era.',
    href: '/culture/people',
  },
  {
    num: '04',
    icon: 'areni',
    tag: 'Food & Drink',
    title: 'Areni-1: World\'s Oldest Winery',
    excerpt:
      'A 6,100-year-old winery discovered in Armenia\'s Vayots Dzor — the earliest evidence of wine production anywhere on Earth.',
    href: '/culture/heritage/food',
  },
];

export const CULTURAL_PORTAL_MAP = {
  eyebrow: 'Interactive Map',
  title: 'Explore Armenia\'s Sacred Geography',
  description:
    'Navigate over 850 heritage sites, monasteries, fortresses, and cultural landmarks across historic and modern Armenia.',
  placeholderTitle: 'Interactive Map',
  placeholderSubtitle: 'Full map integration launching with the portal — 850+ locations',
  ctaHref: '/map',
  pins: [
    { tone: 'teal' as const, top: '42%', left: '48%', delay: '0s' },
    { tone: 'teal' as const, top: '37%', left: '52%', delay: '0.5s' },
    { tone: 'teal' as const, top: '46%', left: '44%', delay: '1s' },
    { tone: 'teal' as const, top: '34%', left: '49%', delay: '1.5s' },
    { tone: 'teal' as const, top: '50%', left: '56%', delay: '0.3s' },
    { tone: 'gold' as const, top: '40%', left: '41%', delay: '0.8s' },
    { tone: 'gold' as const, top: '44%', left: '53%', delay: '1.3s' },
  ],
  legend: [
    { color: 'var(--teal)', label: 'Religious Sites' },
    { color: 'var(--gold)', label: 'Historical Monuments' },
    { color: '#8855CC', label: 'Museums & Galleries' },
    { color: '#CC5544', label: 'Natural Heritage' },
    { color: '#44AA66', label: 'Archaeological Sites' },
  ],
} as const;

export type CulturalPortalProjectStatus = 'soon' | 'dev' | 'plan';

export type CulturalPortalProjectIcon =
  | 'archive'
  | 'documentary'
  | 'arApp'
  | 'education'
  | 'diaspora'
  | 'archaeology';

export interface CulturalPortalProject {
  status: CulturalPortalProjectStatus;
  statusLabel: string;
  icon: CulturalPortalProjectIcon;
  title: string;
  description: string;
  date: string;
  href: string;
}

export const CULTURAL_PORTAL_PROJECTS_SECTION = {
  eyebrow: 'Upcoming Projects',
  title: 'What We Are Building',
  description:
    'A roadmap of initiatives to expand, digitise, and share Armenian heritage with the world.',
} as const;

export const CULTURAL_PORTAL_PROJECTS: CulturalPortalProject[] = [
  {
    status: 'soon',
    statusLabel: 'Coming Soon',
    icon: 'archive',
    title: 'Digital Manuscript Archive',
    description:
      'High-resolution digitisation of over 2,000 Armenian manuscripts from the Matenadaran collection, freely searchable globally.',
    date: 'Q3 2026',
    href: '/#upcoming-projects',
  },
  {
    status: 'dev',
    statusLabel: 'In Development',
    icon: 'documentary',
    title: 'Heritage Documentary Series',
    description:
      'A six-part cinematic series exploring the most significant sites and stories, co-produced with international broadcasters.',
    date: 'Q4 2026',
    href: '/#upcoming-projects',
  },
  {
    status: 'plan',
    statusLabel: 'Planning',
    icon: 'arApp',
    title: 'AR Heritage Experience App',
    description:
      'Point your phone at a ruin and watch it restored to its original grandeur in real time through augmented reality.',
    date: '2027',
    href: '/#upcoming-projects',
  },
  {
    status: 'soon',
    statusLabel: 'Coming Soon',
    icon: 'education',
    title: 'Schools Education Programme',
    description:
      'Curriculum-aligned materials for Armenian schools and diaspora communities, bringing history alive through interactive storytelling.',
    date: 'Q2 2026',
    href: '/#upcoming-projects',
  },
  {
    status: 'dev',
    statusLabel: 'In Development',
    icon: 'diaspora',
    title: 'Diaspora Connection Network',
    description:
      'Connecting the 11-million-strong global Armenian diaspora with cultural events, heritage research, and community projects.',
    date: 'Q1 2027',
    href: '/#upcoming-projects',
  },
  {
    status: 'plan',
    statusLabel: 'Planning',
    icon: 'archaeology',
    title: 'Archaeological Survey Initiative',
    description:
      'Partnering with leading universities for new excavations of understudied Urartian and Hellenistic sites across the highlands.',
    date: '2027–2028',
    href: '/#upcoming-projects',
  },
];

export const CULTURAL_PORTAL_DONORS = {
  eyebrow: 'Donators',
  title: 'Those Who Make It Possible',
  description:
    'Armenian Treasures is funded by individuals and organisations who believe culture is humanity\'s most precious inheritance.',
  ctaLabel: 'Support Our Mission',
  ctaHref: '/donate',
  tiers: [
    {
      badge: '✦ Gold Patrons',
      badgeClass: 'db-gold' as const,
      iconStroke: 'var(--gold)',
      names: 'Founding members — names listed at launch of the portal',
    },
    {
      badge: '◈ Silver Patrons',
      badgeClass: 'db-silver' as const,
      iconStroke: '#B0B0B0',
      names: 'Supporting members — acknowledged in all publications',
    },
    {
      badge: '◇ Bronze Patrons',
      badgeClass: 'db-bronze' as const,
      iconStroke: '#C87840',
      names: 'Community supporters — listed in the annual report',
    },
  ],
} as const;

export const CULTURAL_PORTAL_ABOUT = {
  eyebrow: HOME_ABOUT_SECTION.eyebrow,
  title: HOME_ABOUT_SECTION.title,
  description:
    'A team of historians, technologists, artists, and Armenians united by a single belief: that culture saved is culture alive.',
  cards: HOME_ABOUT_CARDS.map((card) => ({
    ...card,
    description:
      card.icon === 'mission'
        ? 'To document, preserve, and celebrate the full breadth of Armenian civilisation — making it accessible to every Armenian and every curious mind on Earth, forever.'
        : card.icon === 'team'
          ? 'Historians, archivists, filmmakers, engineers, and cultural ambassadors from Armenia, the diaspora, and beyond — bound by shared purpose.'
          : card.icon === 'career'
            ? 'Join us in building something that will outlast us all. We are always seeking passionate researchers, writers, designers, and technologists.'
            : 'Reach out for partnerships, research enquiries, media requests, or simply to share your family\'s Armenian story with the world.',
  })),
} as const;

export const CULTURAL_PORTAL_NEWSLETTER = {
  title: 'Stay Connected to the Heritage',
  description:
    'New discoveries, upcoming events, and stories from across the Armenian world — delivered to your inbox.',
} as const;

export {
  HOME_PARTNERSHIP_SECTION,
  HOME_PARTNERSHIP_CATEGORIES,
  HOME_DONATIONS_SECTION,
};
