import { getAdminLocaleValue } from '@/lib/i18n/translatable-content';

import { isCultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';
import type { CultureItemEditorSectionId } from '@/lib/admin/culture-item-editor-sections';

export const CULTURE_ITEM_MEDIA_VERSION = 1 as const;
export const DEFAULT_MAP_COORDINATES = { latitude: 40.1792, longitude: 44.4991 } as const;

export const TOUR_TYPE_OPTIONS = [
  { value: 'LIDAR', label: 'LiDAR Scanning' },
  { value: 'SCAN_3D', label: '3D Scanning' },
  { value: 'DRONE', label: 'Drone Photogrammetry' },
] as const;

export type CultureTourType = (typeof TOUR_TYPE_OPTIONS)[number]['value'];

export interface CultureDescriptionBlock {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  caption: string;
}

export interface CultureTourBlock {
  id: string;
  type: CultureTourType;
  title: string;
  url: string;
  previewImage: string;
}

export interface CultureVideoBlock {
  id: string;
  title: string;
  url: string;
  previewImage: string;
}

export interface CultureGalleryBlock {
  id: string;
  kind: 'image' | 'beforeAfter';
  url: string;
  beforeUrl: string;
  afterUrl: string;
  caption: string;
  alt: string;
}

export interface CultureItemMediaContent {
  v: typeof CULTURE_ITEM_MEDIA_VERSION;
  address: string;
  blocks: CultureDescriptionBlock[];
  tours: CultureTourBlock[];
  videos: CultureVideoBlock[];
  gallery: CultureGalleryBlock[];
  sectionOrder?: CultureItemEditorSectionId[];
  byLocale?: Partial<Record<string, unknown>>;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function looksLikeHttpUrl(value: string): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Some admin saves put the Matterport/iframe URL in `title` and leave `url` empty.
 * Normalize so the public page can embed the tour.
 */
export function normalizeTourBlock(tour: CultureTourBlock): CultureTourBlock {
  const title = tour.title.trim();
  const url = tour.url.trim();
  if (url || !looksLikeHttpUrl(title)) {
    return { ...tour, title, url };
  }
  return { ...tour, title: '', url: title };
}

function asTourType(value: unknown): CultureTourType {
  if (value === 'SCAN_3D' || value === 'MODEL_3D' || value === 'MATTERPORT') return 'SCAN_3D';
  if (value === 'DRONE') return 'DRONE';
  return 'LIDAR';
}

function createId(): string {
  return `media-${Math.random().toString(36).slice(2, 10)}`;
}

export function emptyDescriptionBlock(): CultureDescriptionBlock {
  return { id: createId(), title: '', subtitle: '', body: '', image: '', caption: '' };
}

export function emptyTourBlock(): CultureTourBlock {
  return { id: createId(), type: 'LIDAR', title: '', url: '', previewImage: '' };
}

export function emptyVideoBlock(): CultureVideoBlock {
  return { id: createId(), title: '', url: '', previewImage: '' };
}

export function emptyGalleryBlock(kind: CultureGalleryBlock['kind'] = 'image'): CultureGalleryBlock {
  return { id: createId(), kind, url: '', beforeUrl: '', afterUrl: '', caption: '', alt: '' };
}

function parseBlock(value: unknown): CultureDescriptionBlock {
  const row = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    id: asString(row.id) || createId(),
    title: asString(row.title),
    subtitle: asString(row.subtitle),
    body: asString(row.body),
    image: asString(row.image),
    caption: asString(row.caption),
  };
}

function parseTour(value: unknown): CultureTourBlock {
  const row = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return normalizeTourBlock({
    id: asString(row.id) || createId(),
    type: asTourType(row.type),
    title: asString(row.title),
    url: asString(row.url),
    previewImage: asString(row.previewImage),
  });
}

function parseVideo(value: unknown): CultureVideoBlock {
  const row = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    id: asString(row.id) || createId(),
    title: asString(row.title),
    url: asString(row.url),
    previewImage: asString(row.previewImage),
  };
}

function parseGallery(value: unknown): CultureGalleryBlock {
  const row = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    id: asString(row.id) || createId(),
    kind: row.kind === 'beforeAfter' ? 'beforeAfter' : 'image',
    url: asString(row.url),
    beforeUrl: asString(row.beforeUrl),
    afterUrl: asString(row.afterUrl),
    caption: asString(row.caption),
    alt: asString(row.alt),
  };
}

export function emptyMediaContent(): CultureItemMediaContent {
  return { v: CULTURE_ITEM_MEDIA_VERSION, address: '', blocks: [], tours: [], videos: [], gallery: [] };
}

function parseSectionOrder(raw: unknown): CultureItemEditorSectionId[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const parsed = raw.filter(
    (value): value is CultureItemEditorSectionId => typeof value === 'string' && isCultureItemEditorSectionId(value),
  );
  return parsed.length > 0 ? parsed : undefined;
}

export function parseCultureItemMedia(raw: unknown): CultureItemMediaContent {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return emptyMediaContent();
  const row = raw as Record<string, unknown>;
  const byLocale =
    row.byLocale && typeof row.byLocale === 'object' && !Array.isArray(row.byLocale)
      ? (row.byLocale as Partial<Record<string, unknown>>)
      : undefined;
  return {
    v: CULTURE_ITEM_MEDIA_VERSION,
    address: asString(row.address),
    blocks: Array.isArray(row.blocks) ? row.blocks.map(parseBlock) : [],
    tours: Array.isArray(row.tours) ? row.tours.map(parseTour) : [],
    videos: Array.isArray(row.videos) ? row.videos.map(parseVideo) : [],
    gallery: Array.isArray(row.gallery) ? row.gallery.map(parseGallery) : [],
    sectionOrder: parseSectionOrder(row.sectionOrder),
    byLocale,
  };
}

export function hydrateCultureItemMedia(input: {
  mediaContent?: unknown;
  description?: string | null;
  tourUrl?: string | null;
  videoUrl?: string | null;
  galleryImages?: string[] | null;
}): CultureItemMediaContent {
  const media = parseCultureItemMedia(input.mediaContent);
  const legacyDescription = getAdminLocaleValue(input.description);
  if (media.blocks.length === 0 && legacyDescription) {
    media.blocks.push({ ...emptyDescriptionBlock(), body: legacyDescription });
  }
  if (media.tours.length === 0 && input.tourUrl?.trim()) {
    media.tours.push({ ...emptyTourBlock(), url: input.tourUrl.trim() });
  }
  if (media.videos.length === 0 && input.videoUrl?.trim()) {
    media.videos.push({ ...emptyVideoBlock(), url: input.videoUrl.trim() });
  }
  if (media.gallery.length === 0) {
    media.gallery = (input.galleryImages ?? [])
      .filter((url) => url.trim().length > 0)
      .map((url) => ({ ...emptyGalleryBlock(), url }));
  }
  if (media.blocks.length === 0) media.blocks.push(emptyDescriptionBlock());
  return media;
}

export function galleryUrlsFromMedia(media: CultureItemMediaContent): string[] {
  return media.gallery.flatMap((item) => {
    if (item.kind === 'beforeAfter') {
      return [item.beforeUrl, item.afterUrl].filter((url) => url.length > 0);
    }
    return item.url ? [item.url] : [];
  });
}

export function firstTourUrl(media: CultureItemMediaContent): string | null {
  const tour = media.tours.map(normalizeTourBlock).find((entry) => entry.url);
  return tour?.url ?? null;
}

export function firstVideoUrl(media: CultureItemMediaContent): string | null {
  return media.videos.find((video) => video.url)?.url ?? null;
}

export function firstBlockBody(media: CultureItemMediaContent): string | null {
  return media.blocks.find((block) => block.body)?.body ?? null;
}
