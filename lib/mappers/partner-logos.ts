import type { PartnerCard, PartnerCategory, PartnerLogo } from '@/lib/constants/partnership-page';

export interface HighlightedPartnerLogo {
  name: string;
  href: string;
  src: string;
  alt: string;
}

type ImagePartner = PartnerCard & { logo: Extract<PartnerLogo, { type: 'image' }> };

function isHighlightedPartner(partner: PartnerCard): partner is ImagePartner {
  return !partner.future && partner.logo.type === 'image';
}

export function collectHighlightedPartnerLogos(
  categories: readonly PartnerCategory[],
): HighlightedPartnerLogo[] {
  return categories.flatMap((category) => category.partners).filter(isHighlightedPartner).map((partner) => ({
    name: partner.name,
    href: partner.href.startsWith('#') ? '/partnership' : partner.href,
    src: partner.logo.src,
    alt: partner.logo.alt,
  }));
}
