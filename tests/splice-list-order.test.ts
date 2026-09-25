import { describe, expect, it } from 'vitest';
import { spliceListOrder } from '@/lib/admin/splice-list-order';

describe('spliceListOrder', () => {
  it('reorders a full list', () => {
    expect(spliceListOrder(['a', 'b', 'c'], ['c', 'a', 'b'])).toEqual(['c', 'a', 'b']);
  });

  it('keeps items that were not in the dragged subset', () => {
    expect(spliceListOrder(['a', 'b', 'c', 'd'], ['c', 'a'])).toEqual(['c', 'b', 'a', 'd']);
  });

  it('rejects ids that are not in the current list', () => {
    expect(spliceListOrder(['a', 'b'], ['a', 'z'])).toBeNull();
  });
});
