import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechCard } from '@/components/cards/TechCard';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

interface TechItem {
  title: string;
  description: string;
  icon: string;
}

interface TechnologySectionProps {
  items: TechItem[];
}

export function TechnologySection({ items }: TechnologySectionProps) {
  return (
    <section className="bg-parchment-200/40 py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Technology"
          title="Heritage preserved with modern instruments"
          description="Three production-grade pipelines power every monument we add to the archive."
          align="center"
        />
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <TechCard title={card.title} description={card.description} iconName={card.icon} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
