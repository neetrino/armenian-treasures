export const PRIVATE_STORAGE_PREFIXES = ['quarantine/'] as const;

const ADMIN_MANAGED_UPLOAD_KEY =
  /^images\/(hero|culture)\/(hero|culture)-[a-f0-9]{12}(-desktop|-mobile)?\.(jpe?g|png|webp)$/i;

export function normalizeStorageKey(key: string): string {
  return key.replace(/\\/g, '/').replace(/^\/+/, '');
}

export function isPrivateStorageKey(key: string): boolean {
  const normalized = normalizeStorageKey(key);
  return PRIVATE_STORAGE_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function isAdminManagedUploadKey(key: string): boolean {
  return ADMIN_MANAGED_UPLOAD_KEY.test(normalizeStorageKey(key));
}

export function resolveAdminManagedStorageKey(urlOrPath: string | null | undefined): string | null {
  if (!urlOrPath?.trim()) return null;
  const value = urlOrPath.trim();

  if (/^https?:\/\//i.test(value)) {
    const bases = [
      process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, ''),
      process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim().replace(/\/$/, ''),
    ].filter(Boolean) as string[];

    for (const base of bases) {
      if (value.startsWith(`${base}/`)) {
        const key = value.slice(base.length + 1);
        return isAdminManagedUploadKey(key) ? normalizeStorageKey(key) : null;
      }
    }
    return null;
  }

  if (value.startsWith('/uploads/')) {
    const key = value.slice('/uploads/'.length);
    return isAdminManagedUploadKey(key) ? normalizeStorageKey(key) : null;
  }

  const uploadsMarker = '/uploads/';
  const uploadsIdx = value.indexOf(uploadsMarker);
  if (uploadsIdx >= 0) {
    const key = value.slice(uploadsIdx + uploadsMarker.length);
    return isAdminManagedUploadKey(key) ? normalizeStorageKey(key) : null;
  }

  const normalized = normalizeStorageKey(value.startsWith('/') ? value.slice(1) : value);
  return isAdminManagedUploadKey(normalized) ? normalized : null;
}
