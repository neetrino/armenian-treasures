import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UnauthorizedError } from '@/lib/auth/require-admin';

const { authMock, prismaMock } = vi.hoisted(() => ({
  authMock: vi.fn(),
  prismaMock: {
    adminUser: {
      findFirst: vi.fn(),
    },
  },
}));

vi.mock('@/lib/auth/index', () => ({
  auth: authMock,
}));

vi.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

import { requireAdmin } from '@/lib/auth/require-admin';

describe('requireAdmin server-side guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('blocks when session is missing', async () => {
    authMock.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('blocks when admin user is inactive or missing in DB', async () => {
    authMock.mockResolvedValue({
      user: { id: 'admin-1', email: 'admin@example.com', name: 'Admin', role: 'ADMIN' },
    });
    prismaMock.adminUser.findFirst.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('returns active admin without passwordHash', async () => {
    authMock.mockResolvedValue({
      user: { id: 'admin-1', email: 'admin@example.com', name: 'Admin', role: 'ADMIN' },
    });
    prismaMock.adminUser.findFirst.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
    });

    const admin = await requireAdmin();
    expect(admin.id).toBe('admin-1');
    expect(admin.email).toBe('admin@example.com');
    expect('passwordHash' in admin).toBe(false);
  });
});

describe('middleware bypass regression (server-side enforcement)', () => {
  it('requireAdmin remains the enforcement layer independent of middleware', async () => {
    authMock.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
