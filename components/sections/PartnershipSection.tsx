import '@/components/sections/partnership/partnership-section.css';
import { HOME_PARTNERSHIP_SECTION } from '@/lib/constants/home-partnership-section';
import { PartnershipApplyCta } from '@/components/sections/partnership/PartnershipApplyCta';
import { PartnershipCategoryGrid } from '@/components/sections/partnership/PartnershipCategoryGrid';

export function PartnershipSection() {
  return (
    <section
      id="partners"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 pb-[clamp(6.875rem,9vw,8.75rem)] pt-[clamp(4.5rem,6vw,6.5rem)] sm:px-6"
      aria-labelledby="partnership-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <header className="mb-[52px] max-w-[43.75rem] text-left">
          <p className="mb-[14px] font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
            {HOME_PARTNERSHIP_SECTION.eyebrow}
          </p>

          <h2
            id="partnership-heading"
            className="mb-[18px] font-cinzel text-[clamp(2.125rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold"
          >
            {HOME_PARTNERSHIP_SECTION.title}
          </h2>

          <p className="max-w-[41.25rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-[rgba(232,216,155,0.68)]">
            {HOME_PARTNERSHIP_SECTION.description}
          </p>
        </header>

        <PartnershipCategoryGrid />

        <div className="mt-12 flex justify-center sm:mt-14">
          <PartnershipApplyCta />
        </div>
      </div>
    </section>
  );
}
