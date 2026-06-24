import { prisma } from '@/lib/db';

const SINGLETON_ID = 'home-content-singleton';

const STATS = [
  { value: '180+', label: 'Monuments Scanned' },
  { value: '42', label: 'Virtual Tours' },
  { value: '1,700+', label: 'Years of History' },
  { value: '11', label: 'Cultural Domains' },
];

const TECH_CARDS = [
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
];

const PAYLOAD = {
  heroBadge: '✦ DISCOVER · PRESERVE · CELEBRATE ✦',
  heroTitle: 'ARMENIAN',
  heroHighlight: 'TREASURES',
  heroDescription:
    "A living archive of Armenia's 3,000-year civilisation — its kingdoms, churches, legends, arts, and the people who shaped history.",
  heroImage: '/images/hero/home-hero.png',
  primaryCtaText: 'EXPLORE ARMENIAN HERITAGE',
  primaryCtaUrl: '/culture',
  secondaryCtaText: 'SUPPORT THE MISSION',
  secondaryCtaUrl: '/partnership',
  stats: STATS,
  missionTitle: "A nation's memory, made",
  missionHighlight: 'eternal.',
  missionText:
    'For over a millennium, Armenian craftsmen carved khachkars and built cliff-top monasteries that survived empires. Today many remain at risk. Armenian Treasures creates a permanent, open digital twin of every site — accessible to scholars, students and the diaspora worldwide.',
  techCards: TECH_CARDS,
  ctaTitle: 'Help us digitize the next monument',
  ctaDescription:
    'Every donation funds drone flights, 3D scans and the open archive that will outlast all of us.',
} as const;

export async function seedHomeContent(): Promise<void> {
  await prisma.homeContent.upsert({
    where: { id: SINGLETON_ID },
    update: { ...PAYLOAD },
    create: { id: SINGLETON_ID, ...PAYLOAD },
  });
  console.log('✓ Home content ready');
}
