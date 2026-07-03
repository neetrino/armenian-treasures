import { LandingHero } from '@/components/landing/LandingHero';

interface CulturalPortalHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  heroImage?: string | null;
}

export function CulturalPortalHero({
  eyebrow,
  title,
  accent,
  subtitle,
  heroImage,
}: CulturalPortalHeroProps) {
  return (
    <LandingHero
      eyebrow={eyebrow}
      title={title}
      accent={accent}
      subtitle={subtitle}
      heroImage={heroImage}
      ctas={[
        { label: 'Explore the Portal', href: '#cultural', variant: 'gold' },
        { label: 'Interactive Map', href: '#map', variant: 'teal' },
      ]}
    />
  );
}
