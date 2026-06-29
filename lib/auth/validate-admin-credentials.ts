import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { writeAdminAuditLog } from './admin-audit';
import {
  checkLoginEnvVars,
  logLoginError,
  LOGIN_LOG_PREFIX,
  type LoginDebugErrorCode,
  type LoginDebugPayload,
} from './login-debug';

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
  | {
      success: false;
      error: typeof GENERIC_ERROR;
      debug: LoginDebugPayload;
    };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function fail(
  debug: LoginDebugPayload,
): Extract<ValidateAdminCredentialsResult, { success: false }> {
  console.error(`${LOGIN_LOG_PREFIX} validation failed:`, debug.error, debug.details ?? '');
  return { success: false, error: GENERIC_ERROR, debug };
}

async function recordFailedLogin(
  adminUserId: string | null,
  email: string,
  context: ValidateAdminCredentialsContext,
): Promise<void> {
  try {
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
  } catch (error) {
    logLoginError('recordFailedLogin threw', error);
  }
}

export async function validateAdminCredentials(
  email: string,
  password: string,
  context: ValidateAdminCredentialsContext = {},
): Promise<ValidateAdminCredentialsResult> {
  const normalizedEmail = normalizeEmail(email);
  console.log(`${LOGIN_LOG_PREFIX} validateAdminCredentials started for email=${normalizedEmail}`);

  const envIssue = checkLoginEnvVars();
  if (envIssue) return fail(envIssue);

  let adminUser: Awaited<ReturnType<typeof prisma.adminUser.findUnique>>;
  try {
    console.log(`${LOGIN_LOG_PREFIX} querying database for admin user`);
    adminUser = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });
    console.log(
      `${LOGIN_LOG_PREFIX} user lookup complete: found=${Boolean(adminUser)} active=${adminUser?.isActive ?? 'n/a'}`,
    );
  } catch (error) {
    logLoginError('database user lookup threw', error);
    return fail({
      error: 'DB_CONNECTION_FAILED',
      details: error instanceof Error ? error.message : String(error),
    });
  }

  const reject = async (
    debugCode: LoginDebugErrorCode,
  ): Promise<ValidateAdminCredentialsResult> => {
    await recordFailedLogin(adminUser?.id ?? null, normalizedEmail, context);
    return fail({ error: debugCode });
  };

  if (!adminUser) {
    try {
      console.log(`${LOGIN_LOG_PREFIX} user not found, running dummy bcrypt.compare`);
      await bcrypt.compare(password, '$2a$12$invalidhashinvalidhashinvalidha');
      console.log(`${LOGIN_LOG_PREFIX} dummy bcrypt.compare completed`);
    } catch (error) {
      logLoginError('dummy bcrypt.compare threw', error);
      return fail({
        error: 'BCRYPT_COMPARE_THREW',
        details: error instanceof Error ? error.message : String(error),
      });
    }
    return reject('USER_NOT_FOUND');
  }

  if (!adminUser.isActive) {
    return reject('USER_INACTIVE');
  }

  if (adminUser.lockedUntil && adminUser.lockedUntil > new Date()) {
    console.log(`${LOGIN_LOG_PREFIX} user is locked until ${adminUser.lockedUntil.toISOString()}`);
    await recordFailedLogin(adminUser.id, normalizedEmail, context);
    return fail({ error: 'USER_LOCKED' });
  }

  let passwordMatches: boolean;
  try {
    console.log(`${LOGIN_LOG_PREFIX} running bcrypt.compare for user id=${adminUser.id}`);
    passwordMatches = await bcrypt.compare(password, adminUser.passwordHash);
    console.log(
      `${LOGIN_LOG_PREFIX} bcrypt.compare completed without throw, matches=${passwordMatches}`,
    );
  } catch (error) {
    logLoginError('bcrypt.compare threw', error);
    return fail({
      error: 'BCRYPT_COMPARE_THREW',
      details: error instanceof Error ? error.message : String(error),
    });
  }

  if (!passwordMatches) {
    return reject('PASSWORD_MISMATCH');
  }

  try {
    console.log(`${LOGIN_LOG_PREFIX} password matched, updating lastLoginAt`);
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

    console.log(`${LOGIN_LOG_PREFIX} login success for user id=${updated.id}`);
    return { success: true, adminUser: updated };
  } catch (error) {
    logLoginError('post-login database update threw', error);
    return fail({
      error: 'DB_CONNECTION_FAILED',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
