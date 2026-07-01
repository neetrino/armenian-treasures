import { HeritageCtaButton } from '@/components/ui/HeritageCtaButton';
import { VirtualMuseumFeatureGrid } from '@/components/sections/virtual-museum/VirtualMuseumFeatureGrid';
import { VIRTUAL_MUSEUM_CONTAINER_CLASS } from '@/components/sections/virtual-museum/heritage-feature-icon-styles';
import { ImmersiveTechBadgeIcon } from '@/components/sections/virtual-museum/VirtualMuseumIcons';
import { HomeSectionHeader } from '@/components/sections/shared/HomeSectionHeader';
import { getHomeSections, type HomeSectionContentProps } from '@/lib/queries/home';

export async function VirtualMuseumSection({
  embedded = false,
  home,
}: HomeSectionContentProps & { embedded?: boolean }) {
  const { virtualMuseum } = getHomeSections(home);

  return (
    <section
      id="virtual-museum"
      className={
        embedded
          ? 'relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 heritage-section-py sm:px-6'
          : 'relative isolate scroll-mt-[calc(var(--site-header-height)+1rem)] overflow-hidden bg-surface px-5 heritage-section-py sm:px-6'
      }
      aria-labelledby="virtual-museum-heading"
    >
      {!embedded ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-heritage-radial opacity-90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-heritage-teal-glow opacity-70"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-hero-diamond-grid opacity-40"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(214,184,90,0.03)_0%,transparent_18%,transparent_82%,rgba(214,184,90,0.025)_100%)]"
            aria-hidden
          />
        </>
      ) : null}

      <div className={VIRTUAL_MUSEUM_CONTAINER_CLASS}>
        <div className="mb-8 inline-flex h-[22px] items-center gap-2.5 border border-[rgba(214,184,90,0.22)] bg-[rgba(214,184,90,0.06)] px-3.5">
          <ImmersiveTechBadgeIcon className="text-heritage-gold" />
          <span className="font-cinzel text-[8px] font-extrabold uppercase tracking-[0.22em] text-heritage-gold sm:text-[9px]">
            {virtualMuseum.badge}
          </span>
        </div>
        <HomeSectionHeader
          id="virtual-museum-heading"
          eyebrow={virtualMuseum.eyebrow}
          title={virtualMuseum.title}
          description={virtualMuseum.description}
          className="mb-12 max-w-[46rem]"
        />
        <VirtualMuseumFeatureGrid home={home} />

        <div className="relative z-10 mt-14 flex justify-center sm:mt-[3.75rem]">
          <HeritageCtaButton
            href={virtualMuseum.ctaUrl}
            label={virtualMuseum.ctaText}
            variant="gold"
            className="h-12 min-w-[270px] max-w-none px-9 text-[10px] tracking-[0.18em] sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
