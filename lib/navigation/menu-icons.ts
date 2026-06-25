import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Building2,
  Castle,
  Church,
  Crown,
  Drama,
  FlaskConical,
  Grid3x3,
  Library,
  Music,
  Palette,
  PenLine,
  Scroll,
  Sparkles,
  Swords,
  UtensilsCrossed,
  Users,
  PersonStanding,
  Shirt,
} from 'lucide-react';
import type { CulturalPortalIconKey } from '@/lib/constants/cultural-portal';

const SLUG_ICON_MAP: Record<string, CulturalPortalIconKey> = {
  churches: 'churches',
  castles: 'castles',
  legends: 'legends',
  mythology: 'mythology',
  museums: 'museums',
  people: 'famousArmenians',
  kings: 'kings',
  scientists: 'scientists',
  history: 'history',
  paintings: 'paintings',
  music: 'music',
  writers: 'writers',
  taraz: 'taraz',
  carpets: 'carpets',
  food: 'foodDrink',
  sculpting: 'sculptors',
  dance: 'dance',
  theatre: 'theatre',
  armaments: 'armaments',
  publications: 'publications',
  heritage: 'history',
  architecture: 'churches',
};

const ICON_KEY_LUCIDE_MAP: Record<string, LucideIcon> = {
  foodDrink: UtensilsCrossed,
  famousArmenians: Users,
};

const SLUG_LUCIDE_MAP: Record<string, LucideIcon> = {
  churches: Church,
  castles: Castle,
  legends: BookOpen,
  mythology: Sparkles,
  museums: Building2,
  people: Users,
  famousArmenians: Users,
  history: Scroll,
  paintings: Palette,
  music: Music,
  writers: PenLine,
  taraz: Shirt,
  carpets: Grid3x3,
  food: UtensilsCrossed,
  sculpting: Building2,
  dance: PersonStanding,
  theatre: Drama,
  armaments: Swords,
  publications: Library,
  kings: Crown,
  scientists: FlaskConical,
};

export function resolveMenuIconKey(slug: string, parentSlug?: string): CulturalPortalIconKey {
  return SLUG_ICON_MAP[slug] ?? SLUG_ICON_MAP[parentSlug ?? ''] ?? 'history';
}

export function resolveMenuIconSlug(slug: string, parentSlug?: string): string {
  if (slug in SLUG_LUCIDE_MAP) return slug;
  if (slug === 'famousArmenians') return 'famousArmenians';
  if (parentSlug && parentSlug in SLUG_LUCIDE_MAP) return parentSlug;
  return 'history';
}

export function resolveMenuLucideIcon(slug: string, parentSlug?: string): LucideIcon {
  if (slug in ICON_KEY_LUCIDE_MAP) return ICON_KEY_LUCIDE_MAP[slug]!;
  if (slug in SLUG_LUCIDE_MAP) return SLUG_LUCIDE_MAP[slug]!;
  return SLUG_LUCIDE_MAP[resolveMenuIconSlug(slug, parentSlug)] ?? Scroll;
}
