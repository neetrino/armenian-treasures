import { describe, expect, it } from 'vitest';
import {
  PAGE_CONTENT_PUBLIC_PATHS,
  PUBLIC_API_ROUTES,
  PUBLIC_LAYOUT_PATHS,
} from '@/lib/cache/revalidation';

describe('cache revalidation matrix', () => {
  it('covers layout chrome paths used by header and footer', () => {
    expect(PUBLIC_LAYOUT_PATHS).toContain('/');
    expect(PUBLIC_LAYOUT_PATHS).toContain('/contacts');
    expect(PUBLIC_LAYOUT_PATHS).toContain('/culture');
    expect(PUBLIC_LAYOUT_PATHS).toContain('/partnership');
  });

  it('maps page content slugs to public landing routes', () => {
    expect(PAGE_CONTENT_PUBLIC_PATHS['donation-page']).toEqual(['/donate']);
    expect(PAGE_CONTENT_PUBLIC_PATHS['cultural-portal-page']).toEqual(['/culture']);
    expect(PAGE_CONTENT_PUBLIC_PATHS.khndzoresk).toEqual(['/khndzoresk']);
  });

  it('lists public JSON endpoints for admin-triggered refresh', () => {
    expect(PUBLIC_API_ROUTES.home).toBe('/api/home');
    expect(PUBLIC_API_ROUTES.settings).toBe('/api/settings');
    expect(PUBLIC_API_ROUTES.projects).toBe('/api/projects');
    expect(PUBLIC_API_ROUTES.donators).toBe('/api/donators');
    expect(PUBLIC_API_ROUTES.map).toBe('/api/map');
    expect(PUBLIC_API_ROUTES.cultureMenu).toBe('/api/culture/menu');
    expect(PUBLIC_API_ROUTES.cultureItems).toBe('/api/culture/items');
  });
});
