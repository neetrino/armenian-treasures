import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { writeAdminAuditLog } from './admin-audit';

const GENERIC_ERROR = 'Invalid email or password' as const;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export interface ValidateAdminCredentialsContext {
  ipAddress?: string;
  userAgent?: string;
}

export type SafeAdminUser = {
  id: string;
  email: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ValidateAdminCredentialsResult =
  | { success: true; adminUser: SafeAdminUser }
  | { success: false; error: typeof GENERIC_ERROR };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function recordFailedLogin(
  adminUserId: string | null,
  email: string,
  context: ValidateAdminCredentialsContext,
): Promise<void> {
  await writeAdminAuditLog('login_failed', {
    adminUserId,
    email,
    ipAddress: context.ipAddress ?? null,
    userAgent: context.userAgent ?? null,
  });

  if (!adminUserId) return;

  const user = await prisma.adminUser.findUnique({ where: { id: adminUserId } });
  if (!user) return;

  const failedLoginCount = user.failedLoginCount + 1;
  const shouldLock = failedLoginCount >= MAX_FAILED_ATTEMPTS;
  const lockedUntil = shouldLock
    ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
    : user.lockedUntil;

  await prisma.adminUser.update({
    where: { id: adminUserId },
    data: {
      failedLoginCount,
      lockedUntil: shouldLock ? lockedUntil : user.lockedUntil,
    },
  });

  if (shouldLock) {
    await writeAdminAuditLog('lockout', {
      adminUserId,
      email,
      ipAddress: context.ipAddress ?? null,
      userAgent: context.userAgent ?? null,
      metadata: { failedLoginCount },
    });
  }
}

export async function validateAdminCredentials(
  email: string,
  password: string,
  context: ValidateAdminCredentialsContext = {},
): Promise<ValidateAdminCredentialsResult> {
  const normalizedEmail = normalizeEmail(email);
  const adminUser = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  const reject = async (): Promise<ValidateAdminCredentialsResult> => {
    await recordFailedLogin(adminUser?.id ?? null, normalizedEmail, context);
    return { success: false, error: GENERIC_ERROR };
  };

  if (!adminUser || !adminUser.isActive) {
    if (!adminUser) {
      await bcrypt.compare(password, '$2a$12$invalidhashinvalidhashinvalidha');
    }
    return reject();
  }

  if (adminUser.lockedUntil && adminUser.lockedUntil > new Date()) {
    await recordFailedLogin(adminUser.id, normalizedEmail, context);
    return { success: false, error: GENERIC_ERROR };
  }

  const passwordMatches = await bcrypt.compare(password, adminUser.passwordHash);
  if (!passwordMatches) {
    return reject();
  }

  const updated = await prisma.adminUser.update({
    where: { id: adminUser.id },
    data: {
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    },
    select: {
      id: true,
      email: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  await writeAdminAuditLog('login_success', {
    adminUserId: updated.id,
    email: updated.email,
    ipAddress: context.ipAddress ?? null,
    userAgent: context.userAgent ?? null,
  });

  return { success: true, adminUser: updated };
}
