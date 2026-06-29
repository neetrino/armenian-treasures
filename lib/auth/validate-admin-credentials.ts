import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { writeAdminAuditLog } from './admin-audit';
import {
  BCRYPT_ROUNDS,
  envCredentialsMatch,
  getAdminEnvDiagnostics,
  getConfiguredAdminEnvCredentials,
  logAdminAuthDiagnostics,
} from './admin-env-credentials';

const GENERIC_ERROR = 'Invalid email or password' as const;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

const ADMIN_USER_SELECT = {
  id: true,
  email: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

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

async function completeSuccessfulLogin(
  adminUserId: string,
  email: string,
  context: ValidateAdminCredentialsContext,
): Promise<SafeAdminUser> {
  const updated = await prisma.adminUser.update({
    where: { id: adminUserId },
    data: {
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
      isActive: true,
    },
    select: ADMIN_USER_SELECT,
  });

  await writeAdminAuditLog('login_success', {
    adminUserId: updated.id,
    email: updated.email,
    ipAddress: context.ipAddress ?? null,
    userAgent: context.userAgent ?? null,
  });

  return updated;
}

async function ensureAdminUserFromEnv(
  normalizedEmail: string,
  password: string,
  context: ValidateAdminCredentialsContext,
): Promise<ValidateAdminCredentialsResult | null> {
  const configured = getConfiguredAdminEnvCredentials();
  if (!configured || !envCredentialsMatch(normalizedEmail, password)) {
    return null;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const existing = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  const adminUser = existing
    ? await prisma.adminUser.update({
        where: { id: existing.id },
        data: { passwordHash, isActive: true },
        select: ADMIN_USER_SELECT,
      })
    : await prisma.adminUser.create({
        data: { email: normalizedEmail, passwordHash },
        select: ADMIN_USER_SELECT,
      });

  logAdminAuthDiagnostics({
    authPath: 'env',
    adminUserFoundInDb: Boolean(existing),
    envEmailMatches: true,
  });

  return {
    success: true,
    adminUser: await completeSuccessfulLogin(adminUser.id, adminUser.email, context),
  };
}

export async function validateAdminCredentials(
  email: string,
  password: string,
  context: ValidateAdminCredentialsContext = {},
): Promise<ValidateAdminCredentialsResult> {
  const normalizedEmail = normalizeEmail(email);
  const envDiagnostics = getAdminEnvDiagnostics();
  const configuredEnv = getConfiguredAdminEnvCredentials();

  logAdminAuthDiagnostics({
    ...envDiagnostics,
    submittedEmailLength: email.trim().length,
    submittedPasswordLength: password.length,
    normalizedEmailMatchesEnv: configuredEnv
      ? configuredEnv.email === normalizedEmail
      : false,
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL?.trim()),
  });

  const envResult = await ensureAdminUserFromEnv(normalizedEmail, password, context);
  if (envResult) return envResult;

  const adminUser = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  logAdminAuthDiagnostics({
    authPath: 'database',
    adminUserFound: Boolean(adminUser),
    adminUserActive: adminUser?.isActive ?? false,
    adminUserLocked: Boolean(
      adminUser?.lockedUntil && adminUser.lockedUntil > new Date(),
    ),
    dbEmailLength: adminUser?.email.length ?? 0,
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
  logAdminAuthDiagnostics({
    authPath: 'database',
    passwordMatched: passwordMatches,
  });

  if (!passwordMatches) {
    return reject();
  }

  return {
    success: true,
    adminUser: await completeSuccessfulLogin(adminUser.id, adminUser.email, context),
  };
}
