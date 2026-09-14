import {
  parseCultureItemMedia,
  type CultureGalleryBlock,
} from '@/lib/culture-item-media';
import { SITE_LOCALE_CODES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import {
  decodeTranslatableText,
  encodeTranslatableText,
  pickDefaultLocaleText,
  type LocaleTextMap,
} from '@/lib/i18n/translatable-content';

export const BLOG_CONTENT_BLOCKS_VERSION = 1 as const;

export const BLOG_BLOCK_TYPES = [
  'heading',
  'description',
  'photo',
  'youtube',
  'gallery',
  'link',
] as const;

export type BlogBlockType = (typeof BLOG_BLOCK_TYPES)[number];

export interface BlogHeadingBlock {
  id: string;
  type: 'heading';
  text: LocaleTextMap;
}

export interface BlogDescriptionBlock {
  id: string;
  type: 'description';
  html: LocaleTextMap;
}

export interface BlogPhotoBlock {
  id: string;
  type: 'photo';
  url: string;
  caption: LocaleTextMap;
}

export interface BlogYoutubeBlock {
  id: string;
  type: 'youtube';
  url: string;
}

export interface BlogGalleryBlock {
  id: string;
  type: 'gallery';
  items: CultureGalleryBlock[];
}

export interface BlogLinkBlock {
  id: string;
  type: 'link';
  url: string;
  label: LocaleTextMap;
}

export type BlogContentBlock =
  | BlogHeadingBlock
  | BlogDescriptionBlock
  | BlogPhotoBlock
  | BlogYoutubeBlock
  | BlogGalleryBlock
  | BlogLinkBlock;

export interface BlogContentBlocksPayload {
  v: typeof BLOG_CONTENT_BLOCKS_VERSION;
  blocks: BlogContentBlock[];
}

export interface ResolvedBlogHeadingBlock {
  id: string;
  type: 'heading';
  text: string;
}

export interface ResolvedBlogDescriptionBlock {
  id: string;
  type: 'description';
  html: string;
}

export interface ResolvedBlogPhotoBlock {
  id: string;
  type: 'photo';
  url: string;
  caption: string;
}

export interface ResolvedBlogYoutubeBlock {
  id: string;
  type: 'youtube';
  url: string;
}

export interface ResolvedBlogGalleryBlock {
  id: string;
  type: 'gallery';
  items: CultureGalleryBlock[];
}

export interface ResolvedBlogLinkBlock {
  id: string;
  type: 'link';
  url: string;
  label: string;
}

export type ResolvedBlogContentBlock =
  | ResolvedBlogHeadingBlock
  | ResolvedBlogDescriptionBlock
  | ResolvedBlogPhotoBlock
  | ResolvedBlogYoutubeBlock
  | ResolvedBlogGalleryBlock
  | ResolvedBlogLinkBlock;

export const BLOG_BLOCK_LABELS: Record<BlogBlockType, string> = {
  heading: 'Heading',
  description: 'Description',
  photo: 'Photo',
  youtube: 'YouTube',
  gallery: 'Gallery',
  link: 'Link',
};

function createId(): string {
  return `blog-${Math.random().toString(36).slice(2, 10)}`;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isBlogBlockType(value: unknown): value is BlogBlockType {
  return typeof value === 'string' && (BLOG_BLOCK_TYPES as readonly string[]).includes(value);
}

function parseLocaleMap(value: unknown): LocaleTextMap {
  if (typeof value === 'string') {
    return decodeTranslatableText(value);
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const row = value as Record<string, unknown>;
  if (row.__at_i18n_v1 === true && row.values && typeof row.values === 'object') {
    return decodeTranslatableText(JSON.stringify(row));
  }
  const map: LocaleTextMap = {};
  for (const locale of SITE_LOCALE_CODES) {
    const entry = row[locale];
    if (typeof entry === 'string' && entry.trim()) {
      map[locale] = entry;
    }
  }
  return map;
}

function localeText(map: LocaleTextMap, locale: SiteLocaleCode): string {
  return map[locale]?.trim() ?? '';
}

function parseGalleryItems(value: unknown): CultureGalleryBlock[] {
  if (Array.isArray(value)) {
    return parseCultureItemMedia({ gallery: value }).gallery;
  }
  if (value && typeof value === 'object') {
    return parseCultureItemMedia(value).gallery;
  }
  return [];
}

function parseBlock(value: unknown): BlogContentBlock | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  const type = row.type;
  if (!isBlogBlockType(type)) return null;
  const id = asString(row.id) || createId();

  switch (type) {
    case 'heading':
      return { id, type, text: parseLocaleMap(row.text) };
    case 'description':
      return { id, type, html: parseLocaleMap(row.html ?? row.body ?? row.content) };
    case 'photo':
      return { id, type, url: asString(row.url), caption: parseLocaleMap(row.caption) };
    case 'youtube':
      return { id, type, url: asString(row.url) };
    case 'gallery':
      return { id, type, items: parseGalleryItems(row.items ?? row.gallery) };
    case 'link':
      return { id, type, url: asString(row.url), label: parseLocaleMap(row.label) };
  }
}

export function emptyBlogBlock(type: BlogBlockType): BlogContentBlock {
  const id = createId();
  switch (type) {
    case 'heading':
      return { id, type, text: {} };
    case 'description':
      return { id, type, html: {} };
    case 'photo':
      return { id, type, url: '', caption: {} };
    case 'youtube':
      return { id, type, url: '' };
    case 'gallery':
      return { id, type, items: [] };
    case 'link':
      return { id, type, url: '', label: {} };
  }
}

export function parseBlogContentBlocks(raw: unknown): BlogContentBlock[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map(parseBlock).filter((block): block is BlogContentBlock => Boolean(block));
  }
  if (typeof raw === 'string') {
    try {
      return parseBlogContentBlocks(JSON.parse(raw) as unknown);
    } catch {
      return [];
    }
  }
  if (typeof raw !== 'object') return [];
  const row = raw as Record<string, unknown>;
  if (Array.isArray(row.blocks)) {
    return row.blocks.map(parseBlock).filter((block): block is BlogContentBlock => Boolean(block));
  }
  return [];
}

export function serializeBlogContentBlocks(blocks: BlogContentBlock[]): BlogContentBlocksPayload {
  return { v: BLOG_CONTENT_BLOCKS_VERSION, blocks };
}

export function hydrateBlogContentBlocks(input: {
  contentBlocks?: unknown;
  content?: string | null;
  galleryContent?: unknown;
}): BlogContentBlock[] {
  const stored = parseBlogContentBlocks(input.contentBlocks);
  if (stored.length > 0) return stored;

  const blocks: BlogContentBlock[] = [];
  const legacyHtml = decodeTranslatableText(input.content);
  if (SITE_LOCALE_CODES.some((locale) => legacyHtml[locale]?.trim())) {
    blocks.push({ id: createId(), type: 'description', html: legacyHtml });
  }
  const gallery = parseCultureItemMedia({ gallery: input.galleryContent }).gallery.filter(
    (item) => item.kind !== 'beforeAfter' && item.url.trim(),
  );
  if (gallery.length > 0) {
    blocks.push({ id: createId(), type: 'gallery', items: gallery });
  }
  return blocks;
}

export function flattenGalleryFromBlocks(blocks: BlogContentBlock[]): CultureGalleryBlock[] {
  return blocks.flatMap((block) => {
    if (block.type === 'gallery') return block.items;
    if (block.type === 'photo' && block.url.trim()) {
      return [
        {
          id: block.id,
          kind: 'image' as const,
          url: block.url,
          beforeUrl: '',
          afterUrl: '',
          caption: encodeTranslatableText(block.caption),
          alt: pickDefaultLocaleText(block.caption),
        },
      ];
    }
    return [];
  });
}

export function encodeDescriptionHtmlFromBlocks(blocks: BlogContentBlock[]): string {
  const maps = blocks
    .filter((block): block is BlogDescriptionBlock => block.type === 'description')
    .map((block) => block.html);
  if (maps.length === 0) return '';
  if (maps.length === 1) return encodeTranslatableText(maps[0] ?? {});

  const merged: LocaleTextMap = {};
  for (const locale of SITE_LOCALE_CODES) {
    const parts = maps.map((map) => map[locale]?.trim()).filter((part): part is string => Boolean(part));
    if (parts.length > 0) merged[locale] = parts.join('\n');
  }
  return encodeTranslatableText(merged);
}

export function resolveBlogContentBlocks(
  blocks: BlogContentBlock[],
  locale: SiteLocaleCode,
): ResolvedBlogContentBlock[] {
  const resolved: ResolvedBlogContentBlock[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case 'heading': {
        const text = localeText(block.text, locale);
        if (text) resolved.push({ id: block.id, type: 'heading', text });
        break;
      }
      case 'description': {
        const html = localeText(block.html, locale);
        if (html) resolved.push({ id: block.id, type: 'description', html });
        break;
      }
      case 'photo': {
        if (block.url.trim()) {
          resolved.push({
            id: block.id,
            type: 'photo',
            url: block.url,
            caption: localeText(block.caption, locale),
          });
        }
        break;
      }
      case 'youtube': {
        if (block.url.trim()) {
          resolved.push({ id: block.id, type: 'youtube', url: block.url });
        }
        break;
      }
      case 'gallery': {
        const items = block.items.filter((item) => item.kind !== 'beforeAfter' && item.url.trim());
        if (items.length > 0) {
          resolved.push({ id: block.id, type: 'gallery', items });
        }
        break;
      }
      case 'link': {
        if (block.url.trim()) {
          resolved.push({
            id: block.id,
            type: 'link',
            url: block.url,
            label: localeText(block.label, locale) || block.url,
          });
        }
        break;
      }
    }
  }
  return resolved;
}

export function hasLocaleBlockContent(blocks: BlogContentBlock[], locale: SiteLocaleCode): boolean {
  return resolveBlogContentBlocks(blocks, locale).length > 0;
}
