import { describe, expect, it } from 'vitest';
import { HOME_NEWS_POST_COUNT, planFeaturedHomeToggle } from '@/lib/blog-featured-home';

const slots = [
  { id: 'a', featuredOrder: 1 },
  { id: 'b', featuredOrder: 2 },
  { id: 'c', featuredOrder: 3 },
  { id: 'd', featuredOrder: 4 },
];

describe('planFeaturedHomeToggle', () => {
  it('keeps the homepage cap at one large card and three small cards', () => {
    expect(HOME_NEWS_POST_COUNT).toBe(4);
  });

  it('turns an empty slot on and appends after the current order', () => {
    expect(planFeaturedHomeToggle(slots.slice(0, 2), 'new')).toEqual({
      type: 'on',
      featuredOrder: 3,
    });
  });

  it('turns a starred post off without asking for a replacement', () => {
    expect(planFeaturedHomeToggle(slots, 'b')).toEqual({ type: 'off' });
  });

  it('asks which star to remove when a fifth post is selected', () => {
    expect(planFeaturedHomeToggle(slots, 'new')).toEqual({ type: 'needs-replace' });
    expect(planFeaturedHomeToggle(slots, 'new', 'missing')).toEqual({ type: 'needs-replace' });
  });

  it('replaces the chosen starred post and keeps its slot', () => {
    expect(planFeaturedHomeToggle(slots, 'new', 'a')).toEqual({
      type: 'replace',
      replaceId: 'a',
      featuredOrder: 1,
    });
  });
});
