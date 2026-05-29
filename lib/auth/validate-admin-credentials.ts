export interface ValidatedAdmin {
  email: string;
}

export function validateAdminCredentials(
  email: string,
  password: string,
): ValidatedAdmin | null {
  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!envEmail || !envPassword) {
    console.error(
      '[auth] Admin credentials not configured. ADMIN_EMAIL exists:',
      Boolean(envEmail),
      'ADMIN_PASSWORD exists:',
      Boolean(envPassword),
    );
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail !== envEmail.toLowerCase()) return null;
  if (password !== envPassword) return null;

  return { email: normalizedEmail };
}
