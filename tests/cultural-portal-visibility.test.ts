import { describe, expect, it } from 'vitest';
import { DEFAULT_CULTURAL_PORTAL_SECTION_VISIBILITY } from '@/lib/landing/landing-section-visibility';
import { isSectionEnabled } from '@/lib/landing/landing-section-utils';
import { parseCulturalPortalPageContent } from '@/lib/types/page-content';

describe('cultural portal section visibility', () => {
  it('defaults to shortcuts and map only', () => {
    const visibility = DEFAULT_CULTURAL_PORTAL_SECTION_VISIBILITY;
    expect(isSectionEnabled(visibility, 'categories')).toBe(true);
    expect(isSectionEnabled(visibility, 'map')).toBe(true);
    expect(isSectionEnabled(visibility, 'hero')).toBe(false);
    expect(isSectionEnabled(visibility, 'highlights')).toBe(false);
    expect(isSectionEnabled(visibility, 'projects')).toBe(false);
  });

  it('applies the shortcuts-and-map default when stored content has no visibility', () => {
    const parsed = parseCulturalPortalPageContent({});
    expect(parsed.sectionVisibility).toEqual(DEFAULT_CULTURAL_PORTAL_SECTION_VISIBILITY);
  });
});
