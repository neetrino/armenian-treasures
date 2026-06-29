export const LOGIN_LOG_PREFIX = '[admin-login]' as const;

export type LoginDebugErrorCode =
  | 'DB_CONNECTION_FAILED'
  | 'USER_NOT_FOUND'
  | 'USER_INACTIVE'
  | 'USER_LOCKED'
  | 'PASSWORD_MISMATCH'
  | 'BCRYPT_COMPARE_THREW'
  | 'ENV_VAR_MISSING'
  | 'VALIDATION_FAILED'
  | 'UNKNOWN_ERROR';

export type LoginDebugPayload = {
  error: LoginDebugErrorCode;
  details?: string;
};

export function logLoginError(step: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${LOGIN_LOG_PREFIX} ${step}:`, error.message);
    if (error.stack) console.error(error.stack);
    return;
  }
  console.error(`${LOGIN_LOG_PREFIX} ${step}:`, error);
}

export function checkLoginEnvVars(): LoginDebugPayload | null {
  const missing: string[] = [];

  if (!process.env.DATABASE_URL?.trim()) missing.push('DATABASE_URL');
  if (!process.env.AUTH_SECRET?.trim() && !process.env.NEXTAUTH_SECRET?.trim()) {
    missing.push('AUTH_SECRET or NEXTAUTH_SECRET');
  }

  if (missing.length === 0) {
    console.log(`${LOGIN_LOG_PREFIX} env check passed`);
    return null;
  }

  const details = `${missing.join(', ')} is undefined or empty`;
  console.error(`${LOGIN_LOG_PREFIX} ENV_VAR_MISSING:`, details);
  return { error: 'ENV_VAR_MISSING', details };
}

function unwrapAuthCause(cause: unknown): unknown {
  if (cause && typeof cause === 'object' && 'err' in cause) {
    return (cause as { err: unknown }).err;
  }
  return cause;
}

function isLoginDebugErrorCode(value: string): value is LoginDebugErrorCode {
  return (
    value === 'DB_CONNECTION_FAILED' ||
    value === 'USER_NOT_FOUND' ||
    value === 'USER_INACTIVE' ||
    value === 'USER_LOCKED' ||
    value === 'PASSWORD_MISMATCH' ||
    value === 'BCRYPT_COMPARE_THREW' ||
    value === 'ENV_VAR_MISSING' ||
    value === 'VALIDATION_FAILED' ||
    value === 'UNKNOWN_ERROR'
  );
}

export function extractLoginDebugPayload(
  error: unknown,
  LoginCredentialsSigninClass?: typeof import('./login-credentials-signin').LoginCredentialsSignin,
): LoginDebugPayload | null {
  let current: unknown = error;

  while (current) {
    if (LoginCredentialsSigninClass && current instanceof LoginCredentialsSigninClass) {
      return current.debug;
    }

    if (current instanceof Error) {
      const next = unwrapAuthCause(current.cause);
      if (next && next !== current.cause) {
        const nested = extractLoginDebugPayload(next, LoginCredentialsSigninClass);
        if (nested) return nested;
      }
      current = current.cause;
      continue;
    }

    break;
  }

  if (error instanceof Error && 'code' in error) {
    const code = String((error as { code: string }).code);
    if (isLoginDebugErrorCode(code)) {
      return { error: code, details: error.message || undefined };
    }
  }

  return null;
}
