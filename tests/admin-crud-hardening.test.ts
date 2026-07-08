import { describe, expect, it } from 'vitest';
import { validateMenuParentRules, validateMenuRouteRules } from '@/lib/admin/validate-menu-route';
import { validatePageContentJson } from '@/lib/validation/page-content';
import { buildDefaultDonationPageContent } from '@/lib/types/page-content';
  
describe('validateMenuRouteRules', () => {
  it('requires parent for sub-catalog routes', () => {
    const errors = validateMenuRouteRules({
      routeType: 'SUBCATEGORY',
      parentId: null,
      customUrl: null,
    });
    expect(errors.parentId).toBeTruthy();
  });
 
  it('rejects top-level categories with a parent', () => {
    const errors = validateMenuRouteRules({
      routeType: 'CATEGORY',
      parentId: 'parent-id',
      customUrl: null,
    });
    expect(errors.parentId).toBeTruthy();
  });

  it('requires a usable custom URL', () => {
    const errors = validateMenuRouteRules({
      routeType: 'CUSTOM_URL',
      parentId: null,
      customUrl: 'not-a-url',
    });
    expect(errors.customUrl).toBeTruthy();
  });

  it('accepts internal custom paths', () => {
    const errors = validateMenuRouteRules({
      routeType: 'CUSTOM_URL',
      parentId: null,
      customUrl: '/khndzoresk',
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('validateMenuParentRules', () => {
  it('requires a top-level category parent for sub-catalogs', () => {
    const errors = validateMenuParentRules('SUBCATEGORY', {
      id: 'child-parent',
      parentId: 'grandparent',
      routeType: 'SUBCATEGORY',
    });
    expect(errors.parentId).toBeTruthy();
  });
});

describe('validatePageContentJson', () => {
  it('accepts valid donation page JSON', () => {
    const sample = buildDefaultDonationPageContent();
    const result = validatePageContentJson('donation-page', sample);
    expect(result.ok).toBe(true);
  });

  it('rejects donation page JSON missing metadata', () => {
    const result = validatePageContentJson('donation-page', { page: {} });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain('metadata');
    }
  });
});
