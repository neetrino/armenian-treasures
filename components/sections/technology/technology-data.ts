import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

export const TECHNOLOGY_SECTION = {
  eyebrow: 'Technology',
  title: 'Heritage preserved with modern instruments',
  description:
    'Three production-grade pipelines power every monument we add to the archive—preserving, reconstructing, and narrating cultural heritage for generations to come.',
} as const;

export type TechAccent = 'copper' | 'emerald' | 'terracotta';

export interface TechVisualPreset {
  imageSrc: string;
  imageAlt: string;
  accent: TechAccent;
  icon: string;
  tags: readonly string[];
  /** Tailwind classes for cropping padded card artwork */
  imageObjectClassName?: string;
  imageZoomClassName?: string;
  imageBackdropClassName?: string;
}

export const TECH_VISUAL_PRESETS: readonly TechVisualPreset[] = [
  {
    imageSrc: resolvePublicAssetUrl('/images/technology/card-matterport.jpg'),
    imageAlt: 'Stone monastery interior with arched hall and warm light',
    accent: 'copper',
    icon: 'Headset',
    tags: ['IMMERSIVE', 'ACCURATE', 'ACCESSIBLE'],
  },
  {
    imageSrc: resolvePublicAssetUrl('/images/technology/card-drone.jpg'),
    imageAlt: 'Aerial view of a mountain fortress and monastery landscape',
    accent: 'emerald',
    icon: 'Drone',
    tags: ['PRECISE', 'SCALABLE', 'CONSISTENT'],
  },
  {
    imageSrc: resolvePublicAssetUrl('/images/technology/card-ai-storytelling.jpg'),
    imageAlt: 'Ancient manuscript with digital waveform overlay',
    accent: 'terracotta',
    icon: 'SquarePlay',
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
    return {
      title: item.title,
      description: item.description,
      icon: preset.icon,
      imageSrc: preset.imageSrc,
      imageAlt: preset.imageAlt,
      accent: preset.accent,
      tags: preset.tags,
      imageObjectClassName: preset.imageObjectClassName,
      imageZoomClassName: preset.imageZoomClassName,
      imageBackdropClassName: preset.imageBackdropClassName,
    };
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
    dividerLine: string;
    dividerDiamond: string;
    imageOverlay: string;
    imageCinematic: string;
    tagPill: string;
    tagText: string;
    waveFill: string;
  }
> = {
  copper: {
    cardBorder: 'border-[rgba(184,116,47,0.18)]',
    cardBorderHover: 'group-hover:border-[rgba(184,116,47,0.38)]',
    cardShadow:
      'shadow-[0_18px_50px_rgba(50,35,20,0.10),0_4px_16px_rgba(184,116,47,0.08)]',
    cardHoverShadow:
      'group-hover:shadow-[0_28px_60px_rgba(50,35,20,0.14),0_12px_32px_rgba(184,116,47,0.16)]',
    badge:
      'bg-[#6a3a14] bg-[radial-gradient(circle_at_32%_28%,#b8742f_0%,#8b4f1d_52%,#5c3210_100%)]',
    badgeRing: 'ring-4 ring-[#fffdf8]',
    badgeGlow: 'group-hover:shadow-[0_0_0_6px_rgba(184,116,47,0.12),0_12px_28px_rgba(139,79,29,0.28)]',
    dividerLine: 'via-[#b8742f]/45',
    dividerDiamond: 'text-[#b8742f]',
    imageOverlay: 'from-[#2a1a0a]/35 via-transparent to-transparent',
    imageCinematic: 'from-[#1a1208]/18 via-transparent to-transparent',
    tagPill: 'bg-[#f3dfc2] border border-[rgba(184,116,47,0.22)]',
    tagText: 'text-[#8b4f1d]',
    waveFill: '#fffdf8',
  },
  emerald: {
    cardBorder: 'border-[rgba(13,107,89,0.16)]',
    cardBorderHover: 'group-hover:border-[rgba(13,107,89,0.36)]',
    cardShadow:
      'shadow-[0_18px_50px_rgba(50,35,20,0.10),0_4px_16px_rgba(13,107,89,0.10)]',
    cardHoverShadow:
      'group-hover:shadow-[0_32px_64px_rgba(50,35,20,0.16),0_16px_40px_rgba(13,107,89,0.22)]',
    badge:
      'bg-[#053830] bg-[radial-gradient(circle_at_32%_28%,#0d6b59_0%,#084d40_52%,#052e26_100%)]',
    badgeRing: 'ring-4 ring-[#fffdf8]',
    badgeGlow: 'group-hover:shadow-[0_0_0_6px_rgba(13,107,89,0.12),0_12px_28px_rgba(8,77,64,0.3)]',
    dividerLine: 'via-[#0d6b59]/42',
    dividerDiamond: 'text-[#0d6b59]',
    imageOverlay: 'from-[#0a2018]/28 via-transparent to-transparent',
    imageCinematic: 'from-[#061410]/12 via-transparent to-transparent',
    tagPill: 'bg-[#0d6b59] border border-[rgba(8,77,64,0.35)]',
    tagText: 'text-white',
    waveFill: '#fffdf8',
  },
  terracotta: {
    cardBorder: 'border-[rgba(166,74,52,0.18)]',
    cardBorderHover: 'group-hover:border-[rgba(166,74,52,0.38)]',
    cardShadow:
      'shadow-[0_18px_50px_rgba(50,35,20,0.10),0_4px_16px_rgba(166,74,52,0.08)]',
    cardHoverShadow:
      'group-hover:shadow-[0_28px_60px_rgba(50,35,20,0.14),0_12px_32px_rgba(166,74,52,0.16)]',
    badge:
      'bg-[#5a2218] bg-[radial-gradient(circle_at_32%_28%,#a64a34_0%,#7f3324_52%,#5a2218_100%)]',
    badgeRing: 'ring-4 ring-[#fffdf8]',
    badgeGlow: 'group-hover:shadow-[0_0_0_6px_rgba(166,74,52,0.12),0_12px_28px_rgba(127,51,36,0.28)]',
    dividerLine: 'via-[#a64a34]/42',
    dividerDiamond: 'text-[#a64a34]',
    imageOverlay: 'from-[#2a1008]/35 via-transparent to-transparent',
    imageCinematic: 'from-[#1a0a06]/18 via-transparent to-transparent',
    tagPill: 'bg-[#a64a34] border border-[rgba(127,51,36,0.35)]',
    tagText: 'text-white',
    waveFill: '#fffdf8',
  },
};
