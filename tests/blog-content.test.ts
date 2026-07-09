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
});
