import type { TechItemInput } from '@/components/sections/technology/technology-data';

interface RawTechCard {
  title?: string;
  description?: string;
  icon?: string;
}

export function normalizeHomeTechCards(value: unknown): TechItemInput[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is RawTechCard => typeof item === 'object' && item !== null)
    .map((item) => ({
      title: item.title?.trim() ?? '',
      description: item.description?.trim() ?? '',
      icon: item.icon?.trim() ?? 'Sparkles',
    }))
    .filter((item) => item.title.length > 0);
}
