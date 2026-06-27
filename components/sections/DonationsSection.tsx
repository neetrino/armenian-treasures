import '@/components/sections/donations/donations-section.css';
import { HeritageCtaButton } from '@/components/ui/HeritageCtaButton';
import { DonationsPatronList } from '@/components/sections/donations/DonationsPatronList';
import { HeritageCrossOrnament } from '@/components/sections/shared/HeritageCrossOrnament';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function DonationsSection({ home }: HomeSectionContentProps) {
  const { donations } = getHomeSections(home);

  return (
    <section
      id="donors"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 pb-[clamp(3rem,5vw,4.5rem)] pt-[clamp(4.5rem,6vw,6.5rem)] sm:px-6"
      aria-labelledby="donations-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <header className="mb-[52px] max-w-[43.75rem] text-left">
          <p className="mb-[14px] font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
            {donations.eyebrow}
          </p>

          <h2
            id="donations-heading"
            className="mb-[18px] font-cinzel text-[clamp(2.125rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold"
          >
            {donations.title}
          </h2>

          <p className="max-w-[41.25rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-[rgba(232,216,155,0.68)]">
            {donations.description}
          </p>
        </header>

        <DonationsPatronList />

        <div className="mt-10 flex justify-center sm:mt-12">
          <HeritageCtaButton href={donations.ctaUrl} label={donations.ctaLabel} />
        </div>

        <HeritageCrossOrnament className="mt-[clamp(4.5rem,6vw,6.5rem)]" />
      </div>
    </section>
  );
}
