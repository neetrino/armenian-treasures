import { existsSync } from 'node:fs';
import { join } from 'node:path';
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

  if (normalized.startsWith('/uploads/')) {
    const localPath = join(process.cwd(), 'public', normalized);
    if (existsSync(localPath)) {
      return { status: 'ok', resolvedUrl: resolved, reason: 'local-upload-only' };
    }

    return {
      status: 'broken',
      resolvedUrl: resolved,
      reason: 'upload-missing-from-r2-and-local',
    };
  }

  const resolvedPublicFile = join(process.cwd(), 'public', resolved.replace(/^\//, ''));
  if (existsSync(resolvedPublicFile)) {
    return { status: 'ok', resolvedUrl: resolved, reason: 'public-file' };
  }

  if (getR2ManifestUrl(resolved)) {
    return { status: 'ok', resolvedUrl: resolved, reason: 'r2-manifest' };
  }

  return {
    status: 'broken',
    resolvedUrl: resolved,
    reason: 'missing-from-public-and-manifest',
  };
}
