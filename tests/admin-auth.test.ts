import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    adminUser: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    adminAuditLog: {
      create: vi.fn(),
    },
  },
}));

vi.mock('@/lib/db', () => ({
  prisma: prismaMock,
}));

import { validateAdminCredentials } from '@/lib/auth/validate-admin-credentials';

describe('validateAdminCredentials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prismaMock.adminAuditLog.create.mockResolvedValue({});
  });

  it('verifies correct password against bcrypt hash', async () => {
    const passwordHash = await bcrypt.hash('correct-password-12', 12);
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      passwordHash,
      isActive: true,
      failedLoginCount: 0,
      lockedUntil: null,
    });
    prismaMock.adminUser.update.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await validateAdminCredentials('admin@example.com', 'correct-password-12');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.adminUser.email).toBe('admin@example.com');
      expect('passwordHash' in result.adminUser).toBe(false);
    }
  });

  it('returns generic error for wrong password', async () => {
    const passwordHash = await bcrypt.hash('correct-password-12', 12);
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      passwordHash,
      isActive: true,
      failedLoginCount: 0,
      lockedUntil: null,
    });
    prismaMock.adminUser.update.mockResolvedValue({
      failedLoginCount: 1,
      lockedUntil: null,
    });

    const result = await validateAdminCredentials('admin@example.com', 'wrong-password-12');
    expect(result).toEqual({ success: false, error: 'Invalid email or password' });
  });

  it('increments failedLoginCount and locks after 5 failures', async () => {
    const passwordHash = await bcrypt.hash('correct-password-12', 12);
    prismaMock.adminUser.findUnique
      .mockResolvedValueOnce({
        id: 'admin-1',
        email: 'admin@example.com',
        passwordHash,
        isActive: true,
        failedLoginCount: 4,
        lockedUntil: null,
      })
      .mockResolvedValueOnce({
        id: 'admin-1',
        failedLoginCount: 4,
        lockedUntil: null,
      });

    prismaMock.adminUser.update.mockResolvedValue({
      failedLoginCount: 5,
      lockedUntil: new Date(Date.now() + 15 * 60 * 1000),
    });

    await validateAdminCredentials('admin@example.com', 'wrong-password-12');

    expect(prismaMock.adminAuditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ event: 'login_failed' }) }),
    );
    expect(prismaMock.adminAuditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ event: 'lockout' }) }),
    );
  });

  it('writes login_success audit log on success', async () => {
    const passwordHash = await bcrypt.hash('correct-password-12', 12);
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      passwordHash,
      isActive: true,
      failedLoginCount: 0,
      lockedUntil: null,
    });
    prismaMock.adminUser.update.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await validateAdminCredentials('admin@example.com', 'correct-password-12');

    expect(prismaMock.adminAuditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ event: 'login_success' }) }),
    );
  });

  it('accepts env admin credentials when no database user exists', async () => {
    process.env.ADMIN_EMAIL = 'env@example.com';
    process.env.ADMIN_PASSWORD = 'env-password-12345';
    prismaMock.adminUser.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);
    prismaMock.adminUser.create.mockResolvedValue({
      id: 'admin-env-1',
      email: 'env@example.com',
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    prismaMock.adminUser.update.mockResolvedValue({
      id: 'admin-env-1',
      email: 'env@example.com',
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await validateAdminCredentials('env@example.com', 'env-password-12345');
    expect(result.success).toBe(true);
    delete process.env.ADMIN_EMAIL;
    delete process.env.ADMIN_PASSWORD;
  });

  it('rejects when env credentials do not match submitted values', async () => {
    process.env.ADMIN_EMAIL = 'env@example.com';
    process.env.ADMIN_PASSWORD = 'env-password-12345';
    prismaMock.adminUser.findUnique.mockResolvedValue(null);

    const result = await validateAdminCredentials('env@example.com', 'wrong-password-12');
    expect(result.success).toBe(false);
    delete process.env.ADMIN_EMAIL;
    delete process.env.ADMIN_PASSWORD;
  });
});
