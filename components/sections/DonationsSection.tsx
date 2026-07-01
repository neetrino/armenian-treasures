import '@/components/sections/donations/donations-section.css';
import { HeritageCtaButton } from '@/components/ui/HeritageCtaButton';
import { DonationsPatronList } from '@/components/sections/donations/DonationsPatronList';
import { HeritageCrossOrnament } from '@/components/sections/shared/HeritageCrossOrnament';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function DonationsSection({ home }: HomeSectionContentProps) {
  const { donations } = getHomeSections(home);

  return (
    <section
      id="donors"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6"
      aria-labelledby="donations-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <HomeSectionHeader
          id="donations-heading"
          eyebrow={donations.eyebrow}
          title={donations.title}
          description={donations.description}
        />

        <DonationsPatronList />

        <div className="mt-10 flex justify-center sm:mt-12">
          <HeritageCtaButton href={donations.ctaUrl} label={donations.ctaLabel} />
        </div>

        <HeritageCrossOrnament className="mt-6" />
      </div>
    </section>
  );
}
