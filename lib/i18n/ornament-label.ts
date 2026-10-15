import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cultureMenuLabel } from '@/lib/i18n/messages/menu';

const STALE_ORNAMENT_LABELS = new Set(['artnament', 'ornaments', 'ormaments', 'նախշազարդ']);
const LOOKALIKE_O = /[ՕօОо]/g;

function foldOrnamentLabel(value: string): string {
  return value.replace(LOOKALIKE_O, 'o').trim().toLowerCase();
}

export function ornamentMenuTitle(locale: SiteLocaleCode, slug: string, stored: string): string | null {
  if (slug.slice(slug.lastIndexOf('/') + 1) !== 'ornaments') return null;
  const catalog = cultureMenuLabel(locale, 'ornaments');
  const folded = foldOrnamentLabel(stored);
  if (!catalog || (folded && !STALE_ORNAMENT_LABELS.has(folded))) return null;
  return catalog;
}
