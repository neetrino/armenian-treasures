/**
 * Idempotent seed script for Armenian Treasures.
 *
 * Order (per spec §13):
 *   1. SiteSettings singleton
 *   2. HomeContent singleton
 *   3. AboutContent singleton
 *   4. CultureMenuItem tree (parents → children → form nodes)
 *   5. CultureItem records
 *   6. Project records
 *   7. TeamMember records
 *   8. Career records
 *   9. Donator records
 *
 * Run with `pnpm db:seed`. Safe to re-run — every model is upserted by a stable key.
 */
import { seedAboutContent } from './seeds/about-content';
import { seedCareers } from './seeds/careers';
import { seedCultureItems } from './seeds/culture-items';
import { seedCultureMenu } from './seeds/culture-menu';
import { seedDonators } from './seeds/donators';
import { seedHomeContent } from './seeds/home-content';
import { seedProjects } from './seeds/projects';
import { seedSiteSettings } from './seeds/site-settings';
import { seedTeam } from './seeds/team';
import { seedPageContent } from './seeds/page-content';
import { prisma } from '@/lib/db';

async function main(): Promise<void> {
  console.log('Seeding Armenian Treasures…');
  await seedSiteSettings();
  await seedHomeContent();
  await seedAboutContent();
  await seedPageContent();
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
