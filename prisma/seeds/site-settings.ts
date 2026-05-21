import { prisma } from '@/lib/db';

const SINGLETON_ID = 'site-settings-singleton';

export async function seedSiteSettings(): Promise<void> {
  await prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {
      foundationName: 'Armenian Treasures',
      foundationSubtitle: 'Cultural Heritage Foundation',
      footerDescription:
        'Digitizing and preserving the architectural, artistic and spiritual heritage of Armenia for future generations.',
      contactEmail: 'info@armeniantreasures.org',
      phone: '+374 10 000 000',
      address: 'Yerevan, Armenia',
      copyrightText: '© 2026 Armenian Treasures Foundation. All rights reserved.',
      socialLinks: [],
    },
    create: {
      id: SINGLETON_ID,
      foundationName: 'Armenian Treasures',
      foundationSubtitle: 'Cultural Heritage Foundation',
      footerDescription:
        'Digitizing and preserving the architectural, artistic and spiritual heritage of Armenia for future generations.',
      contactEmail: 'info@armeniantreasures.org',
      phone: '+374 10 000 000',
      address: 'Yerevan, Armenia',
      copyrightText: '© 2026 Armenian Treasures Foundation. All rights reserved.',
      socialLinks: [],
    },
  });
  console.log('✓ Site settings ready');
}
