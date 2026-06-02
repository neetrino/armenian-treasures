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
    <header className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center sm:gap-6 lg:gap-7">
      <div className="flex items-center gap-3 sm:gap-4">
        <Image
          src={HEADER_DIVIDER}
          alt=""
          width={48}
          height={12}
          className="h-2.5 w-11 object-contain opacity-50 sm:w-12"
          aria-hidden
        />
        <Eyebrow className="text-bronze-600/90">{TECHNOLOGY_SECTION.eyebrow}</Eyebrow>
        <Image
          src={HEADER_DIVIDER}
          alt=""
          width={48}
          height={12}
          className="h-2.5 w-11 scale-x-[-1] object-contain opacity-50 sm:w-12"
          aria-hidden
        />
      </div>

      <h2
        id="technology-heading"
        className="font-display text-[clamp(2.125rem,5.8vw,4rem)] leading-[1.08] tracking-tight text-ink"
      >
        <span className="block">{TECHNOLOGY_SECTION.titleLine1}</span>
        <span className="block">{TECHNOLOGY_SECTION.titleLine2}</span>
      </h2>

      <p className="max-w-[36rem] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base sm:leading-[1.75] lg:max-w-[40rem] lg:text-[1.0625rem]">
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
      className="relative isolate -mt-[clamp(3.5rem,8vw,6.5rem)] overflow-hidden py-[clamp(4rem,9vw,7rem)] pt-[clamp(3.5rem,8vw,6.5rem)] sm:pt-[clamp(4rem,9vw,7rem)] lg:py-[clamp(5rem,10vw,8.5rem)] lg:pt-[clamp(4.5rem,10vw,7.5rem)]"
      aria-labelledby="technology-heading"
    >
      <TechnologyBackground />
      <Container className="relative z-10">
        <TechnologySectionHeader />

        <Stagger className="mt-10 grid auto-rows-fr gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:mt-[4.25rem] lg:grid-cols-3 lg:gap-8">
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
