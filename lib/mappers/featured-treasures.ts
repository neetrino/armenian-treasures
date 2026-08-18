import type { FeaturedTreasure, FeaturedTreasureLayout } from '@/lib/constants/featured-treasures';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { resolveMenuIconKey } from '@/lib/navigation/menu-icons';

const LAYOUTS: FeaturedTreasureLayout[] = [
  'tall',
  'top-mid',
  'top-right',
  'bottom-mid',
  'bottom-right',
];

export const FEATURED_TREASURE_EXCERPT_LENGTH = 160;
export const HIGHLIGHT_TREASURE_EXCERPT_LENGTH = 92;

export function excerptFeaturedTreasureText(
  text: string,
  maxLength = FEATURED_TREASURE_EXCERPT_LENGTH,
): string {
  const normalized = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  const slice = normalized.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${trimmed}…`;
}

export function mapCultureItemToFeaturedTreasure(
  item: PublicCultureItemDetailDTO,
  index: number,
): FeaturedTreasure {
  const parent = item.menuItem?.parent;
  const menu = item.menuItem;
  const categories: [string, string] = parent
    ? [parent.title.toUpperCase(), menu?.title.toUpperCase() ?? 'HERITAGE']
    : [menu?.title.toUpperCase() ?? 'HERITAGE', item.itemType.replace('_', ' ')];

  const slug = menu?.slug ?? 'history';
  const parentSlug = parent?.slug;

  return {
    number: String(index + 1).padStart(2, '0'),
    icon: resolveMenuIconKey(slug, parentSlug),
    categories,
    title: item.title.toUpperCase(),
    description: excerptFeaturedTreasureText(item.shortDescription || item.description || ''),
    href: resolveCultureItemHref(item.slug),
    layout: LAYOUTS[index % LAYOUTS.length]!,
    cardBackgroundColor: item.cardBackgroundColor,
    cardBackgroundImage: item.cardBackgroundImage ?? item.image,
  };
}

export function mapCultureItemsToFeaturedTreasures(
  items: PublicCultureItemDetailDTO[],
): FeaturedTreasure[] {
  return items.map(mapCultureItemToFeaturedTreasure);
}

export function mapCultureItemsToHighlightTreasures(
  items: PublicCultureItemDetailDTO[],
): FeaturedTreasure[] {
  return items.map((item, index) => ({
    ...mapCultureItemToFeaturedTreasure(item, index),
    layout: 'tile',
    description: excerptFeaturedTreasureText(
      item.shortDescription || item.description || '',
      HIGHLIGHT_TREASURE_EXCERPT_LENGTH,
    ),
  }));
}
