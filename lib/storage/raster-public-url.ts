import { getR2ManifestPublicBaseUrl } from '@/lib/assets/r2-manifest';
import { normalizeStorageKey } from '@/lib/storage/key-policies';

export function getRasterPublicBaseUrl(): string | null {
  const fromEnv =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() || process.env.R2_PUBLIC_URL?.trim() || null;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  return getR2ManifestPublicBaseUrl();
}

export function getStorageKeyPublicUrl(key: string): string {
  const base = getRasterPublicBaseUrl();
  if (!base) {
    throw new Error(
      'R2 public URL is not configured. Set R2_PUBLIC_URL or NEXT_PUBLIC_R2_PUBLIC_URL.',
    );
  }
  return `${base}/${normalizeStorageKey(key)}`;
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET &&
      process.env.R2_PUBLIC_URL,
  );
}
