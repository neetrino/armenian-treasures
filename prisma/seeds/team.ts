import { prisma } from '@/lib/db';

interface SeedMember {
  email: string;
  name: string;
  initials: string;
  position: string;
  bio: string;
}

const TEAM: SeedMember[] = [
  {
    email: 'ara.hovhannisyan@armeniantreasures.org',
    name: 'Dr. Ara Hovhannisyan',
    initials: 'DA',
    position: 'Founder & President',
    bio: 'Armenian medieval historian, 25 years of fieldwork.',
  },
  {
    email: 'lilit.sargsyan@armeniantreasures.org',
    name: 'Lilit Sargsyan',
    initials: 'LS',
    position: 'Head of Digitization',
    bio: 'Matterport-certified, leads our 3D capture program.',
  },
  {
    email: 'vahan.petrosyan@armeniantreasures.org',
    name: 'Vahan Petrosyan',
    initials: 'VP',
    position: 'Drone & Photogrammetry Lead',
    bio: 'Aerospace engineer turned heritage technologist.',
  },
  {
    email: 'anna.grigoryan@armeniantreasures.org',
    name: 'Anna Grigoryan',
    initials: 'AG',
    position: 'Cultural Curator',
    bio: 'Curates the eleven cultural domains of the portal.',
  },
  {
    email: 'david.mkrtchyan@armeniantreasures.org',
    name: 'David Mkrtchyan',
    initials: 'DM',
    position: 'AI & Storytelling',
    bio: 'Builds the AI narratives bringing monuments to life.',
  },
  {
    email: 'mariam.avetisyan@armeniantreasures.org',
    name: 'Mariam Avetisyan',
    initials: 'MA',
    position: 'Partnerships',
    bio: 'Connects the foundation with diaspora and institutions.',
  },
];

export async function seedTeam(): Promise<void> {
  for (const [index, member] of TEAM.entries()) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: member.name, position: member.position },
    });
    const payload = {
      name: member.name,
      initials: member.initials,
      position: member.position,
      bio: member.bio,
      order: index,
      isActive: true,
    };
    if (existing) {
      await prisma.teamMember.update({ where: { id: existing.id }, data: payload });
    } else {
      await prisma.teamMember.create({ data: payload });
    }
  }
  console.log(`✓ Team ready (${TEAM.length})`);
}
