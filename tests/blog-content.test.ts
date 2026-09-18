import { describe, expect, it } from 'vitest';
import { toBlogRenderHtml } from '@/lib/blog-content';

describe('toBlogRenderHtml', () => {
  it('splits plain text into section blocks with headings', () => {
    const html = toBlogRenderHtml(
      'Early Life: Born in Armenia. Khor Virap: Imprisoned for years. Legacy: Remembered today.',
    );

    expect(html).toContain('<section class="blog-detail-prose__block">');
    expect(html).toContain('<h2 class="blog-detail-prose__heading">Early Life</h2>');
    expect(html).toContain('<h2 class="blog-detail-prose__heading">Khor Virap</h2>');
    expect(html).toContain('<h2 class="blog-detail-prose__heading">Legacy</h2>');
  });

  it('preserves safe HTML and decorates headings', () => {
    const html = toBlogRenderHtml('<h2>Title</h2><p>Body text.</p>');

    expect(html).toContain('<h2 class="blog-detail-prose__heading">Title</h2>');
    expect(html).toContain('<p>Body text.</p>');
  });

  it('strips pasted editor colors so public copy stays readable on dark pages', () => {
    const html = toBlogRenderHtml(
      '<p style="color: rgb(26, 23, 20)"><span style="color:#000000">Body text.</span></p>',
    );

    expect(html).not.toContain('style=');
    expect(html).not.toContain('rgb(26, 23, 20)');
    expect(html).toContain('Body text.');
  });

  it('keeps text-align while stripping other inline styles', () => {
    const html = toBlogRenderHtml(
      '<p style="color:#000; text-align: center">Centered body.</p>',
    );

    expect(html).toContain('style="text-align: center"');
    expect(html).not.toContain('color');
    expect(html).toContain('Centered body.');
  });
});
