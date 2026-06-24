import Image from 'next/image';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

import { Container } from '@/components/layout/Container';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { TechnologyCard } from '@/components/sections/technology/TechnologyCard';
import { TechnologySectionDecorations } from '@/components/sections/technology/TechnologySectionDecorations';
import {
  TECHNOLOGY_SECTION,
  enrichTechCards,
  type TechItemInput,
} from '@/components/sections/technology/technology-data';

interface TechnologySectionProps {
  items: TechItemInput[];
}

function EyebrowDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} aria-hidden>
      <path fill="currentColor" d="M4 0 4.8 3.2 8 4 4.8 4.8 4 8 3.2 4.8 0 4 3.2 3.2 4 0Z" />
    </svg>
  );
}

function TechnologySectionHeader() {
  return (
    <header className="relative z-10 mx-auto flex max-w-[47.5rem] flex-col items-center gap-3 text-center sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex items-center gap-2 text-bronze/70" aria-hidden>
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-bronze/55 sm:w-8" />
          <EyebrowDiamond className="h-1.5 w-1.5 shrink-0" />
        </span>
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bronze sm:text-xs sm:tracking-[0.24em]">
          {TECHNOLOGY_SECTION.eyebrow}
        </span>
        <span className="flex items-center gap-2 text-bronze/70" aria-hidden>
          <EyebrowDiamond className="h-1.5 w-1.5 shrink-0" />
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-bronze/55 sm:w-8" />
        </span>
      </div>

      <h2
        id="technology-heading"
        className="max-w-[16ch] font-display text-[clamp(2rem,5.2vw,3.75rem)] leading-[1.12] tracking-tight text-ink sm:max-w-none sm:leading-[1.08]"
      >
        {TECHNOLOGY_SECTION.title}
      </h2>

      <Image
        src={resolvePublicAssetUrl('/images/technology/divider-decoration.png')}
        alt=""
        width={471}
        height={120}
        className="h-5 w-auto max-w-[14rem] opacity-90 sm:h-6 sm:max-w-[16rem]"
      />

      <p className="max-w-[40rem] text-[0.9375rem] leading-[1.68] text-ink-soft sm:text-base sm:leading-[1.7]">
        {TECHNOLOGY_SECTION.description}
      </p>
    </header>
  );
}

export function TechnologySection({ items }: TechnologySectionProps) {
  const cards = enrichTechCards(items);

  return (
    <section
      className="relative isolate overflow-hidden py-[clamp(4rem,9vw,6.25rem)] lg:pb-[7rem]"
      aria-labelledby="technology-heading"
    >
      <TechnologySectionDecorations />

      <Container className="relative z-10 max-w-[82.5rem]">
        <TechnologySectionHeader />

        <Stagger className="relative z-10 mx-auto mt-10 grid gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:mt-14 lg:grid-cols-3">
          {cards.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <TechnologyCard
                title={card.title}
                description={card.description}
                iconName={card.icon}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                accent={card.accent}
                tags={card.tags}
                imageObjectClassName={card.imageObjectClassName}
                imageZoomClassName={card.imageZoomClassName}
                imageBackdropClassName={card.imageBackdropClassName}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
