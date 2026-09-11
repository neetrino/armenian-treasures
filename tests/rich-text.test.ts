import { describe, expect, it } from 'vitest';
import { looksLikeHtml, stripRichText, toSafeRichTextHtml } from '@/lib/rich-text';

describe('rich text helpers', () => {
  it('keeps bold tags and strips scripts', () => {
    const html = toSafeRichTextHtml('<p>Hello <b>world</b><script>alert(1)</script></p>');
    expect(html).toContain('<b>world</b>');
    expect(html).not.toContain('script');
  });

  it('strips tags for excerpts', () => {
    expect(stripRichText('<p>Hello <b>world</b></p>')).toBe('Hello world');
    expect(looksLikeHtml('<b>x</b>')).toBe(true);
    expect(looksLikeHtml('plain')).toBe(false);
  });
});
