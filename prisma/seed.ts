/**
 * Idempotent seed script for Armenian Treasures.
 *
 * Order (per spec §13):
 *   1. Admin user
 *   2. SiteSettings singleton
 *   3. HomeContent singleton
 *   4. CultureMenuItem tree (parents → children → form nodes)
 *   5. CultureItem records
 *   6. Project records
 *   7. TeamMember records
 *   8. Career records
 *   9. Donator records
 *
 * Run with `pnpm db:seed`. Safe to re-run — every model is upserted by a stable key.
 */
import bcrypt from 'bcryptjs';
import { seedCareers } from './seeds/careers';
import { seedCultureItems } from './seeds/culture-items';
import { seedCultureMenu } from './seeds/culture-menu';
import { seedDonators } from './seeds/donators';
import { seedHomeContent } from './seeds/home-content';
import { seedProjects } from './seeds/projects';
import { seedSiteSettings } from './seeds/site-settings';
import { seedTeam } from './seeds/team';
import { prisma } from '@/lib/db';

async function seedAdminUser(): Promise<void> {
  const email = process.env.ADMIN_SEED_EMAIL ?? 'admin@armeniantreasures.org';
  const password = process.env.ADMIN_SEED_PASSWORD ?? 'ChangeMe!2026';
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: 'ADMIN' },
    create: { email, name: 'Armenian Treasures Admin', passwordHash, role: 'ADMIN' },
  });
  console.log(`✓ Admin user ready: ${email}`);
}

async function main(): Promise<void> {
  console.log('Seeding Armenian Treasures…');
  await seedAdminUser();
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
