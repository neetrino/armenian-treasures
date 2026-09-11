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
  blocks: CultureDescriptionBlock[];
  tours: CultureTourBlock[];
  videos: CultureVideoBlock[];
  gallery: CultureGalleryBlock[];
}

export function sliceLocaleMedia(media: CultureItemMediaContent): CultureItemLocaleMedia {
  return {
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
      if (parsed) byLocale[code] = parsed;
    }
  }
  // Legacy rows without byLocale: treat root as EN only.
  // Never seed EN from root when other locales already exist — root may be the last edited locale.
  if (Object.keys(byLocale).length === 0) {
    byLocale.EN = sliceLocaleMedia(root);
  }
  return byLocale;
}

export function mediaForLocale(
  media: CultureItemMediaContent,
  byLocale: Partial<Record<SiteLocaleCode, CultureItemLocaleMedia>>,
  locale: SiteLocaleCode,
): CultureItemMediaContent {
  const slice = byLocale[locale] ?? byLocale.EN ?? sliceLocaleMedia(media);
  // Tours / videos / gallery stay on the shared root (static across locales).
  // Only description blocks are locale-specific.
  return {
    ...media,
    blocks: slice.blocks,
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
