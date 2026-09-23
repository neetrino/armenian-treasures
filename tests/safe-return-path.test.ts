import { describe, expect, it } from 'vitest';
import { authPathWithNext, safeReturnPath } from '@/lib/auth/safe-return-path';

describe('safeReturnPath', () => {
  it('keeps an internal path with a hash', () => {
    expect(safeReturnPath('/khndzoresk#virtual-tour')).toBe('/khndzoresk#virtual-tour');
    expect(safeReturnPath('/culture/item/tatev?x=1#tour')).toBe('/culture/item/tatev?x=1#tour');
  });

  it('rejects external and auth targets', () => {
    expect(safeReturnPath('https://evil.test')).toBeNull();
    expect(safeReturnPath('//evil.test')).toBeNull();
    expect(safeReturnPath('/\\evil.test')).toBeNull();
    expect(safeReturnPath('/login')).toBeNull();
    expect(safeReturnPath('/register?next=/')).toBeNull();
    expect(safeReturnPath('/khndzoresk/../../admin')).toBeNull();
    expect(safeReturnPath('/%2F%2Fevil.test')).toBeNull();
  });

  it('builds a login link that preserves the tour', () => {
    expect(authPathWithNext('/register', '/khndzoresk#3d-aerial')).toBe(
      '/register?next=%2Fkhndzoresk%233d-aerial',
    );
    expect(authPathWithNext('/login', 'https://evil.test')).toBe('/login');
  });
});
