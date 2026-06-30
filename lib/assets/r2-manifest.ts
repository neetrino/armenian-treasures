import manifest from '@/data/r2-public-manifest.json';

export interface R2PublicManifest {
  generatedAt: string | null;
  publicBaseUrl: string | null;
  files: Record<string, string>;
}

const typedManifest = manifest as R2PublicManifest;

export function getR2PublicManifest(): R2PublicManifest {
  return typedManifest;
}

export function getR2ManifestPublicBaseUrl(): string | null {
  const base = typedManifest.publicBaseUrl?.trim();
  return base ? base.replace(/\/$/, '') : null;
}

export function getR2ManifestUrl(publicPath: string): string | null {
  const normalized = normalizePublicPath(publicPath);
  return typedManifest.files[normalized] ?? null;
}

function normalizePublicPath(path: string): string {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}
