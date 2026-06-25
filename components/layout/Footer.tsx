import '@/components/layout/footer/footer-section.css';
import { Container } from './Container';
import { FooterBrand } from '@/components/layout/footer/FooterBrand';
import { FooterBottomBar } from '@/components/layout/footer/FooterBottomBar';
import { FOOTER_LINKS_ABOUT, FOOTER_LINKS_EXPLORE } from '@/components/layout/footer/footer-links';
import { FooterNavColumn } from '@/components/layout/footer/FooterNavColumn';
import { getSiteSettings } from '@/lib/queries/settings';
import { getMenuTree } from '@/lib/queries/menu';
import { buildFooterCultureLinks } from '@/lib/navigation/build-footer-links';

export async function Footer() {
  const [settings, menuTree] = await Promise.all([getSiteSettings(), getMenuTree()]);
  const cultureLinks = buildFooterCultureLinks(menuTree);

  return (
    <footer className="site-footer">
      <Container className="px-5 py-[clamp(3.5rem,6vw,4.5rem)] sm:px-6">
        <div className="site-footer__grid">
          <FooterBrand settings={settings} />
          <FooterNavColumn title="Cultural Portal" links={cultureLinks} />
          <FooterNavColumn title="Explore" links={FOOTER_LINKS_EXPLORE} />
          <FooterNavColumn title="About" links={FOOTER_LINKS_ABOUT} />
        </div>

        <FooterBottomBar settings={settings} />
      </Container>
    </footer>
  );
}
