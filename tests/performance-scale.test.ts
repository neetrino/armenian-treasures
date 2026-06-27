import { describe, expect, it } from 'vitest';
import { buildAdminPageCount, parseAdminListQuery } from '@/lib/admin/list-query';
import { HOME_UPCOMING_PROJECTS_LIMIT } from '@/lib/queries/projects';

describe('parseAdminListQuery', () => {
  it('defaults to page 1 and standard page size', () => {
    const result = parseAdminListQuery({});
    expect(result.page).toBe(1);
    expect(result.skip).toBe(0);
    expect(result.pageSize).toBe(50);
  });

  it('parses page and query params', () => {
    const result = parseAdminListQuery({ page: '3', q: '  monastery ' });
    expect(result.page).toBe(3);
    expect(result.skip).toBe(100);
    expect(result.query).toBe('monastery');
  });
});

describe('buildAdminPageCount', () => {
  it('returns at least one page', () => {
    expect(buildAdminPageCount(0, 50)).toBe(1);
    expect(buildAdminPageCount(120, 50)).toBe(3);
  });
});

describe('home projects limit', () => {
  it('keeps the home section limit at three cards', () => {
    expect(HOME_UPCOMING_PROJECTS_LIMIT).toBe(3);
  });
});
