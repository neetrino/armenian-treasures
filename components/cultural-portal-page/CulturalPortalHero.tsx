import { LandingHero } from '@/components/landing/LandingHero';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';

interface CulturalPortalHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  heroImage?: string | null;
  locale: SiteLocaleCode;
}

export function CulturalPortalHero({
  eyebrow,
  title,
  accent,
  subtitle,
  heroImage,
  locale,
}: CulturalPortalHeroProps) {
  return (
    <LandingHero
      eyebrow={eyebrow}
      title={title}
      accent={accent}
      subtitle={subtitle}
      heroImage={heroImage}
      locale={locale}
      ctas={[
        { label: uiMessage(locale, 'explorePortal'), href: '#cultural', variant: 'gold' },
        { label: uiMessage(locale, 'interactiveMap'), href: '#map', variant: 'teal' },
      ]}
    />
  );
}
