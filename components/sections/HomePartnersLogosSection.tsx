import '@/components/sections/home-partners/home-partners-logos.css';
import '@/components/sections/partnership/partnership-section.css';
import { HomePartnersLogoCarousel } from '@/components/sections/home-partners/HomePartnersLogoCarousel';
import { PartnershipApplyCta } from '@/components/sections/partnership/PartnershipApplyCta';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { collectHighlightedPartnerLogos } from '@/lib/mappers/partner-logos';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';
import { getPartnershipPageContent } from '@/lib/queries/page-content';

export async function HomePartnersLogosSection({ home }: HomeSectionContentProps) {
  const { partnership } = getHomeSections(home);
  const [{ categories }, locale] = await Promise.all([
    getPartnershipPageContent(),
    getCurrentSiteLocale(),
  ]);
  const logos = collectHighlightedPartnerLogos(categories);

  if (logos.length === 0) {
    return null;
  }

  return (
    <section
      id="partners"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] heritage-section-py"
      aria-labelledby="home-partners-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem] px-5 sm:px-6">
        <HomeSectionHeader
          id="home-partners-heading"
          eyebrow={partnership.eyebrow}
          title={uiMessage(locale, 'ourPartners')}
        />
      </div>

      <HomePartnersLogoCarousel logos={logos} locale={locale} />

      <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[73.75rem] justify-center px-5 sm:mt-14 sm:px-6">
        <PartnershipApplyCta ctaLabel={partnership.ctaLabel} ctaUrl={partnership.ctaUrl} />
      </div>
    </section>
  );
}
