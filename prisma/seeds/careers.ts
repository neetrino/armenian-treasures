import { prisma } from '@/lib/db';

interface SeedCareer {
  title: string;
  location: string;
  employmentType: string;
  description: string;
}

const CAREERS: SeedCareer[] = [
  {
    title: '3D Capture Specialist',
    location: 'Yerevan',
    employmentType: 'Full-time',
    description:
      'Lead Matterport scans of monasteries, museums and historic interiors. Train field assistants and own the digital twin pipeline.',
  },
  {
    title: 'Drone Pilot (Photogrammetry)',
    location: 'Field-based',
    employmentType: 'Contract',
    description:
      'Plan and fly photogrammetric missions at heritage sites across Armenia. EASA / FAA certification preferred.',
  },
  {
    title: 'Frontend Engineer',
    location: 'Remote',
    employmentType: 'Full-time',
    description:
      'Build the Armenian Treasures portal in TypeScript, React and Next.js. Care about accessibility, typography and cultural detail.',
  },
  {
    title: 'Cultural Researcher',
    location: 'Yerevan',
    employmentType: 'Part-time',
    description:
      'Research, fact-check and write the curated entries of the Culture Portal across architecture, music, manuscripts and folk arts.',
  },
];

export async function seedCareers(): Promise<void> {
  for (const [index, role] of CAREERS.entries()) {
    const existing = await prisma.career.findFirst({
      where: { title: role.title, location: role.location },
    });
    const payload = {
      ...role,
      applyEmail: 'careers@armeniantreasures.org',
      order: index,
      isActive: true,
    };
    if (existing) {
      await prisma.career.update({ where: { id: existing.id }, data: payload });
    } else {
      await prisma.career.create({ data: payload });
    }
  }
  console.log(`✓ Careers ready (${CAREERS.length})`);
}
