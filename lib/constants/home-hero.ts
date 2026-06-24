/** Canonical homepage hero copy — always used for display regardless of CMS. */
export const HOME_HERO_COPY = {
  badge: '✦ DISCOVER · PRESERVE · CELEBRATE ✦',
  title: 'ARMENIAN',
  highlight: 'TREASURES',
  subtitle: 'CULTURAL HERITAGE\nPORTAL',
  tagline: 'BRINGING ARMENIAN HISTORY INTO THE DIGITAL FUTURE',
  description:
    "A living archive of Armenia's 3,000-year civilisation — its kingdoms, churches, legends, arts, and the people who shaped history.",
  primaryCtaText: 'EXPLORE ARMENIAN HERITAGE',
  primaryCtaUrl: '/culture',
  secondaryCtaText: 'SUPPORT THE MISSION',
  secondaryCtaUrl: '/partnership',
} as const;

/** Canonical homepage hero statistics — always used for display regardless of CMS. */
export const HOME_HERO_STATS = [
  { value: '3,000+', label: 'Years of History' },
  { value: '850+', label: 'Heritage Sites' },
  { value: '12,000+', label: 'Artefacts Documented' },
  { value: '47', label: 'Partner Institutions' },
] as const;
