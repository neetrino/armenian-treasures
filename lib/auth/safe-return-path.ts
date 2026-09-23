const BLOCKED_PREFIXES = ['/login', '/register'] as const;

export function firstQueryValue(value: string | string[] | undefined): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value[0] ?? null;
  return null;
}

/** Internal path only. Rejects open redirects and auth-page loops. */
export function safeReturnPath(raw: string | null | undefined): string | null {
  if (typeof raw !== 'string') return null;
  const value = raw.trim();
  if (value.length < 2 || value.length > 512) return null;
  if (!value.startsWith('/') || value.startsWith('//')) return null;
  if (/[\s\\]/.test(value)) return null;
  if (value.includes('://') || value.includes('%') || value.includes('@')) return null;

  const pathname = value.split(/[?#]/, 1)[0] ?? '';
  if (!pathname.startsWith('/') || pathname.includes('..')) return null;
  if (BLOCKED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return null;
  }
  return value;
}

export function authPathWithNext(pathname: '/login' | '/register', returnTo: string | null): string {
  const safe = safeReturnPath(returnTo);
  if (!safe) return pathname;
  return `${pathname}?next=${encodeURIComponent(safe)}`;
}

export function readFormReturnPath(formData: FormData): string | null {
  const raw = formData.get('next');
  if (typeof raw !== 'string') return null;
  return safeReturnPath(raw);
}
