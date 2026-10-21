import type { CultureItemLocaleMedia } from '@/lib/culture-item-media-locale';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { toClassicalArmenian } from '@/lib/i18n/western-armenian';

function sliceHasText(slice: CultureItemLocaleMedia | undefined): boolean {
  if (!slice) return false;
  const parts = [
    ...slice.blocks.flatMap((block) => [block.title, block.subtitle, block.body, block.caption]),
    ...slice.tours.map((tour) => tour.title),
    ...slice.videos.map((video) => video.title),
    ...slice.gallery.flatMap((item) => [item.caption, item.alt]),
  ];
  return parts.some((part) => part.trim().length > 0);
}

function classicalSlice(slice: CultureItemLocaleMedia): CultureItemLocaleMedia {
  const text = (value: string): string => toClassicalArmenian(value);
  return {
    address: text(slice.address),
    blocks: slice.blocks.map((block) => ({
      ...block,
      title: text(block.title),
      subtitle: text(block.subtitle),
      body: text(block.body),
      caption: text(block.caption),
    })),
    tours: slice.tours.map((tour) => ({ ...tour, title: text(tour.title) })),
    videos: slice.videos.map((video) => ({ ...video, title: text(video.title) })),
    gallery: slice.gallery.map((item) => ({
      ...item,
      caption: text(item.caption),
      alt: text(item.alt),
    })),
  };
}

/** Western Armenian uses its own slice, or Eastern copy in classical spelling when that slice is empty. */
export function mediaSliceForLocale(
  byLocale: Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>>,
  locale: SiteLocaleCode,
): CultureItemLocaleMedia | undefined {
  const own = byLocale[locale];
  if (locale !== 'HYW' || sliceHasText(own)) return own;
  const eastern = byLocale.HY;
  if (!eastern || !sliceHasText(eastern)) return own;
  return classicalSlice(eastern);
}
