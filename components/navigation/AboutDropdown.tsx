import { SimpleDropdown } from '@/components/navigation/SimpleDropdown';
import { isAboutNavActive } from '@/components/navigation/nav-styles';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { headerChromeLabel, translatedAboutMenu } from '@/lib/i18n/ui-chrome';

export function AboutDropdown({ locale }: { locale: SiteLocaleCode }) {
  return (
    <SimpleDropdown
      label={headerChromeLabel(locale, 'aboutUs')}
      items={translatedAboutMenu(locale)}
      isActive={isAboutNavActive}
      menuId="about-menu"
      fallbackHref="/about/mission"
    />
  );
}
