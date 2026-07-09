import type { FeaturedTreasure, FeaturedTreasureLayout } from '@/lib/constants/featured-treasures';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import { resolveMenuIconKey } from '@/lib/navigation/menu-icons';

const LAYOUTS: FeaturedTreasureLayout[] = [
  'tall',
  'top-mid',
  'top-right',
  'bottom-mid',
];

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
    description: item.shortDescription ?? item.description ?? '',
    href: resolveCultureItemHref(item.slug),
    layout: LAYOUTS[index % LAYOUTS.length]!,
    cardBackgroundColor: item.cardBackgroundColor,
    cardBackgroundImage: item.cardBackgroundImage,
  };
}

export function mapCultureItemsToFeaturedTreasures(
  items: PublicCultureItemDetailDTO[],
): FeaturedTreasure[] {
  return items.map(mapCultureItemToFeaturedTreasure);
}
