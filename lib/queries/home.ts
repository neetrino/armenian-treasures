import { unstable_cache } from 'next/cache';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { HOME_HERO_STATS } from '@/lib/constants/home-hero';
import { prisma } from '@/lib/db';
import { toPublicHomeContent, type PublicHomeContentDTO } from '@/lib/dto';

export const HOME_CONTENT_FALLBACK: PublicHomeContentDTO = {
  heroBadge: '✦ DISCOVER · PRESERVE · CELEBRATE ✦',
  heroTitle: 'ARMENIAN',
  heroHighlight: 'TREASURES',
  heroDescription:
    "A living archive of Armenia's 3,000-year civilisation — its kingdoms, churches, legends, arts, and the people who shaped history.",
  heroImage: resolvePublicAssetUrl('/images/hero/home-hero.png'),
  heroMobileImage: null,
  primaryCtaText: 'EXPLORE ARMENIAN HERITAGE',
  primaryCtaUrl: '/culture',
  secondaryCtaText: 'SUPPORT THE MISSION',
  secondaryCtaUrl: '/partnership',
  stats: [...HOME_HERO_STATS],
  missionTitle: "A nation's memory, made",
  missionHighlight: 'eternal.',
  missionText:
    'For over a millennium, Armenian craftsmen carved khachkars and built cliff-top monasteries that survived empires. Today many remain at risk. Armenian Treasures creates a permanent, open digital twin of every site — accessible to scholars, students and the diaspora worldwide.',
  techCards: [
    {
      title: 'Matterport Virtual Tours',
      description:
        'Walk through monasteries and museums from anywhere with photo-real 3D capture and immersive experiences.',
      icon: 'ScanEye',
    },
    {
      title: 'Drone Photogrammetry',
      description:
        'Centimeter-accurate aerial reconstructions of fortresses, cliff churches, and archaeological sites.',
      icon: 'Drone',
    },
    {
      title: 'AI Video & Storytelling',
      description:
        'AI-curated narratives in multiple languages, bringing context to every stone and manuscript.',
      icon: 'AudioLines',
    },
  ],
  ctaTitle: 'Help us digitize the next monument',
  ctaDescription:
    'Every donation funds drone flights, 3D scans and the open archive that will outlast all of us.',
};

async function fetchHomeContent(): Promise<PublicHomeContentDTO> {
  try {
    const row = await prisma.homeContent.findFirst();
    return row ? toPublicHomeContent(row) : HOME_CONTENT_FALLBACK;
  } catch {
    return HOME_CONTENT_FALLBACK;
  }
}

export const getHomeContent = unstable_cache(
  fetchHomeContent,
  ['home-content'],
  { tags: ['home-content'], revalidate: 60 },
);
