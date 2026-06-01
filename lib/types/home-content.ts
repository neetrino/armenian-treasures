export interface HomeStat {
  value: string;
  label: string;
}

export interface HomeTechCard {
  title: string;
  description: string;
  icon: string;
}

export const HOME_STATS_MAX = 8;
export const HOME_TECH_CARDS_MAX = 6;

export const DEFAULT_HOME_STAT: HomeStat = { value: '', label: '' };

export const DEFAULT_HOME_TECH_CARD: HomeTechCard = {
  title: '',
  description: '',
  icon: 'Sparkles',
};

export const SUGGESTED_TECH_ICONS = [
  'Building2',
  'Camera',
  'Sparkles',
  'Globe',
  'Map',
  'BookOpen',
] as const;

export type HomeStatUiItem = HomeStat & { uiId: string };
export type HomeTechCardUiItem = HomeTechCard & { uiId: string };

export function createUiId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `ui-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function withStatUiIds(items: HomeStat[]): HomeStatUiItem[] {
  return items.map((item) => ({ ...item, uiId: createUiId() }));
}

export function stripStatUiIds(items: HomeStatUiItem[]): HomeStat[] {
  return items.map(({ uiId: _uiId, ...stat }) => stat);
}

export function withTechCardUiIds(items: HomeTechCard[]): HomeTechCardUiItem[] {
  return items.map((item) => ({ ...item, uiId: createUiId() }));
}

export function stripTechCardUiIds(items: HomeTechCardUiItem[]): HomeTechCard[] {
  return items.map(({ uiId: _uiId, ...card }) => card);
}

export function normalizeHomeStats(value: unknown): HomeStat[] {
  if (!Array.isArray(value)) {
    return [{ ...DEFAULT_HOME_STAT }];
  }
  const items = value.slice(0, HOME_STATS_MAX).map((item): HomeStat | null => {
    if (typeof item !== 'object' || item === null) return null;
    const record = item as Record<string, unknown>;
    return {
      value: typeof record.value === 'string' ? record.value : '',
      label: typeof record.label === 'string' ? record.label : '',
    };
  });
  const valid = items.filter((item): item is HomeStat => item !== null);
  return valid.length > 0 ? valid : [{ ...DEFAULT_HOME_STAT }];
}

export function normalizeHomeTechCards(value: unknown): HomeTechCard[] {
  if (!Array.isArray(value)) {
    return [{ ...DEFAULT_HOME_TECH_CARD }];
  }
  const items = value.slice(0, HOME_TECH_CARDS_MAX).map((item): HomeTechCard | null => {
    if (typeof item !== 'object' || item === null) return null;
    const record = item as Record<string, unknown>;
    return {
      title: typeof record.title === 'string' ? record.title : '',
      description: typeof record.description === 'string' ? record.description : '',
      icon: typeof record.icon === 'string' && record.icon.trim().length > 0 ? record.icon : 'Sparkles',
    };
  });
  const valid = items.filter((item): item is HomeTechCard => item !== null);
  return valid.length > 0 ? valid : [{ ...DEFAULT_HOME_TECH_CARD }];
}

export function getNestedFieldError(
  fieldErrors: Record<string, string> | undefined,
  prefix: string,
  index: number,
  field: string,
): string | undefined {
  return fieldErrors?.[`${prefix}.${index}.${field}`];
}

export function getSectionFieldError(
  fieldErrors: Record<string, string> | undefined,
  prefix: string,
): string | undefined {
  if (!fieldErrors) return undefined;
  if (fieldErrors[prefix]) return fieldErrors[prefix];
  const nested = Object.entries(fieldErrors).find(([key]) => key.startsWith(`${prefix}.`));
  return nested?.[1];
}

export function validateHomeStatsClient(stats: HomeStat[]): string | undefined {
  if (stats.length < 1) return 'At least one stat is required.';
  if (stats.length > HOME_STATS_MAX) return `Maximum ${HOME_STATS_MAX} stats allowed.`;
  for (let i = 0; i < stats.length; i += 1) {
    const stat = stats[i];
    if (!stat) continue;
    if (!stat.value.trim()) return `Stat ${i + 1}: value is required.`;
    if (!stat.label.trim()) return `Stat ${i + 1}: label is required.`;
    if (stat.value.length > 20) return `Stat ${i + 1}: value must be at most 20 characters.`;
    if (stat.label.length > 60) return `Stat ${i + 1}: label must be at most 60 characters.`;
  }
  return undefined;
}

export function validateHomeTechCardsClient(cards: HomeTechCard[]): string | undefined {
  if (cards.length < 1) return 'At least one technology card is required.';
  if (cards.length > HOME_TECH_CARDS_MAX) {
    return `Maximum ${HOME_TECH_CARDS_MAX} technology cards allowed.`;
  }
  for (let i = 0; i < cards.length; i += 1) {
    const card = cards[i];
    if (!card) continue;
    if (!card.title.trim()) return `Card ${i + 1}: title is required.`;
    if (card.title.trim().length < 2) return `Card ${i + 1}: title must be at least 2 characters.`;
    if (!card.description.trim()) return `Card ${i + 1}: description is required.`;
    if (card.description.trim().length < 2) {
      return `Card ${i + 1}: description must be at least 2 characters.`;
    }
    if (!card.icon.trim()) return `Card ${i + 1}: icon is required.`;
    if (card.title.length > 120) return `Card ${i + 1}: title must be at most 120 characters.`;
    if (card.description.length > 400) {
      return `Card ${i + 1}: description must be at most 400 characters.`;
    }
    if (card.icon.length > 40) return `Card ${i + 1}: icon must be at most 40 characters.`;
  }
  return undefined;
}
