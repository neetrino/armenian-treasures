import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';

export type FeaturedTreasureLayout = 'tall' | 'top-mid' | 'bottom-mid' | 'top-right';

export interface FeaturedTreasure {
  number: string;
  icon: CulturalPortalIconKey;
  categories: [string, string];
  title: string;
  description: string;
  href: string;
  layout: FeaturedTreasureLayout;
  cardBackgroundColor: string | null;
  cardBackgroundImage: string | null;
}

export const FEATURED_TREASURES_SECTION = {
  eyebrow: 'FEATURED TREASURES',
  title: 'STORIES WORTH DISCOVERING',
} as const;

/** Canonical homepage featured stories — matches Figma landing spec. */
export const FEATURED_TREASURES: FeaturedTreasure[] = [
  {
    number: '01',
    icon: 'churches',
    categories: ['HERITAGE SITE', 'ARCHITECTURE'],
    title: 'GEGHARD MONASTERY — CARVED INTO LIVING ROCK',
    description:
      'A UNESCO World Heritage site where the monastery is literally hewn from the mountainside. Founded in the 4th century, Geghard enshrines the lance said to have wounded Christ — and an acoustic beauty that stills every visitor.',
    href: '/culture/architecture/churches',
    layout: 'tall',
    cardBackgroundColor: null,
    cardBackgroundImage: null,
  },
  {
    number: '02',
    icon: 'music',
    categories: ['MUSIC', 'TRADITION'],
    title: 'THE DUDUK — SOUL OF A NATION',
    description:
      'UNESCO-listed intangible heritage, the apricot-wood wind instrument has voiced Armenian sorrow and joy for over 1,500 years.',
    href: '/culture/heritage/music',
    layout: 'top-mid',
    cardBackgroundColor: null,
    cardBackgroundImage: null,
  },
  {
    number: '03',
    icon: 'kings',
    categories: ['HISTORY', 'KINGS'],
    title: "TIGRANES THE GREAT'S EMPIRE",
    description:
      'At its zenith, the Armenian Empire stretched from the Caspian to the Mediterranean — the largest state in the Roman era.',
    href: '/culture/people/icons-of-history',
    layout: 'top-right',
    cardBackgroundColor: null,
    cardBackgroundImage: null,
  },
  {
    number: '04',
    icon: 'foodDrink',
    categories: ['FOOD & DRINK', 'DISCOVERY'],
    title: "ARENI-1: WORLD'S OLDEST WINERY",
    description:
      "A 6,100-year-old winery discovered in Armenia's Vayots Dzor — the earliest evidence of wine production anywhere on Earth.",
    href: '/culture/heritage/food',
    layout: 'bottom-mid',
    cardBackgroundColor: null,
    cardBackgroundImage: null,
  },
];
