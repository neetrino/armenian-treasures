import type { CSSProperties } from 'react';
import { getCardBackgroundStyle, hasCardBackground } from '@/lib/card-background-style';

export function hasFeaturedTreasureCardBackground(
  color?: string | null,
  image?: string | null,
): boolean {
  return hasCardBackground(color, image);
}

export function getFeaturedTreasureCardStyle(
  color?: string | null,
  image?: string | null,
): CSSProperties | undefined {
  return getCardBackgroundStyle(color, image, {
    colorVarName: '--featured-card-bg-color',
    imageVarName: '--featured-card-bg-image',
    fallbackColor: 'var(--surface-panel-bg)',
  });
}
