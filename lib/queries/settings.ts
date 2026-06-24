import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicSiteSettings, type PublicSiteSettingsDTO } from '@/lib/dto';

const FALLBACK: PublicSiteSettingsDTO = {
  foundationName: 'Armenian Treasures',
  foundationSubtitle: 'Cultural Heritage Foundation',
  footerDescription:
    'A living portal dedicated to the art, history, and people of one of humanity’s oldest civilizations.',
  contactEmail: 'info@armeniantreasures.org',
  phone: '+374 10 000 000',
  address: 'Yerevan, Armenia',
  copyrightText: '© 2026 Armenian Treasures. All rights reserved.',
  socialLinks: null,
};

async function fetchSiteSettings(): Promise<PublicSiteSettingsDTO> {
  try {
    const row = await prisma.siteSettings.findFirst();
    return row ? toPublicSiteSettings(row) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const getSiteSettings = unstable_cache(
  fetchSiteSettings,
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 60 },
);
