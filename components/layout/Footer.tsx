import '@/components/layout/footer/footer-section.css';
import { Container } from './Container';
import { FooterBrand } from '@/components/layout/footer/FooterBrand';
import { FooterBottomBar } from '@/components/layout/footer/FooterBottomBar';
import { FooterNavColumn } from '@/components/layout/footer/FooterNavColumn';
import { FooterContactsColumn } from '@/components/layout/footer/FooterContactsColumn';
import { buildFooterCultureLinks } from '@/lib/navigation/build-footer-links';
import { getMenuTree } from '@/lib/queries/menu';
import { getSiteSettings } from '@/lib/queries/settings';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { chromeLabel, translatedFooterAboutLinks } from '@/lib/i18n/ui-chrome';

export async function Footer() {
  const [settings, menuTree, locale] = await Promise.all([
    getSiteSettings(),
    getMenuTree(),
    getCurrentSiteLocale(),
  ]);
  const culturalPortalLinks = buildFooterCultureLinks(menuTree);

  return (
    <footer className="site-footer">
      <Container className="px-5 pb-[clamp(3.5rem,6vw,4.5rem)] sm:px-6">
        <div className="site-footer__grid">
          <FooterBrand settings={settings} />
          <FooterNavColumn
            title={chromeLabel(locale, 'culturalPortal')}
            links={culturalPortalLinks}
            linkVariant="category"
          />
          <FooterNavColumn
            title={chromeLabel(locale, 'about')}
            links={translatedFooterAboutLinks(locale)}
            linkVariant="category"
          />
          <FooterContactsColumn settings={settings} title={chromeLabel(locale, 'contact')} />
        </div>

        <FooterBottomBar settings={settings} locale={locale} />
      </Container>
    </footer>
  );
}
