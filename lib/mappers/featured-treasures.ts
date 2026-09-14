import {
  DISCOVER_MORE_HIGHLIGHTS_TREASURE,
  type FeaturedTreasure,
  type FeaturedTreasureLayout,
} from '@/lib/constants/featured-treasures';
import type { PublicBlogPostDTO, PublicCultureItemDetailDTO } from '@/lib/dto';
import { firstBlockBody } from '@/lib/culture-item-media';
import { resolveCultureItemHref } from '@/lib/culture-item-url';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
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
  locale: SiteLocaleCode = 'EN',
): FeaturedTreasure {
  const parent = item.menuItem?.parent;
  const menu = item.menuItem;
  const heritage = uiMessage(locale, 'heritageFallbackCategory');
  const categories: [string, string] = parent
    ? [parent.title.toUpperCase(), menu?.title.toUpperCase() ?? heritage]
    : [menu?.title.toUpperCase() ?? heritage, item.itemType.replace('_', ' ')];

  const slug = menu?.slug ?? 'history';
  const parentSlug = parent?.slug;

  return {
    number: String(index + 1).padStart(2, '0'),
    icon: resolveMenuIconKey(slug, parentSlug),
    categories,
    title: item.title.toUpperCase(),
    description: excerptFeaturedTreasureText(
      item.shortDescription || item.description || firstBlockBody(item.media) || '',
    ),
    href: resolveCultureItemHref(item.slug),
    layout: LAYOUTS[index % LAYOUTS.length]!,
    cardBackgroundColor: null,
    cardBackgroundImage: item.cardBackgroundImage ?? item.image,
  };
}

export function mapCultureItemsToFeaturedTreasures(
  items: PublicCultureItemDetailDTO[],
  locale: SiteLocaleCode = 'EN',
): FeaturedTreasure[] {
  return items.map((item, index) => mapCultureItemToFeaturedTreasure(item, index, locale));
}

function isVahanavankTreasure(treasure: FeaturedTreasure): boolean {
  return /vahanavank/i.test(treasure.href) || /vahanavank/i.test(treasure.title);
}

/** Five mosaic cells: four stories + Discover more in the bottom-right slot. */
export function buildHomeFeaturedMosaic(
  treasures: FeaturedTreasure[],
  locale: SiteLocaleCode = 'EN',
): FeaturedTreasure[] {
  const stories = treasures.filter((treasure) => !isVahanavankTreasure(treasure)).slice(0, 4);
  const discoverMore: FeaturedTreasure = {
    ...DISCOVER_MORE_HIGHLIGHTS_TREASURE,
    categories: [uiMessage(locale, 'highlightsCategory'), uiMessage(locale, 'archiveCategory')],
    title: uiMessage(locale, 'discoverMoreHighlights'),
    description: uiMessage(locale, 'discoverMoreHighlightsDescription'),
  };
  const mosaic = [stories[0], stories[1], stories[3], stories[2], discoverMore].filter(
    (entry): entry is FeaturedTreasure => Boolean(entry),
  );

  return mosaic.map((treasure, index) => ({
    ...treasure,
    layout: LAYOUTS[index] ?? treasure.layout,
  }));
}

export function mapBlogPostsToFeaturedTreasures(
  posts: PublicBlogPostDTO[],
  locale: SiteLocaleCode = 'EN',
): FeaturedTreasure[] {
  return posts.map((post, index) => ({
    number: String(index + 1).padStart(2, '0'),
    icon: 'publications',
    categories: [uiMessage(locale, 'communityCategory'), uiMessage(locale, 'updateCategory')],
    title: post.title.toUpperCase(),
    description: excerptFeaturedTreasureText(post.content),
    href: `/blog/${post.slug}`,
    layout: LAYOUTS[index % LAYOUTS.length]!,
    cardBackgroundColor: null,
    cardBackgroundImage: post.image,
  }));
}

export function mapCultureItemsToHighlightTreasures(
  items: PublicCultureItemDetailDTO[],
  locale: SiteLocaleCode = 'EN',
): FeaturedTreasure[] {
  return items.map((item, index) => ({
    ...mapCultureItemToFeaturedTreasure(item, index, locale),
    layout: 'tile',
    description: excerptFeaturedTreasureText(
      item.shortDescription || item.description || firstBlockBody(item.media) || '',
      HIGHLIGHT_TREASURE_EXCERPT_LENGTH,
    ),
  }));
}
