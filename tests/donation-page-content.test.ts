import { describe, expect, it } from 'vitest';
import { parseDonationPageContent } from '@/lib/types/page-content';

describe('parseDonationPageContent', () => {
  it('keeps certificate copy when stored page content predates that block', () => {
    const parsed = parseDonationPageContent({
      page: {
        hero: { title: 'Stored hero' },
      },
    });

    expect(parsed.page.hero.title).toBe('Stored hero');
    expect(parsed.page.certificates.label).toBe('Certificates');
    expect(parsed.page.certificates.slots).toHaveLength(3);
    expect(parsed.page.certificates.fields.email).toBe('Email');
  });
});
