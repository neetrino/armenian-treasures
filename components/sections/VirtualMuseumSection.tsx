import { HeritageCtaButton } from '@/components/ui/HeritageCtaButton';
import { VirtualMuseumFeatureGrid } from '@/components/sections/virtual-museum/VirtualMuseumFeatureGrid';
import { VIRTUAL_MUSEUM_CONTAINER_CLASS } from '@/components/sections/virtual-museum/heritage-feature-icon-styles';
import { ImmersiveTechBadgeIcon } from '@/components/sections/virtual-museum/VirtualMuseumIcons';
import { getHomeContent, getHomeSections } from '@/lib/queries/home';

function VirtualMuseumHeader({
  badge,
  eyebrow,
  title,
  description,
}: {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="relative z-10 mb-14 w-full max-w-[38.75rem] text-left">
      <div className="heritage-cta-clip inline-flex h-[22px] items-center gap-2.5 border border-[rgba(214,184,90,0.22)] bg-[rgba(214,184,90,0.06)] px-3.5">
        <ImmersiveTechBadgeIcon className="text-heritage-gold" />
        <span className="font-cinzel text-[8px] font-extrabold uppercase tracking-[0.22em] text-heritage-gold sm:text-[9px]">
          {badge}
        </span>
      </div>

      <p className="mt-3.5 font-cinzel text-[10px] font-bold uppercase tracking-[0.34em] text-heritage-teal">
        {eyebrow}
      </p>

      <h2
        id="virtual-museum-heading"
        className="mt-3 max-w-[43.75rem] font-cinzel text-[clamp(2.125rem,2.8vw,3rem)] font-extrabold uppercase leading-[1.03] tracking-[0.01em] text-heritage-gold"
      >
        {title}
      </h2>

      <p className="mt-[18px] max-w-[40rem] font-display text-[clamp(0.9375rem,1vw,1.125rem)] italic leading-[1.55] text-[rgba(232,216,155,0.68)]">
        {description}
      </p>
    </header>
  );
}

export async function VirtualMuseumSection({ embedded = false }: { embedded?: boolean }) {
  const home = await getHomeContent();
  const { virtualMuseum } = getHomeSections(home);

  return (
    <section
      id="virtual-museum"
      className={
        embedded
          ? 'relative scroll-mt-[calc(var(--site-header-height)+1rem)] px-5 pb-[clamp(2.5rem,4vw,3.5rem)] pt-[clamp(4.375rem,8vw,8.125rem)] sm:px-6'
          : 'relative isolate scroll-mt-[calc(var(--site-header-height)+1rem)] overflow-hidden bg-heritage-black px-5 pb-[clamp(2.5rem,4vw,3.5rem)] pt-[clamp(4.375rem,8vw,8.125rem)] sm:px-6'
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
        <VirtualMuseumHeader
          badge={virtualMuseum.badge}
          eyebrow={virtualMuseum.eyebrow}
          title={virtualMuseum.title}
          description={virtualMuseum.description}
        />
        <VirtualMuseumFeatureGrid />

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
