import { prisma } from '@/lib/db';

interface SeedDonator {
  name: string;
  type: string;
  year?: number;
}

const DONATORS: SeedDonator[] = [
  { name: 'Calouste Gulbenkian Foundation', type: 'Founding Patron', year: 2022 },
  { name: 'Armenian General Benevolent Union', type: 'Institutional', year: 2023 },
  { name: 'Ruben Vardanyan', type: 'Patron', year: 2023 },
  { name: 'Aurora Humanitarian Initiative', type: 'Institutional', year: 2024 },
  { name: 'Hayastan All-Armenian Fund', type: 'Founding Patron', year: 2022 },
  { name: 'FAR — Fund for Armenian Relief', type: 'Patron', year: 2024 },
  { name: 'Anonymous Diaspora Family', type: 'Patron', year: 2024 },
  { name: 'Yerevan State University', type: 'Academic', year: 2023 },
  { name: 'Tumo Center for Creative Technologies', type: 'Institutional', year: 2024 },
];

export async function seedDonators(): Promise<void> {
  for (const [index, donator] of DONATORS.entries()) {
    const existing = await prisma.donator.findFirst({
      where: { name: donator.name },
    });
    const payload = {
      name: donator.name,
      type: donator.type,
      year: donator.year ?? null,
      order: index,
      isPublic: true,
    };
    if (existing) {
      await prisma.donator.update({ where: { id: existing.id }, data: payload });
    } else {
      await prisma.donator.create({ data: payload });
    }
  }
  console.log(`✓ Donators ready (${DONATORS.length})`);
}
