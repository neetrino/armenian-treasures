import {
  emptyMediaContent,
  parseCultureItemMedia,
  type CultureDescriptionBlock,
  type CultureGalleryBlock,
  type CultureItemMediaContent,
  type CultureTourBlock,
  type CultureVideoBlock,
} from '@/lib/culture-item-media';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';

export interface CultureItemLocaleMedia {
  address: string;
  blocks: CultureDescriptionBlock[];
  tours: CultureTourBlock[];
  videos: CultureVideoBlock[];
  gallery: CultureGalleryBlock[];
}

export function sliceLocaleMedia(media: CultureItemMediaContent): CultureItemLocaleMedia {
  return {
    address: media.address,
    blocks: media.blocks,
    tours: media.tours,
    videos: media.videos,
    gallery: media.gallery,
  };
}

export function applyLocaleMedia(
  media: CultureItemMediaContent,
  slice: CultureItemLocaleMedia,
): CultureItemMediaContent {
  return {
    ...media,
    address: slice.address,
    blocks: slice.blocks,
    tours: slice.tours,
    videos: slice.videos,
    gallery: slice.gallery,
  };
}

function asLocaleMedia(value: unknown): CultureItemLocaleMedia | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const parsed = parseCultureItemMedia({ ...emptyMediaContent(), ...(value as object) });
  return sliceLocaleMedia(parsed);
}

function inferLocaleFromMediaRoot(root: CultureItemMediaContent): SiteLocaleCode {
  const samples = [
    root.address,
    ...root.blocks.flatMap((block) => [block.title, block.subtitle, block.body, block.caption]),
    ...root.tours.map((tour) => tour.title),
    ...root.videos.map((video) => video.title),
    ...root.gallery.flatMap((item) => [item.caption, item.alt]),
  ]
    .filter(Boolean)
    .join('\n');
  if (/[\u0530-\u058F]/.test(samples)) return 'HY';
  if (/[\u0400-\u04FF]/.test(samples)) return 'RU';
  if (/[A-Za-z]/.test(samples)) return 'EN';
  return 'EN';
}

export function parseMediaByLocale(raw: unknown): Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>> {
  const root = parseCultureItemMedia(raw);
  const record =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>).byLocale
      : undefined;
  const byLocale: Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>> = {};
  if (record && typeof record === 'object' && !Array.isArray(record)) {
    for (const code of SITE_LOCALE_CODES) {
      const parsed = asLocaleMedia((record as Record<string, unknown>)[code]);
      if (parsed) {
        // Keep each locale's address as stored — never fill from root (root may be another locale).
        byLocale[code] = parsed;
      }
    }
  }
  // Legacy rows without byLocale: attribute root to the script locale, not always EN.
  if (Object.keys(byLocale).length === 0) {
    byLocale[inferLocaleFromMediaRoot(root)] = sliceLocaleMedia(root);
  }
  return byLocale;
}

export function mediaForLocale(
  media: CultureItemMediaContent,
  byLocale: Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>>,
  locale: SiteLocaleCode,
): CultureItemMediaContent {
  const slice = byLocale[locale];
  // URLs / structure stay on the shared root; titles / captions / blocks are locale-strict.
  if (!slice) {
    return {
      ...media,
      address: '',
      blocks: [],
      tours: media.tours.map((tour) => ({ ...tour, title: '' })),
      videos: media.videos.map((video) => ({ ...video, title: '' })),
      gallery: media.gallery.map((item) => ({ ...item, caption: '', alt: '' })),
    };
  }
  const toursById = new Map(slice.tours.map((tour) => [tour.id, tour]));
  const videosById = new Map(slice.videos.map((video) => [video.id, video]));
  const galleryById = new Map(slice.gallery.map((item) => [item.id, item]));
  return {
    ...media,
    address: slice.address,
    blocks: slice.blocks,
    tours: media.tours.map((tour) => ({
      ...tour,
      title: toursById.get(tour.id)?.title ?? '',
    })),
    videos: media.videos.map((video) => ({
      ...video,
      title: videosById.get(video.id)?.title ?? '',
    })),
    gallery: media.gallery.map((item) => {
      const localized = galleryById.get(item.id);
      return {
        ...item,
        caption: localized?.caption ?? '',
        alt: localized?.alt ?? '',
      };
    }),
  };
}

/** Propagate shared media (tours/videos/gallery) to every locale slice. */
export function syncSharedLocaleMedia(
  map: Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>>,
  shared: Pick<CultureItemLocaleMedia, 'tours' | 'videos' | 'gallery'>,
): Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>> {
  const next = { ...map };
  for (const code of SITE_LOCALE_CODES) {
    const existing = next[code];
    if (!existing) continue;
    next[code] = {
      ...existing,
      tours: shared.tours,
      videos: shared.videos,
      gallery: shared.gallery,
    };
  }
  return next;
}

export function emptyTextLocaleMedia(source: CultureItemLocaleMedia): CultureItemLocaleMedia {
  return {
    address: '',
    blocks: source.blocks.map((block) => ({
      ...block,
      title: '',
      subtitle: '',
      body: '',
      caption: '',
    })),
    tours: source.tours.map((tour) => ({ ...tour, title: '' })),
    videos: source.videos.map((video) => ({ ...video, title: '' })),
    gallery: source.gallery.map((item) => ({ ...item, caption: '', alt: '' })),
  };
}
