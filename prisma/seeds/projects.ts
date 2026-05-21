import { prisma } from '@/lib/db';
import type { ProjectStatus } from '@prisma/client';

interface SeedProject {
  slug: string;
  title: string;
  category: string;
  region: string;
  raisedAmount: number;
  goalAmount: number;
  status: ProjectStatus;
  description: string;
}

const PROJECTS: SeedProject[] = [
  {
    slug: 'tatev-monastery-full-3d-capture',
    title: 'Tatev Monastery — Full 3D Capture',
    category: 'Architecture',
    region: 'Syunik',
    raisedAmount: 12400,
    goalAmount: 28000,
    status: 'ACTIVE',
    description:
      'A complete Matterport and drone capture of the Tatev complex, including the refectory and the Devil\'s Bridge tunnels.',
  },
  {
    slug: 'matenadaran-manuscripts-ai-catalogue',
    title: 'Matenadaran Manuscripts AI Catalogue',
    category: 'Manuscripts',
    region: 'Yerevan',
    raisedAmount: 8200,
    goalAmount: 45000,
    status: 'ACTIVE',
    description:
      'An AI-assisted catalogue of 23,000 Matenadaran manuscripts with computer-vision search, multilingual abstracts and open API access.',
  },
  {
    slug: 'endangered-khachkars-of-julfa-memorial',
    title: 'Endangered Khachkars of Julfa Memorial',
    category: 'Sculpting',
    region: 'Diaspora',
    raisedAmount: 6800,
    goalAmount: 15000,
    status: 'ACTIVE',
    description:
      'A diaspora-led memorial project preserving the photographic and architectural memory of the Old Julfa khachkar cemetery.',
  },
  {
    slug: 'lori-berd-fortress-drone-survey',
    title: 'Lori Berd Fortress Drone Survey',
    category: 'Architecture',
    region: 'Lori',
    raisedAmount: 9000,
    goalAmount: 9000,
    status: 'FUNDED',
    description:
      'A high-resolution photogrammetric survey of the Bagratid capital citadel, producing the first open 3D model of the site.',
  },
  {
    slug: 'komitas-audio-restoration',
    title: 'Komitas Audio Restoration',
    category: 'Music',
    region: 'Yerevan',
    raisedAmount: 3100,
    goalAmount: 12000,
    status: 'ACTIVE',
    description:
      'Digital restoration and remastering of the earliest surviving recordings of Komitas, made freely available to researchers and the diaspora.',
  },
];

export async function seedProjects(): Promise<void> {
  for (const [index, project] of PROJECTS.entries()) {
    const payload = {
      title: project.title,
      category: project.category,
      region: project.region,
      raisedAmount: project.raisedAmount,
      goalAmount: project.goalAmount,
      status: project.status,
      description: project.description,
      image: `/images/projects/${project.slug}.svg`,
      isPublished: true,
      order: index,
    };
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: payload,
      create: { slug: project.slug, ...payload },
    });
  }
  console.log(`✓ Projects ready (${PROJECTS.length})`);
}
