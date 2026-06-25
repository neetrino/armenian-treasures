import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Building2,
  Compass,
  Cross,
  Flower2,
  Landmark,
  Leaf,
  Music2,
  Users,
  Wheat,
} from 'lucide-react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export type CultureCategoryAccent =
  | 'architecture'
  | 'legends'
  | 'museums'
  | 'people'
  | 'history'
  | 'heritage'
  | 'cuisine'
  | 'music'
  | 'crafts'
  | 'nature'
  | 'journeys'
  | 'default';

export interface CultureCategoryTheme {
  accent: CultureCategoryAccent;
  accentColor: string;
  icon: LucideIcon;
  cardSrc: string;
  objectPosition: string;
}

const DEFAULT_THEME: CultureCategoryTheme = {
  accent: 'default',
  accentColor: '#5C3D7A',
  icon: BookOpen,
  cardSrc: resolvePublicAssetUrl('/images/culture/card-heritage.webp'),
  objectPosition: 'center center',
};

function theme(
  accent: CultureCategoryAccent,
  accentColor: string,
  icon: LucideIcon,
  cardSrc: string,
  objectPosition: string,
): CultureCategoryTheme {
  return {
    accent,
    accentColor,
    icon,
    cardSrc: resolvePublicAssetUrl(cardSrc),
    objectPosition,
  };
}

export const CULTURE_CATEGORY_THEMES: Record<string, CultureCategoryTheme> = {
  architecture: theme(
    'architecture',
    '#9A7B2F',
    Landmark,
    '/images/culture/card-heritage.webp',
    'center 38%',
  ),
  legends: theme(
    'legends',
    '#8B1E2D',
    Cross,
    '/images/culture/card-legends.webp',
    'center 45%',
  ),
  museums: theme(
    'museums',
    '#1F4D3A',
    Building2,
    '/images/culture/card-museums.webp',
    'center 55%',
  ),
  people: theme(
    'people',
    '#2C3E6B',
    Users,
    '/images/culture/card-people.webp',
    'center 30%',
  ),
  history: theme(
    'history',
    '#9A7B2F',
    Compass,
    '/images/culture/card-history.webp',
    'center center',
  ),
  heritage: theme(
    'heritage',
    '#5C3D7A',
    BookOpen,
    '/images/culture/card-heritage.webp',
    'center 35%',
  ),
  cuisine: theme(
    'cuisine',
    '#B85A20',
    Wheat,
    '/images/culture/card-heritage.webp',
    'center 50%',
  ),
  music: theme(
    'music',
    '#2C3E6B',
    Music2,
    '/images/culture/card-people.webp',
    'center 62%',
  ),
  crafts: theme(
    'crafts',
    '#8B6914',
    Flower2,
    '/images/culture/card-heritage.webp',
    'center 58%',
  ),
  nature: theme(
    'nature',
    '#3D6B4A',
    Leaf,
    '/images/culture/card-legends.webp',
    'center 40%',
  ),
  journeys: theme(
    'journeys',
    '#8B7355',
    Compass,
    '/images/culture/card-history.webp',
    'center center',
  ),
};

export function resolveCultureCategoryTheme(slug: string): CultureCategoryTheme {
  return CULTURE_CATEGORY_THEMES[slug] ?? DEFAULT_THEME;
}
