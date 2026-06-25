import '@/components/sections/heritage-map/heritage-map-section.css';
import { HERITAGE_MAP_SECTION } from '@/lib/constants/heritage-map-section';
import { HeritageMapPreview } from '@/components/sections/heritage-map/HeritageMapPreview';

export function HeritageMapSection() {
  return (
    <section
      id="map"
      className="relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 pb-[clamp(6.875rem,9vw,8.75rem)] pt-[clamp(4.5rem,6vw,6.5rem)] sm:px-6"
      aria-labelledby="heritage-map-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[73.75rem]">
        <header className="mb-[52px] max-w-[43.75rem] text-left">
          <p className="mb-[14px] font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
            {HERITAGE_MAP_SECTION.eyebrow}
          </p>

          <h2
            id="heritage-map-heading"
            className="mb-[18px] font-cinzel text-[clamp(2.125rem,3vw,3.25rem)] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-heritage-gold"
          >
            {HERITAGE_MAP_SECTION.title}
          </h2>

          <p className="max-w-[41.25rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-[rgba(232,216,155,0.68)]">
            {HERITAGE_MAP_SECTION.description}
          </p>
        </header>

        <HeritageMapPreview />
      </div>
    </section>
  );
}
