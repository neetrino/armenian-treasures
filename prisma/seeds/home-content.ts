import { prisma } from '@/lib/db';

const SINGLETON_ID = 'home-content-singleton';

const STATS = [
  { value: '180+', label: 'Monuments scanned' },
  { value: '42', label: 'Virtual tours' },
  { value: '1700+', label: 'Years of history' },
  { value: '11', label: 'Cultural domains' },
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
  heroBadge: 'Since the 4th century',
  heroTitle: 'The living archive of',
  heroHighlight: 'Armenian heritage',
  heroDescription:
    "We digitize Armenia's monasteries, fortresses, museums and folk arts using Matterport virtual tours, drone photogrammetry and AI — preserving a civilization, one stone at a time.",
  heroImage: '/images/hero/home.svg',
  primaryCtaText: 'Explore the Culture Portal',
  primaryCtaUrl: '/culture',
  secondaryCtaText: 'Open Interactive Map',
  secondaryCtaUrl: '/map',
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
