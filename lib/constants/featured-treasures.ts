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
}

export const FEATURED_TREASURES_SECTION = {
  eyebrow: 'FEATURED TREASURES',
  title: 'STORIES WORTH DISCOVERING',
} as const;

export const FEATURED_TREASURES: FeaturedTreasure[] = [
  {
    number: '01',
    icon: 'churches',
    categories: ['HERITAGE SITE', 'ARCHITECTURE'],
    title: 'GEGHARD MONASTERY — CARVED INTO LIVING ROCK',
    description:
      'A UNESCO World Heritage monastery where chapels and khachkars are hewn directly from the cliff — a masterpiece of medieval Armenian devotion.',
    href: '/culture/architecture/churches',
    layout: 'tall',
  },
  {
    number: '02',
    icon: 'music',
    categories: ['MUSIC', 'PEOPLE'],
    title: 'KOMITAS — THE SOUL OF ARMENIAN MUSIC',
    description:
      'The priest-composer who rescued thousands of folk melodies from oblivion and gave Armenian music its eternal voice.',
    href: '/culture/heritage/music',
    layout: 'top-mid',
  },
  {
    number: '03',
    icon: 'kings',
    categories: ['HISTORY', 'PEOPLE'],
    title: 'TIGRANES THE GREAT — EMPEROR OF KINGS',
    description:
      'The Artaxiad ruler who forged one of antiquity’s greatest empires and placed Armenian power at the heart of the Near East.',
    href: '/culture/people',
    layout: 'top-right',
  },
  {
    number: '04',
    icon: 'foodDrink',
    categories: ['CULTURE', 'GASTRONOMY'],
    title: 'ARMENIAN WINE — 6,100 YEARS OF TRADITION',
    description:
      'From the Areni cave discovery to village karases — the world’s oldest continuous winemaking lineage, still poured today.',
    href: '/culture/heritage/food',
    layout: 'bottom-mid',
  },
];
