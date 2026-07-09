import type { CSSProperties } from 'react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export function hasFeaturedTreasureCardBackground(
  color?: string | null,
  image?: string | null,
): boolean {
  return Boolean(color?.trim() || image?.trim());
}

export function getFeaturedTreasureCardStyle(
  color?: string | null,
  image?: string | null,
): CSSProperties | undefined {
  const normalizedColor = color?.trim() || null;
  const normalizedImage = image?.trim() || null;
  if (!normalizedColor && !normalizedImage) return undefined;

  return {
    '--featured-card-bg-color': normalizedColor ?? 'var(--surface-panel-bg)',
    '--featured-card-bg-image': normalizedImage
      ? `url(${resolvePublicAssetUrl(normalizedImage)})`
      : 'none',
  } as CSSProperties;
}
