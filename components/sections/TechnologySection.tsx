import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { TechCard } from '@/components/cards/TechCard';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { TechnologyBackground } from '@/components/sections/technology/TechnologyBackground';
import {
  TECHNOLOGY_SECTION,
  enrichTechCards,
  type TechItemInput,
} from '@/components/sections/technology/technology-data';

const HEADER_DIVIDER = '/images/technology/divider-decoration.png';

interface TechnologySectionProps {
  items: TechItemInput[];
}

export function TechnologySection({ items }: TechnologySectionProps) {
  const cards = enrichTechCards(items);

  return (
    <section
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-28"
      aria-labelledby="technology-heading"
    >
      <TechnologyBackground />
      <Container className="relative z-10">
        <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-5">
          <Image
            src={HEADER_DIVIDER}
            alt=""
            width={56}
            height={14}
            className="h-3.5 w-14 object-contain opacity-50"
            aria-hidden
          />
          <Eyebrow className="text-bronze-600">{TECHNOLOGY_SECTION.eyebrow}</Eyebrow>
          <h2
            id="technology-heading"
            className="font-display text-[clamp(1.85rem,5vw,3.25rem)] leading-[1.12] tracking-tight text-ink"
          >
            <span className="block">{TECHNOLOGY_SECTION.titleLine1}</span>
            <span className="block">{TECHNOLOGY_SECTION.titleLine2}</span>
          </h2>
          <Image
            src={HEADER_DIVIDER}
            alt=""
            width={72}
            height={14}
            className="h-3 w-[4.5rem] object-contain opacity-45"
            aria-hidden
          />
          <p className="max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {TECHNOLOGY_SECTION.description}
          </p>
        </header>

        <Stagger className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => (
            <StaggerItem
              key={card.title}
              className={cnCardPlacement(cards.length, index)}
            >
              <TechCard
                title={card.title}
                description={card.description}
                iconName={card.icon}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                accent={card.accent}
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
