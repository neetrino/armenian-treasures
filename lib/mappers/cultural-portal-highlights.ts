import type { CulturalPortalHighlightIcon } from '@/lib/constants/cultural-portal-page';
import type { PublicCultureItemDetailDTO } from '@/lib/dto';
import { resolveCultureItemHref } from '@/lib/culture-item-url';

const ITEM_TYPE_ICON: Record<string, CulturalPortalHighlightIcon> = {
  MONUMENT: 'geghard',
  MUSEUM: 'geghard',
  MUSIC: 'duduk',
  PERSON: 'tigranes',
  FOOD: 'areni',
  HERITAGE_OBJECT: 'areni',
};

function resolveHighlightIcon(item: PublicCultureItemDetailDTO): CulturalPortalHighlightIcon {
  if (ITEM_TYPE_ICON[item.itemType]) return ITEM_TYPE_ICON[item.itemType]!;
  const slug = item.menuItem?.slug ?? '';
  if (slug.includes('music')) return 'duduk';
  if (slug.includes('food')) return 'areni';
  if (slug.includes('people') || slug.includes('history')) return 'tigranes';
  return 'geghard';
}

export function mapCultureItemToHighlight(
  item: PublicCultureItemDetailDTO,
  index: number,
): {
  num: string;
  icon: CulturalPortalHighlightIcon;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  featured?: boolean;
} {
  const parent = item.menuItem?.parent;
  const menu = item.menuItem;
  const tag = parent ? `${parent.title} · ${menu?.title ?? 'Heritage'}` : menu?.title ?? 'Heritage';

  return {
    num: String(index + 1).padStart(2, '0'),
    icon: resolveHighlightIcon(item),
    tag,
    title: item.title,
    excerpt: item.shortDescription ?? item.description ?? '',
    href: resolveCultureItemHref(item.slug),
    featured: index === 0,
  };
}

export function mapCultureItemsToHighlights(items: PublicCultureItemDetailDTO[]) {
  return items.map(mapCultureItemToHighlight);
}
