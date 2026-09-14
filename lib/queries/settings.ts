import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { toPublicSiteSettings, type PublicSiteSettingsDTO } from '@/lib/dto';
import { DEFAULT_SITE_LOCALE, getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { localizedOrEnglishDefault } from '@/lib/i18n/home-fallbacks';
import { DEFAULT_ENABLED_LOCALES, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

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
  enabledLocales: [...DEFAULT_ENABLED_LOCALES],
  certificateGuardianUrl: null,
  certificateAmbassadorUrl: null,
  certificateMagistrUrl: null,
  downloadResources: null,
} as PublicSiteSettingsDTO;

function localizeSiteSettings(
  settings: PublicSiteSettingsDTO,
  locale: SiteLocaleCode,
): PublicSiteSettingsDTO {
  if (locale === 'EN') return settings;
  return {
    ...settings,
    foundationName: localizedOrEnglishDefault(
      settings.foundationName,
      FALLBACK.foundationName,
      uiMessage(locale, 'foundationName'),
      locale,
    ),
    foundationSubtitle: localizedOrEnglishDefault(
      settings.foundationSubtitle,
      FALLBACK.foundationSubtitle,
      uiMessage(locale, 'foundationSubtitle'),
      locale,
    ),
    footerDescription: localizedOrEnglishDefault(
      settings.footerDescription,
      FALLBACK.footerDescription,
      uiMessage(locale, 'footerBrandDescription'),
      locale,
    ),
    address: localizedOrEnglishDefault(
      settings.address,
      FALLBACK.address,
      uiMessage(locale, 'contactCityCountry'),
      locale,
    ),
  };
}

async function fetchSiteSettings(): Promise<PublicSiteSettingsDTO> {
  const locale = await getCurrentSiteLocale().catch(() => DEFAULT_SITE_LOCALE);
  try {
    return getSiteSettingsCachedByLocale(locale);
  } catch {
    return localizeSiteSettings(FALLBACK, locale);
  }
}

const getSiteSettingsCachedByLocale = unstable_cache(
  async (locale: SiteLocaleCode): Promise<PublicSiteSettingsDTO> => {
    const row = await prisma.siteSettings.findFirst();
    const settings = row ? toPublicSiteSettings(row) : FALLBACK;
    return localizeSiteSettings(settings, locale);
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 60 },
);

export const getSiteSettings = fetchSiteSettings;
