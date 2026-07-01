import type { VirtualMuseumIconSource } from '@/lib/constants/virtual-museum-icon-sources';
import { VIRTUAL_MUSEUM_ICON_SOURCES } from '@/lib/constants/virtual-museum-icon-sources';

export type VirtualMuseumBadgeTone = 'teal' | 'gold';

export type VirtualMuseumIconKey = 'tours' | 'artefacts' | 'galleries' | 'events';

export interface VirtualMuseumFeature {
  number: string;
  icon: VirtualMuseumIconKey;
  iconSrc: string;
  sourceHref: string;
  badge: string;
  badgeTone: VirtualMuseumBadgeTone;
  title: string;
  description: string;
}

function withIconSource(
  feature: Omit<VirtualMuseumFeature, keyof VirtualMuseumIconSource>,
): VirtualMuseumFeature {
  const source = VIRTUAL_MUSEUM_ICON_SOURCES[feature.icon];
  return {
    ...feature,
    iconSrc: source.iconSrc,
    sourceHref: source.sourceHref,
  };
}

export const VIRTUAL_MUSEUM_SECTION = {
  badge: 'IMMERSIVE TECHNOLOGY',
  eyebrow: 'VIRTUAL MUSEUM',
  title: 'STEP INSIDE 3,000 YEARS OF HISTORY',
  description:
    'Experience Armenian heritage like never before. Our immersive digital museum brings ancient civilizations to life — making the past accessible from anywhere on Earth through cutting-edge virtual and spatial technology.',
  ctaText: 'ENTER VIRTUAL MUSEUM',
  ctaUrl: '/virtual-museum',
  features: [
    withIconSource({
      number: '01',
      icon: 'tours',
      badge: 'BETA ACCESS',
      badgeTone: 'teal',
      title: '360° VIRTUAL TOURS',
      description:
        'Immerse yourself in full 360° panoramic walkthroughs of ancient monasteries, fortresses, and sacred sites across historic Armenia — from Geghard to the ruins of Van.',
    }),
    withIconSource({
      number: '02',
      icon: 'artefacts',
      badge: 'COMING Q3 2026',
      badgeTone: 'gold',
      title: '3D ARTEFACT EXPLORER',
      description:
        'Examine 12,000+ documented artefacts in photorealistic 3D. Rotate, zoom, and study every inscription, texture, and detail of objects spanning millennia of Armenian history.',
    }),
    withIconSource({
      number: '03',
      icon: 'galleries',
      badge: 'COMING Q4 2026',
      badgeTone: 'gold',
      title: 'IMMERSIVE GALLERIES',
      description:
        'Curated thematic exhibitions of Armenian art, ancient manuscripts, and cultural objects — arranged into stunning virtual gallery spaces navigable in real time.',
    }),
    withIconSource({
      number: '04',
      icon: 'events',
      badge: 'LIVE',
      badgeTone: 'teal',
      title: 'LIVE HERITAGE EVENTS',
      description:
        'Join live-streamed guided tours and cultural lectures with world-leading historians, archaeologists, and Armenian cultural ambassadors — broadcast to every corner of the diaspora.',
    }),
  ] satisfies VirtualMuseumFeature[],
} as const;
