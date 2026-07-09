import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { isSvgPublicPath } from '@/lib/assets/public-asset-path';
import { getR2ManifestUrl } from '@/lib/assets/r2-manifest';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export type ImagePathAvailability = 'ok' | 'broken' | 'external' | 'empty';

export interface ImagePathAuditResult {
  status: ImagePathAvailability;
  resolvedUrl: string;
  reason?: string;
}

export function auditImagePath(path: string | null | undefined): ImagePathAuditResult {
  const trimmed = path?.trim() ?? '';
  if (!trimmed) {
    return { status: 'empty', resolvedUrl: '' };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return { status: 'external', resolvedUrl: trimmed };
  }

  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const resolved = resolvePublicAssetUrl(normalized);

  if (resolved.startsWith('http')) {
    return { status: 'ok', resolvedUrl: resolved, reason: 'resolved-to-r2' };
  }

  if (isSvgPublicPath(normalized)) {
    const localPath = join(process.cwd(), 'public', resolved.replace(/^\//, ''));
    if (existsSync(localPath)) {
      return { status: 'ok', resolvedUrl: resolved, reason: 'local-svg' };
    }
    return { status: 'broken', resolvedUrl: resolved, reason: 'missing-local-svg' };
  }

  if (getR2ManifestUrl(normalized)) {
    return { status: 'ok', resolvedUrl: resolved, reason: 'r2-manifest' };
  }

  return {
    status: 'broken',
    resolvedUrl: resolved,
    reason: 'missing-from-r2-manifest',
  };
}
