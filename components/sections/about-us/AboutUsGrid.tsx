import type { HomeAboutCard } from '@/lib/constants/home-about-section';
import { AboutUsCard } from '@/components/sections/about-us/AboutUsCard';

interface AboutUsGridProps {
  cards: HomeAboutCard[];
}

export function AboutUsGrid({ cards }: AboutUsGridProps) {
  return (
    <div className="about-us-grid">
      {cards.map((card) => (
        <AboutUsCard key={card.title} card={card} />
      ))}
    </div>
  );
}
