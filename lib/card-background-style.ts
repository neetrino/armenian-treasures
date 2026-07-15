import type { CSSProperties } from 'react';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

interface CardBackgroundStyleOptions {
  colorVarName: `--${string}`;
  imageVarName: `--${string}`;
  fallbackColor: string;
}

export function hasCardBackground(color?: string | null, image?: string | null): boolean {
  return Boolean(color?.trim() || image?.trim());
}

export function getCardBackgroundStyle(
  color: string | null | undefined,
  image: string | null | undefined,
  options: CardBackgroundStyleOptions,
): CSSProperties | undefined {
  const normalizedColor = color?.trim() || null;
  const normalizedImage = image?.trim() || null;
  if (!normalizedColor && !normalizedImage) return undefined;

  return {
    [options.colorVarName]: normalizedColor ?? options.fallbackColor,
    [options.imageVarName]: normalizedImage ? `url(${resolvePublicAssetUrl(normalizedImage)})` : 'none',
  } as CSSProperties;
}
