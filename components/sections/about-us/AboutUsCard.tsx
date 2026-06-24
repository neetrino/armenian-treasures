import Link from 'next/link';
import type { HomeAboutCard } from '@/lib/constants/home-about-section';
import { AboutUsCardIcon } from '@/components/sections/about-us/AboutUsCardIcon';

interface AboutUsCardProps {
  card: HomeAboutCard;
}

export function AboutUsCard({ card }: AboutUsCardProps) {
  return (
    <Link href={card.href} className="about-us-card group block h-full outline-none">
      <AboutUsCardIcon type={card.icon} />

      <h3 className="mt-5 font-cinzel text-[clamp(0.8125rem,1vw,0.9375rem)] font-extrabold uppercase leading-[1.15] tracking-[0.04em] text-heritage-gold transition-colors duration-[240ms] group-hover:text-[#E6C766]">
        {card.title}
      </h3>

      <p className="mt-3 max-w-[24rem] font-display text-[clamp(0.8125rem,0.9vw,0.9375rem)] leading-[1.55] text-[rgba(232,216,155,0.58)] transition-colors duration-[240ms] group-hover:text-[rgba(232,216,155,0.72)]">
        {card.description}
      </p>
    </Link>
  );
}
