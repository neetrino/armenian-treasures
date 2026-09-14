import { describe, expect, it } from 'vitest';
import {
  encodeDescriptionHtmlFromBlocks,
  hydrateBlogContentBlocks,
  parseBlogContentBlocks,
  resolveBlogContentBlocks,
  serializeBlogContentBlocks,
  type BlogContentBlock,
} from '@/lib/blog-content-blocks';
import { encodeTranslatableText } from '@/lib/i18n/translatable-content';
import { filterBlogPostsByCategory } from '@/lib/blog-filters';
import type { PublicBlogPostDTO } from '@/lib/dto';

function post(partial: Partial<PublicBlogPostDTO>): PublicBlogPostDTO {
  return {
    id: '1',
    title: 'Title',
    slug: 'title',
    content: 'Body',
    shortDescription: 'Excerpt',
    image: null,
    headerImage: null,
    backgroundImage: null,
    gallery: [],
    publishedAt: '2026-09-14T00:00:00.000Z',
    order: 0,
    category: null,
    ...partial,
  };
}

describe('blog content blocks', () => {
  it('hydrates legacy HTML and gallery into ordered blocks', () => {
    const html = encodeTranslatableText({ HY: 'Հայերեն տեքստ', EN: 'English body' });
    const blocks = hydrateBlogContentBlocks({
      content: html,
      galleryContent: [{ id: 'g1', kind: 'image', url: '/photo.jpg', caption: '', alt: '' }],
    });

    expect(blocks.map((block) => block.type)).toEqual(['description', 'gallery']);
    expect(resolveBlogContentBlocks(blocks, 'HY')[0]).toMatchObject({
      type: 'description',
      html: 'Հայերեն տեքստ',
    });
    expect(resolveBlogContentBlocks(blocks, 'EN')[0]).toMatchObject({
      type: 'description',
      html: 'English body',
    });
    expect(resolveBlogContentBlocks(blocks, 'RU')).toEqual([
      expect.objectContaining({ type: 'gallery' }),
    ]);
  });

  it('keeps locale-specific heading text when resolving', () => {
    const blocks: BlogContentBlock[] = [
      { id: 'h1', type: 'heading', text: { HY: 'Վերնագիր', FR: 'Titre' } },
      { id: 'd1', type: 'description', html: { HY: '<p>Մարմին</p>' } },
    ];

    expect(resolveBlogContentBlocks(blocks, 'HY').map((block) => block.type)).toEqual([
      'heading',
      'description',
    ]);
    expect(resolveBlogContentBlocks(blocks, 'FR')).toEqual([
      { id: 'h1', type: 'heading', text: 'Titre' },
    ]);
    expect(resolveBlogContentBlocks(blocks, 'EN')).toEqual([]);
  });

  it('round-trips JSON without dropping mixed block order', () => {
    const blocks: BlogContentBlock[] = [
      { id: 'd1', type: 'description', html: { EN: '<p>One</p>' } },
      { id: 'p1', type: 'photo', url: '/a.jpg', caption: { EN: 'A' } },
      { id: 'y1', type: 'youtube', url: 'https://www.youtube.com/watch?v=abc' },
      { id: 'g1', type: 'gallery', items: [] },
      { id: 'h1', type: 'heading', text: { EN: 'Next' } },
      { id: 'd2', type: 'description', html: { EN: '<p>Two</p>' } },
      { id: 'l1', type: 'link', url: 'https://example.com', label: { EN: 'Example' } },
    ];

    const parsed = parseBlogContentBlocks(serializeBlogContentBlocks(blocks));
    expect(parsed.map((block) => block.type)).toEqual([
      'description',
      'photo',
      'youtube',
      'gallery',
      'heading',
      'description',
      'link',
    ]);
    expect(encodeDescriptionHtmlFromBlocks(parsed)).toContain('One');
  });
});

describe('filterBlogPostsByCategory', () => {
  const news = post({
    id: 'n',
    slug: 'news-1',
    category: { id: 'c1', slug: 'news', title: 'News', order: 1 },
  });
  const stories = post({
    id: 's',
    slug: 'story-1',
    category: { id: 'c2', slug: 'stories', title: 'Stories', order: 2 },
  });

  it('returns every post when no category is selected', () => {
    expect(filterBlogPostsByCategory([news, stories])).toEqual([news, stories]);
  });

  it('keeps only the selected category', () => {
    expect(filterBlogPostsByCategory([news, stories], 'news')).toEqual([news]);
  });
});
