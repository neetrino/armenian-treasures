const BCRYPT_ROUNDS = 12;

export interface AdminEnvDiagnostics {
  hasAdminEmail: boolean;
  hasAdminPassword: boolean;
  adminEmailLength: number;
  adminPasswordLength: number;
}

export function getAdminEnvDiagnostics(): AdminEnvDiagnostics {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  return {
    hasAdminEmail: Boolean(email),
    hasAdminPassword: Boolean(password),
    adminEmailLength: email?.length ?? 0,
    adminPasswordLength: password?.length ?? 0,
  };
}

export function getConfiguredAdminEnvCredentials(): { email: string; password: string } | null {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!email || !password) return null;
  return { email, password };
}

export function envCredentialsMatch(
  normalizedSubmittedEmail: string,
  submittedPassword: string,
): boolean {
  const configured = getConfiguredAdminEnvCredentials();
  if (!configured) return false;
  return (
    configured.email === normalizedSubmittedEmail &&
    submittedPassword === configured.password
  );
}

export function logAdminAuthDiagnostics(details: Record<string, unknown>): void {
  console.log('[admin-auth]', details);
}

export { BCRYPT_ROUNDS };
