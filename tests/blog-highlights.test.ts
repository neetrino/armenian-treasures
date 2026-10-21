import { describe, expect, it } from 'vitest';
import { BLOG_HIGHLIGHT_COUNT, splitBlogHighlights } from '@/lib/blog-highlights';

const posts = [{ id: 'new' }, { id: 'mid' }, { id: 'old' }, { id: 'older' }];

describe('splitBlogHighlights', () => {
  it('keeps three posts above the chronological list', () => {
    expect(BLOG_HIGHLIGHT_COUNT).toBe(3);
  });

  it('puts featured posts on top and leaves the rest in list order', () => {
    expect(splitBlogHighlights(posts, [{ id: 'old' }, { id: 'missing' }])).toEqual({
      highlights: [{ id: 'old' }, { id: 'new' }, { id: 'mid' }],
      updates: [{ id: 'older' }],
    });
  });

  it('fills the top from the newest posts when nothing is featured', () => {
    expect(splitBlogHighlights(posts, [])).toEqual({
      highlights: [{ id: 'new' }, { id: 'mid' }, { id: 'old' }],
      updates: [{ id: 'older' }],
    });
  });
});
