import { Container } from './Container';
import { FooterBackground } from '@/components/layout/footer/FooterBackground';
import { FooterBrand } from '@/components/layout/footer/FooterBrand';
import { FooterBottomBar } from '@/components/layout/footer/FooterBottomBar';
import { FooterCtaBox } from '@/components/layout/footer/FooterCtaBox';
import {
  FOOTER_LINKS_ABOUT,
  FOOTER_LINKS_EXPLORE,
  FOOTER_LINKS_SUPPORT,
} from '@/components/layout/footer/footer-links';
import { FooterNavColumn } from '@/components/layout/footer/FooterNavColumn';
import { FooterOrnament } from '@/components/layout/footer/FooterOrnament';
import { getSiteSettings } from '@/lib/queries/settings';

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="relative overflow-hidden pt-16 pb-8 text-parchment-200">
      <FooterBackground />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-x-8 md:gap-y-10 xl:gap-x-10">
          <FooterBrand
            settings={settings}
            className="min-w-0 md:col-span-12 lg:col-span-4 lg:row-start-1"
          />
          <div className="relative min-w-0 md:col-span-12 lg:col-span-5 lg:col-start-5 lg:row-start-1 lg:pl-6 xl:pl-8">
            <FooterOrnament className="absolute -left-px top-0 hidden h-full lg:block" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
              <FooterNavColumn title="About" links={FOOTER_LINKS_ABOUT} />
              <FooterNavColumn title="Explore" links={FOOTER_LINKS_EXPLORE} />
              <FooterNavColumn title="Support" links={FOOTER_LINKS_SUPPORT} />
            </div>
          </div>
          <FooterCtaBox className="md:col-span-12 md:mx-auto md:max-w-xs lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mx-0 lg:max-w-none lg:justify-self-stretch" />
        </div>
        <FooterBottomBar settings={settings} />
      </Container>
    </footer>
  );
}
