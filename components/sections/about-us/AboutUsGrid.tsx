import { HOME_ABOUT_CARDS } from '@/lib/constants/home-about-section';
import { AboutUsCard } from '@/components/sections/about-us/AboutUsCard';

export function AboutUsGrid() {
  return (
    <div className="about-us-grid">
      {HOME_ABOUT_CARDS.map((card) => (
        <AboutUsCard key={card.title} card={card} />
      ))}
    </div>
  );
}
