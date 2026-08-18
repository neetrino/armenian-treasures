import Image from 'next/image';
import Link from 'next/link';
import '@/components/sections/home-partners/home-partners-logos.css';
import '@/components/sections/partnership/partnership-section.css';
import { PartnershipApplyCta } from '@/components/sections/partnership/PartnershipApplyCta';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import { collectHighlightedPartnerLogos } from '@/lib/mappers/partner-logos';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';
import { getPartnershipPageContent } from '@/lib/queries/page-content';

export async function HomePartnersLogosSection({ home }: HomeSectionContentProps) {
  const { partnership } = getHomeSections(home);
  const { categories } = await getPartnershipPageContent();
  const logos = collectHighlightedPartnerLogos(categories);

  if (logos.length === 0) {
    return null;
  }

  return (
    <section
      id="partners"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="home-partners-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="home-partners-heading"
          eyebrow={partnership.eyebrow}
          title="Our Partners"
        />

        <div className="home-partners-logos">
          {logos.map((logo) => (
            <Link
              key={`${logo.name}-${logo.src}`}
              href={logo.href}
              className="home-partners-logos__item"
              aria-label={logo.name}
            >
              <Image
                src={resolvePublicAssetUrl(logo.src)}
                alt={logo.alt}
                width={152}
                height={80}
              />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <PartnershipApplyCta ctaLabel={partnership.ctaLabel} ctaUrl={partnership.ctaUrl} />
        </div>
      </div>
    </section>
  );
}
