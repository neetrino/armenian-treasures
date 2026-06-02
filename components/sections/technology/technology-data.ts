export const TECHNOLOGY_SECTION = {
  eyebrow: 'Technology',
  titleLine1: 'Heritage preserved with',
  titleLine2: 'modern instruments',
  descriptionLine1:
    'Three production-grade pipelines power every monument we add to the archive—',
  descriptionLine2:
    'blending tradition with precision technology to educate, inspire, and endure.',
} as const;

export type TechAccent = 'copper' | 'emerald' | 'gold';

export interface TechVisualPreset {
  imageSrc: string;
  imageAlt: string;
  accent: TechAccent;
  icon: string;
  tags: readonly string[];
}

export const TECH_VISUAL_PRESETS: readonly TechVisualPreset[] = [
  {
    imageSrc: '/images/technology/card-matterport.jpg',
    imageAlt: 'Stone monastery interior with arched hall and warm light',
    accent: 'copper',
    icon: 'Glasses',
    tags: ['IMMERSIVE', 'ACCURATE', 'ACCESSIBLE'],
  },
  {
    imageSrc: '/images/technology/card-drone.jpg',
    imageAlt: 'Aerial view of a mountain fortress and monastery landscape',
    accent: 'emerald',
    icon: 'Drone',
    tags: ['PRECISE', 'SCALABLE', 'CONSISTENT'],
  },
  {
    imageSrc: '/images/technology/card-ai-storytelling.jpg',
    imageAlt: 'Ancient manuscript with digital waveform overlay',
    accent: 'gold',
    icon: 'AudioLines',
    tags: ['NARRATIVE', 'MULTILINGUAL', 'ENGAGING'],
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
    return { ...item, ...preset };
  });
}

export const ACCENT_THEME: Record<
  TechAccent,
  {
    cardBorder: string;
    cardBorderHover: string;
    cardShadow: string;
    cardHoverShadow: string;
    badge: string;
    badgeRing: string;
    badgeGlow: string;
    ornament: string;
    dividerLine: string;
    dividerDot: string;
    imageWarmth: string;
    imageAccentWash: string;
    imageFade: string;
    tagPill: string;
    tagText: string;
    tagMark: string;
  }
> = {
  copper: {
    cardBorder: 'border-bronze-500/18',
    cardBorderHover: 'group-hover:border-bronze-500/42',
    cardShadow: 'shadow-[0_4px_24px_-8px_rgba(26,23,20,0.1),0_2px_8px_-2px_rgba(126,77,18,0.08)]',
    cardHoverShadow:
      'group-hover:shadow-[0_24px_52px_-18px_rgba(26,23,20,0.2),0_14px_36px_-12px_rgba(200,132,61,0.22)]',
    badge: 'bg-[radial-gradient(circle_at_32%_28%,#E8A85C_0%,#C8843D_42%,#A86A28_100%)]',
    badgeRing: 'ring-[2.5px] ring-white/95',
    badgeGlow: 'group-hover:shadow-[0_14px_34px_-4px_rgba(200,132,61,0.58)]',
    ornament: 'opacity-55',
    dividerLine: 'via-bronze-500/38',
    dividerDot: 'bg-bronze-500/65',
    imageWarmth: 'from-[#3d2a18]/20 via-[#3d2a18]/4 to-transparent',
    imageAccentWash: 'from-bronze-700/8 via-bronze-500/2',
    imageFade: 'from-parchment-50 from-35% via-parchment-50/88 to-transparent',
    tagPill: 'bg-[#FAF6EE]/95 border-bronze-500/28',
    tagText: 'text-bronze-700',
    tagMark: 'text-bronze-600',
  },
  emerald: {
    cardBorder: 'border-emerald-800/16',
    cardBorderHover: 'group-hover:border-emerald-800/38',
    cardShadow: 'shadow-[0_4px_24px_-8px_rgba(26,23,20,0.1),0_2px_8px_-2px_rgba(6,78,59,0.07)]',
    cardHoverShadow:
      'group-hover:shadow-[0_24px_52px_-18px_rgba(26,23,20,0.2),0_14px_36px_-12px_rgba(6,78,59,0.2)]',
    badge: 'bg-[radial-gradient(circle_at_32%_28%,#3d8f6a_0%,#047857_48%,#064e3b_100%)]',
    badgeRing: 'ring-[2.5px] ring-white/95',
    badgeGlow: 'group-hover:shadow-[0_14px_34px_-4px_rgba(6,78,59,0.5)]',
    ornament: 'opacity-50',
    dividerLine: 'via-emerald-800/34',
    dividerDot: 'bg-emerald-800/60',
    imageWarmth: 'from-[#1a2e24]/18 via-[#1a2e24]/3 to-transparent',
    imageAccentWash: 'from-emerald-900/8 via-emerald-800/2',
    imageFade: 'from-parchment-50 from-35% via-parchment-50/88 to-transparent',
    tagPill: 'bg-[#FAF6EE]/95 border-emerald-800/24',
    tagText: 'text-emerald-900',
    tagMark: 'text-emerald-800',
  },
  gold: {
    cardBorder: 'border-amber-600/18',
    cardBorderHover: 'group-hover:border-amber-600/40',
    cardShadow: 'shadow-[0_4px_24px_-8px_rgba(26,23,20,0.1),0_2px_8px_-2px_rgba(160,100,20,0.07)]',
    cardHoverShadow:
      'group-hover:shadow-[0_24px_52px_-18px_rgba(26,23,20,0.2),0_14px_36px_-12px_rgba(180,120,30,0.22)]',
    badge: 'bg-[radial-gradient(circle_at_32%_28%,#E8B45A_0%,#D89A55_42%,#A86A28_100%)]',
    badgeRing: 'ring-[2.5px] ring-white/95',
    badgeGlow: 'group-hover:shadow-[0_14px_34px_-4px_rgba(180,120,30,0.52)]',
    ornament: 'opacity-52',
    dividerLine: 'via-amber-600/36',
    dividerDot: 'bg-amber-700/60',
    imageWarmth: 'from-[#3d3018]/16 via-[#3d3018]/3 to-transparent',
    imageAccentWash: 'from-amber-800/8 via-amber-600/2',
    imageFade: 'from-parchment-50 from-35% via-parchment-50/88 to-transparent',
    tagPill: 'bg-[#FAF6EE]/95 border-amber-600/26',
    tagText: 'text-amber-900',
    tagMark: 'text-amber-700',
  },
};
