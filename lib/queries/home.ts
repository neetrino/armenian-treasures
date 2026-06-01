import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicHomeContent, type PublicHomeContentDTO } from '@/lib/dto';

const FALLBACK: PublicHomeContentDTO = {
  heroBadge: 'SINCE THE 4TH CENTURY',
  heroTitle: 'The living archive of',
  heroHighlight: 'Armenian heritage',
  heroDescription:
    "We digitize Armenia's monasteries, fortresses, museums and folk arts using Matterport virtual tours, drone photogrammetry and AI — preserving a civilization, one stone at a time.",
  heroImage: '/images/hero/home-hero.png',
  primaryCtaText: 'Explore the Culture Portal',
  primaryCtaUrl: '/culture',
  secondaryCtaText: 'Open Interactive Map',
  secondaryCtaUrl: '/map',
  stats: [
    { value: '180+', label: 'Monuments Scanned' },
    { value: '42', label: 'Virtual Tours' },
    { value: '1,700+', label: 'Years of History' },
    { value: '11', label: 'Cultural Domains' },
  ],
  missionTitle: "A nation's memory, made",
  missionHighlight: 'eternal.',
  missionText:
    'For over a millennium, Armenian craftsmen carved khachkars and built cliff-top monasteries that survived empires. Today many remain at risk. Armenian Treasures creates a permanent, open digital twin of every site — accessible to scholars, students and the diaspora worldwide.',
  techCards: [
    {
      title: 'Matterport Virtual Tours',
      description:
        'Walk through monasteries and museums room by room with photo-real 3D capture.',
      icon: 'Building2',
    },
    {
      title: 'Drone Photogrammetry',
      description:
        'Centimetre-accurate aerial reconstructions of fortresses, cliff churches and archaeological sites.',
      icon: 'Camera',
    },
    {
      title: 'AI Video & Storytelling',
      description:
        'AI-curated narratives in multiple languages, bringing context to every stone and manuscript.',
      icon: 'Sparkles',
    },
  ],
  ctaTitle: 'Help us digitize the next monument',
  ctaDescription:
    'Every donation funds drone flights, 3D scans and the open archive that will outlast all of us.',
};

async function fetchHomeContent(): Promise<PublicHomeContentDTO> {
  try {
    const row = await prisma.homeContent.findFirst();
    return row ? toPublicHomeContent(row) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const getHomeContent = unstable_cache(
  fetchHomeContent,
  ['home-content'],
  { tags: ['home-content'], revalidate: 60 },
);
