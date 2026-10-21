import { describe, expect, it } from 'vitest';
import { facebookShareUrl } from '@/lib/blog-share';

describe('facebookShareUrl', () => {
  it('opens the Facebook composer for the public post', () => {
    expect(facebookShareUrl('/blog/khachkar', 'https://armenian.example')).toBe(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Farmenian.example%2Fblog%2Fkhachkar',
    );
  });
});
