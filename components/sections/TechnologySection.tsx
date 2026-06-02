import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { TechnologyBackground } from '@/components/sections/technology/TechnologyBackground';
import { TechnologyCard } from '@/components/sections/technology/TechnologyCard';
import {
  TECHNOLOGY_SECTION,
  enrichTechCards,
  type TechItemInput,
} from '@/components/sections/technology/technology-data';

const HEADER_DIVIDER = '/images/technology/divider-decoration.png';

interface TechnologySectionProps {
  items: TechItemInput[];
}

function TechnologySectionHeader() {
  return (
    <header className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center sm:gap-2.5">
      <div className="flex items-center gap-2 sm:gap-3">
        <Image
          src={HEADER_DIVIDER}
          alt=""
          width={40}
          height={10}
          className="h-2 w-9 object-contain opacity-50 sm:w-10"
          aria-hidden
        />
        <Eyebrow className="text-bronze-600/90">{TECHNOLOGY_SECTION.eyebrow}</Eyebrow>
        <Image
          src={HEADER_DIVIDER}
          alt=""
          width={40}
          height={10}
          className="h-2 w-9 scale-x-[-1] object-contain opacity-50 sm:w-10"
          aria-hidden
        />
      </div>

      <h2
        id="technology-heading"
        className="font-display text-[clamp(1.625rem,4.2vw,2.75rem)] leading-[1.08] tracking-tight text-ink"
      >
        <span className="block">{TECHNOLOGY_SECTION.titleLine1}</span>
        <span className="block">{TECHNOLOGY_SECTION.titleLine2}</span>
      </h2>

      <p className="max-w-[28rem] text-[0.8125rem] leading-snug text-ink-soft sm:max-w-[30rem] sm:text-[0.875rem] sm:leading-[1.55]">
        <span className="block">{TECHNOLOGY_SECTION.descriptionLine1}</span>
        <span className="block">{TECHNOLOGY_SECTION.descriptionLine2}</span>
      </p>
    </header>
  );
}

export function TechnologySection({ items }: TechnologySectionProps) {
  const cards = enrichTechCards(items);

  return (
    <section
      className="relative isolate -mt-[clamp(2.5rem,6vw,4.5rem)] overflow-hidden pb-[clamp(1.25rem,3.5vw,2.25rem)] pt-[clamp(2.5rem,6vw,4.5rem)] sm:pb-[clamp(1.5rem,4vw,2.5rem)] lg:pb-[clamp(1.75rem,4.5vw,2.75rem)] lg:pt-[clamp(2.75rem,6.5vw,4.75rem)]"
      aria-labelledby="technology-heading"
    >
      <TechnologyBackground />
      <Container className="relative z-10">
        <TechnologySectionHeader />

        <Stagger className="mx-auto mt-3.5 grid max-w-4xl auto-rows-fr gap-3.5 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:mt-5 lg:max-w-5xl lg:grid-cols-3 lg:gap-4">
          {cards.map((card, index) => (
            <StaggerItem
              key={card.title}
              className={cnCardPlacement(cards.length, index)}
            >
              <TechnologyCard
                title={card.title}
                description={card.description}
                iconName={card.icon}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                accent={card.accent}
                tags={card.tags}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function cnCardPlacement(total: number, index: number): string {
  const base = 'h-full';
  if (total % 3 === 1 && index === total - 1) {
    return `${base} sm:col-span-2 sm:max-w-md sm:justify-self-center lg:col-span-1 lg:max-w-none`;
  }
  return base;
}
