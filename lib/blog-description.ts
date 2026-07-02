import { stripBlogHtml } from '@/lib/blog-content';

const DEFAULT_CARD_PREVIEW_LENGTH = 220;

export function truncateBlogDescription(text: string, maxLength = DEFAULT_CARD_PREVIEW_LENGTH): string {
  const normalized = stripBlogHtml(text).replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  const slice = normalized.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${trimmed}…`;
}

export function blogMetaDescription(content: string): string {
  return truncateBlogDescription(content, 160);
}
