export type DonationTierId = '1000' | '5000' | '10000';

export interface DonationTierFeature {
  text: string;
  included: boolean;
  lockedLabel?: string;
}

export interface DonationTier {
  id: DonationTierId;
  label: string;
  /** One-time contribution amount shown on the shortcard. */
  amountAmd: number;
  monthlyAmd: number | null;
  annualAmd: number | null;
  primary?: boolean;
  recommended?: boolean;
  customPrice?: boolean;
  ctaLabel: string;
  ctaVariant: 'ghost' | 'teal';
  ctaPost: string;
  features: DonationTierFeature[];
}

export interface DonationImpactRange {
  min: number;
  max: number;
  text: string;
}

export interface DonationStat {
  target: number;
  suffix: string;
  label: string;
}

export interface DonationPillar {
  num: string;
  title: string;
  description: string;
}

export interface DonationLedgerItem {
  value: string;
  label: string;
}

export interface DonationWallTier {
  tier: 'gold' | 'silver' | 'bronze';
  badge: string;
  names: string;
  count: string;
}

export interface DonationTrustItem {
  label: string;
}

export const DONATION_PAGE = {
  metadata: {
    title: 'Become a Heritage Guardian — Armenian Treasures',
    description:
      'Every month your support activates the digitization, preservation, and global sharing of Armenian cultural heritage. Choose your level.',
  },
  breadcrumb: 'Donate',
  hero: {
    eyebrow: 'Armenian Cultural Heritage · Digital Preservation',
    title: 'Become a',
    titleLine2: 'Heritage Guardian',
    accent: 'Keep the Heritage Alive',
    subtitle:
      "For centuries, Armenia's monasteries, churches, and sacred landmarks have stood as silent witnesses to our faith and identity. Your monthly patronage keeps the digitization engine running — ensuring these stories outlast our century.",
    badges: [
      { label: 'Active since 2024', icon: 'clock' as const },
      { label: '1,247+ monthly patrons', icon: 'star' as const },
      { label: 'Non-profit · Tax-deductible', icon: 'check' as const },
    ],
  },
  mission: {
    label: 'Why It Matters',
    title: 'What Your Patronage Activates',
    description:
      'Monthly patronage is not a donation in the classical sense. It is a recurring vote that says: this culture deserves to be remembered.',
  },
  engine: {
    narrative: {
      paragraphs: [
        "For centuries, Armenia's monasteries, churches, fortresses, and sacred landmarks have stood as silent witnesses to our faith, resilience, and identity. They are more than stone and architecture — they are the living memory of our ancestors and the soul of our nation.",
        "Through Armenian Treasures, we preserve and share these priceless stories before they are lost to time. Every donation helps protect a piece of Armenia's heritage, ensuring that future generations can experience the beauty, history, and spirit that define who we are.",
      ],
      closing: "Together, we can keep Armenia's legacy alive.",
    },
    label: 'Patronage Levels',
    title: 'Choose Your Contribution',
    description:
      'Select a level below. Shortcards show the amount only — certificate details are completed under the tiers.',
  },
  certificates: {
    label: 'Certificates',
    title: 'Certificate Details',
    description:
      'Upload certificate templates in admin later. Provide recipient details so we can issue and send the certificate.',
    slots: [
      { id: 'guardian', label: 'Guardian certificate' },
      { id: 'ambassador', label: 'Ambassador certificate' },
      { id: 'magistr', label: 'Magistr certificate' },
    ],
    fields: {
      fullName: 'Full name',
      email: 'Email',
      note: 'Dedication / note (optional)',
    },
  },
  ledger: {
    label: 'Where Patronage Goes',
    title: 'The Ledger Is Open',
    description:
      'Every dram is tracked, reported, and visible. The archive belongs to everyone who sustains it.',
  },
  patronWall: {
    label: 'Patron Wall',
    title: 'Those Who Already Sustain',
    description:
      'Monthly patrons whose contributions keep the digitization cycle running — listed by stewardship tier.',
    ctaLabel: 'Join the Patron Wall',
  },
  quote: {
    text: "A civilization that loses its memory loses its claim on the future. The archive is not a museum — it is a living argument that Armenia will be remembered.",
    cite: 'Armenian Treasures · Mission Statement · 2024',
  },
} as const;

export const DONATION_STATS: DonationStat[] = [
  { target: 4280, suffix: '+', label: 'Artifacts Digitized' },
  { target: 216, suffix: '+', label: 'Heritage Sites Mapped' },
  { target: 1247, suffix: '+', label: 'Monthly Patrons' },
  { target: 84, suffix: '+', label: 'Countries Reached' },
  { target: 832, suffix: '+', label: 'Manuscripts Archived' },
];

export const DONATION_PILLARS: DonationPillar[] = [
  {
    num: '01',
    title: 'Digital Preservation',
    description:
      'Funds 3D scanning, 8K manuscript imaging, and audio-visual archiving of sites that exist nowhere else in the world.',
  },
  {
    num: '02',
    title: 'Immersive Access',
    description:
      'Keeps the 3D city engine, offline heritage guides, and AI Historian running — free for the diaspora and open to the world.',
  },
  {
    num: '03',
    title: 'Permanent Record',
    description:
      "Distributes redundant archival copies across partner institutions so no political event, earthquake, or erasure can delete what we've captured.",
  },
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: '1000',
    label: 'Guardian',
    amountAmd: 1000,
    monthlyAmd: 1000,
    annualAmd: null,
    ctaLabel: 'Select Guardian',
    ctaVariant: 'ghost',
    ctaPost: '',
    features: [],
  },
  {
    id: '5000',
    label: 'Ambassador',
    amountAmd: 5000,
    monthlyAmd: 5000,
    annualAmd: null,
    primary: true,
    recommended: true,
    ctaLabel: 'Select Ambassador',
    ctaVariant: 'teal',
    ctaPost: '',
    features: [],
  },
  {
    id: '10000',
    label: 'Magistr',
    amountAmd: 10000,
    monthlyAmd: 10000,
    annualAmd: null,
    ctaLabel: 'Select Magistr',
    ctaVariant: 'ghost',
    ctaPost: '',
    features: [],
  },
];

export const DONATION_IMPACT_RANGES: DonationImpactRange[] = [
  { min: 0, max: 800, text: 'Seeds one artifact tag in the public archive' },
  { min: 800, max: 1200, text: 'Restores 90 sec of digitized oral-history audio' },
  { min: 1200, max: 2000, text: 'Preserves 3 min of manuscript audio' },
  { min: 2000, max: 4000, text: 'Funds one page of 8K manuscript scanning' },
  { min: 4000, max: 7000, text: 'Covers 3D photogrammetry of one stone artifact' },
  { min: 7000, max: 12000, text: 'Sponsors a full khachkar 3D model — permanent' },
  { min: 12000, max: 20000, text: 'Funds one day of on-site field documentation' },
  { min: 20000, max: 35000, text: 'Enables a full church interior virtual capture' },
  { min: 35000, max: Infinity, text: 'Endows a named object in the permanent archive' },
];

export const PATRON_SLIDER_TICKS = [500, 1000, 1500, 5000, 10000, 25000, 50000] as const;

export const PATRON_QUICK_CHIPS = [1000, 1500, 3000, 5000, 10000] as const;

export const DONATION_LEDGER: DonationLedgerItem[] = [
  { value: '62%', label: 'Digitization & Field Documentation' },
  { value: '18%', label: 'Platform Infrastructure & Hosting' },
  { value: '12%', label: 'Research & Curatorial Partnerships' },
  { value: '8%', label: 'Operations & Legal Preservation' },
];

export const DONATION_WALL: DonationWallTier[] = [
  {
    tier: 'gold',
    badge: '◈ Gold Patrons',
    names: 'Ara Petrosyan · Narek Hovhannisyan · Marie Terzian · David Mkrtchyan · Anahit Grigoryan',
    count: '+18 more Gold Patrons worldwide',
  },
  {
    tier: 'silver',
    badge: '◈ Silver Patrons',
    names: 'Ani Sargsyan · Levon Avetisyan · Tamar Khachatryan · Sona Mkhitaryan',
    count: '+63 more Silver Patrons across 18 countries',
  },
  {
    tier: 'bronze',
    badge: '◇ Bronze Patrons',
    names: 'Community supporters across 31 countries',
    count: '1,166 Bronze Patrons — named in the annual report',
  },
];

export const DONATION_TRUST_ITEMS: DonationTrustItem[] = [
  { label: 'Non-profit · Registered' },
  { label: 'Secure checkout coming soon' },
  { label: 'Cancel in one click' },
  { label: 'Tax-deductible receipt' },
  { label: 'Annual impact report' },
];

/** Flip to true only after a payment provider is integrated and approved. */
export const DONATION_CHECKOUT_ENABLED = false;

export const DONATION_CHECKOUT_UNAVAILABLE = {
  noticeTitle: 'Online checkout coming soon',
  noticeBody:
    'Explore tiers and amounts below to learn about patronage. No payment is collected on this site yet.',
  tierCtaLabel: 'Coming soon',
  tierCtaPost: 'Online checkout not yet available',
  patronCtaLabel: 'Checkout coming soon',
  patronNote:
    'Online payment is not available yet. No card details are collected on this site.',
} as const;
