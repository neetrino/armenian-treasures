import { cookies } from 'next/headers';
import { isSiteLocaleCode, type SiteLocaleCode } from '@/lib/i18n/locale-config';
import { SITE_LOCALE_COOKIE } from '@/lib/i18n/locale-cookie';

export const DEFAULT_SITE_LOCALE: SiteLocaleCode = 'EN';

export async function getCurrentSiteLocale(): Promise<SiteLocaleCode> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SITE_LOCALE_COOKIE)?.value;
  if (!raw) return DEFAULT_SITE_LOCALE;
  const normalized = raw.toUpperCase();
  return isSiteLocaleCode(normalized) ? normalized : DEFAULT_SITE_LOCALE;
}
