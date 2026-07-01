import { prisma } from '@/lib/db';

const SINGLETON_ID = 'site-settings-singleton';

export async function seedSiteSettings(): Promise<void> {
  await prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {
      foundationName: 'Armenian Treasures',
      foundationSubtitle: 'Cultural Heritage Foundation',
      footerDescription:
        'A living portal dedicated to the art, history, and people of one of humanity’s oldest civilizations.',
      contactEmail: 'info@armeniantreasures.org',
      phone: '+374 10 000 000',
      address: 'Yerevan, Armenia',
      copyrightText: '© 2026 Armenian Treasures. All rights reserved.',
      socialLinks: [],
      enabledLocales: ['EN'],
    },
    create: {
      id: SINGLETON_ID,
      foundationName: 'Armenian Treasures',
      foundationSubtitle: 'Cultural Heritage Foundation',
      footerDescription:
        'A living portal dedicated to the art, history, and people of one of humanity’s oldest civilizations.',
      contactEmail: 'info@armeniantreasures.org',
      phone: '+374 10 000 000',
      address: 'Yerevan, Armenia',
      copyrightText: '© 2026 Armenian Treasures. All rights reserved.',
      socialLinks: [],
      enabledLocales: ['EN'],
    },
  });
  console.log('✓ Site settings ready');
}
