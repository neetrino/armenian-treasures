export const TECHNOLOGY_SECTION = {
  eyebrow: 'Technology',
  titleLine1: 'Heritage preserved with',
  titleLine2: 'modern instruments',
  description:
    'Three production-grade pipelines power every monument we add to the archive.',
} as const;

export type TechAccent = 'copper' | 'emerald' | 'gold';

export interface TechVisualPreset {
  imageSrc: string;
  imageAlt: string;
  accent: TechAccent;
}

export const TECH_VISUAL_PRESETS: readonly TechVisualPreset[] = [
  {
    imageSrc: '/images/technology/card-matterport.jpg',
    imageAlt: 'Stone monastery interior with arched hall and warm light',
    accent: 'copper',
  },
  {
    imageSrc: '/images/technology/card-drone.jpg',
    imageAlt: 'Aerial view of a mountain fortress and monastery landscape',
    accent: 'emerald',
  },
  {
    imageSrc: '/images/technology/card-ai-storytelling.jpg',
    imageAlt: 'Ancient manuscript with digital waveform overlay',
    accent: 'gold',
  },
] as const;

export interface TechItemInput {
  title: string;
  description: string;
  icon: string;
}

export interface EnrichedTechCard extends TechItemInput, TechVisualPreset {}

export function enrichTechCards(items: TechItemInput[]): EnrichedTechCard[] {
  return items.map((item, index) => {
    const preset = TECH_VISUAL_PRESETS[index % TECH_VISUAL_PRESETS.length]!;
    return { ...preset, ...item };
  });
}

export const ACCENT_THEME: Record<
  TechAccent,
  {
    cardBorder: string;
    cardBorderHover: string;
    badge: string;
    badgeRing: string;
    badgeGlow: string;
    divider: string;
    footerTint: string;
    imageFade: string;
  }
> = {
  copper: {
    cardBorder: 'border-bronze-500/25',
    cardBorderHover: 'group-hover:border-bronze-500/50',
    badge: 'bg-bronze-600',
    badgeRing: 'ring-bronze-400/35',
    badgeGlow: 'group-hover:shadow-[0_10px_32px_-8px_rgba(200,132,61,0.55)]',
    divider: 'via-bronze-500/70',
    footerTint: 'from-bronze-500/[0.07]',
    imageFade: 'to-parchment-50',
  },
  emerald: {
    cardBorder: 'border-emerald-800/20',
    cardBorderHover: 'group-hover:border-emerald-700/45',
    badge: 'bg-emerald-800',
    badgeRing: 'ring-emerald-600/30',
    badgeGlow: 'group-hover:shadow-[0_10px_32px_-8px_rgba(6,78,59,0.45)]',
    divider: 'via-emerald-700/60',
    footerTint: 'from-emerald-900/[0.06]',
    imageFade: 'to-parchment-50',
  },
  gold: {
    cardBorder: 'border-amber-600/25',
    cardBorderHover: 'group-hover:border-amber-500/50',
    badge: 'bg-amber-700',
    badgeRing: 'ring-amber-500/35',
    badgeGlow: 'group-hover:shadow-[0_10px_32px_-8px_rgba(180,120,30,0.5)]',
    divider: 'via-amber-600/65',
    footerTint: 'from-amber-600/[0.08]',
    imageFade: 'to-parchment-50',
  },
};
