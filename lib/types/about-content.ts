export interface AboutPillar {
  title: string;
  description: string;
  iconName: string;
}

export const ABOUT_PILLARS_MIN = 1;
export const ABOUT_PILLARS_MAX = 8;

export const DEFAULT_ABOUT_PILLAR: AboutPillar = {
  title: '',
  description: '',
  iconName: 'ShieldCheck',
};

export const SUGGESTED_PILLAR_ICONS = ['ShieldCheck', 'BookOpen', 'Globe2', 'Building2', 'Camera'] as const;

export type AboutPillarUiItem = AboutPillar & { uiId: string };

export function createUiId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `ui-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function withPillarUiIds(items: AboutPillar[]): AboutPillarUiItem[] {
  return items.map((item, index) => ({ ...item, uiId: `pillar-${index}` }));
}

export function stripPillarUiIds(items: AboutPillarUiItem[]): AboutPillar[] {
  return items.map(({ uiId: _uiId, ...pillar }) => pillar);
}

export function normalizeAboutPillars(value: unknown): AboutPillar[] {
  if (!Array.isArray(value)) {
    return [{ ...DEFAULT_ABOUT_PILLAR }];
  }
  const items = value.slice(0, ABOUT_PILLARS_MAX).map((item): AboutPillar | null => {
    if (typeof item !== 'object' || item === null) return null;
    const record = item as Record<string, unknown>;
    const iconRaw =
      typeof record.iconName === 'string'
        ? record.iconName
        : typeof record.icon === 'string'
          ? record.icon
          : '';
    return {
      title: typeof record.title === 'string' ? record.title : '',
      description: typeof record.description === 'string' ? record.description : '',
      iconName: iconRaw.trim().length > 0 ? iconRaw : 'ShieldCheck',
    };
  });
  const valid = items.filter((item): item is AboutPillar => item !== null);
  return valid.length > 0 ? valid : [{ ...DEFAULT_ABOUT_PILLAR }];
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

export function validateAboutPillarsClient(pillars: AboutPillar[]): string | undefined {
  if (pillars.length < ABOUT_PILLARS_MIN) return 'At least one pillar is required.';
  if (pillars.length > ABOUT_PILLARS_MAX) return `Maximum ${ABOUT_PILLARS_MAX} pillars allowed.`;
  for (let i = 0; i < pillars.length; i += 1) {
    const pillar = pillars[i];
    if (!pillar) continue;
    if (!pillar.title.trim()) return `Pillar ${i + 1}: title is required.`;
    if (pillar.title.trim().length < 2) return `Pillar ${i + 1}: title must be at least 2 characters.`;
    if (!pillar.description.trim()) return `Pillar ${i + 1}: description is required.`;
    if (pillar.description.trim().length < 2) {
      return `Pillar ${i + 1}: description must be at least 2 characters.`;
    }
    if (!pillar.iconName.trim()) return `Pillar ${i + 1}: icon name is required.`;
    if (pillar.title.length > 120) return `Pillar ${i + 1}: title must be at most 120 characters.`;
    if (pillar.description.length > 400) {
      return `Pillar ${i + 1}: description must be at most 400 characters.`;
    }
    if (pillar.iconName.length > 40) return `Pillar ${i + 1}: icon name must be at most 40 characters.`;
  }
  return undefined;
}
