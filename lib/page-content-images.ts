import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export function resolveLandingImg(base: string, filename: string): string {
  const normalizedBase = base.trim().replace(/\/$/, '');
  const normalizedFilename = filename.trim().replace(/^\/+/, '');
  return resolvePublicAssetUrl(`${normalizedBase}/${normalizedFilename}`);
}
