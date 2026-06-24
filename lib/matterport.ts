export function isMatterportUrl(url?: string | null): boolean {
  if (!url || url.trim().length === 0) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.hostname.includes('my.matterport.com') && parsed.pathname.includes('/show');
  } catch {
    return false;
  }
}
