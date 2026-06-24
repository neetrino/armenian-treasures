import { describe, expect, it } from 'vitest';
import { isMatterportUrl } from '@/lib/matterport';

describe('isMatterportUrl', () => {
  it('returns true for Matterport show URLs', () => {
    expect(isMatterportUrl('https://my.matterport.com/show/?m=example-tatev')).toBe(true);
    expect(isMatterportUrl('https://my.matterport.com/show/?m=TEST_MODEL_ID')).toBe(true);
  });

  it('returns false for non-Matterport URLs', () => {
    expect(isMatterportUrl('https://example.com/tour')).toBe(false);
    expect(isMatterportUrl('https://my.matterport.com/models/abc')).toBe(false);
  });

  it('returns false for empty or invalid input', () => {
    expect(isMatterportUrl(null)).toBe(false);
    expect(isMatterportUrl('')).toBe(false);
    expect(isMatterportUrl('not-a-url')).toBe(false);
  });
});
