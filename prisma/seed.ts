/**
 * Idempotent seed script for Armenian Treasures.
 *
 * Order (per spec §13):
 *   1. SiteSettings singleton
 *   2. HomeContent singleton
 *   3. CultureMenuItem tree (parents → children → form nodes)
 *   4. CultureItem records
 *   5. Project records
 *   6. TeamMember records
 *   7. Career records
 *   8. Donator records
 *
 * Run with `pnpm db:seed`. Safe to re-run — every model is upserted by a stable key.
 */
import { seedCareers } from './seeds/careers';
import { seedCultureItems } from './seeds/culture-items';
import { seedCultureMenu } from './seeds/culture-menu';
import { seedDonators } from './seeds/donators';
import { seedHomeContent } from './seeds/home-content';
import { seedProjects } from './seeds/projects';
import { seedSiteSettings } from './seeds/site-settings';
import { seedTeam } from './seeds/team';
import { prisma } from '@/lib/db';

async function main(): Promise<void> {
  console.log('Seeding Armenian Treasures…');
  await seedSiteSettings();
  await seedHomeContent();
  const menuMap = await seedCultureMenu();
  await seedCultureItems(menuMap);
  await seedProjects();
  await seedTeam();
  await seedCareers();
  await seedDonators();
  console.log('✓ Seed complete.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
