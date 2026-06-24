export type DonationTierId = '500' | '1000' | 'custom';

export interface DonationTierFeature {
  text: string;
  included: boolean;
  lockedLabel?: string;
}

export interface DonationTier {
  id: DonationTierId;
  label: string;
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
    label: 'Monthly Patronage',
    title: 'Become a Heritage Guardian',
    description:
      "Every tier unlocks immersive 3D cities, offline cultural guides, and the knowledge that another fragment of Armenia's history will outlast this century.",
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
  newsletter: {
    title: 'Stay Connected to the Heritage',
    description:
      'New discoveries, project updates, and stories from the Armenian world — in your inbox.',
    placeholder: 'Your email address',
    buttonLabel: 'Subscribe',
    successMessage: '✦ Thank you — you are now part of the heritage community.',
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
    id: '500',
    label: 'Custodian',
    monthlyAmd: 500,
    annualAmd: 5000,
    ctaLabel: 'Activate Custodian',
    ctaVariant: 'ghost',
    ctaPost: 'Pause or cancel any time',
    features: [
      { text: 'Interactive heritage map — all 2,400+ sites', included: true },
      { text: 'Cultural portal — standard archive access', included: true },
      { text: 'Monthly discovery digest', included: true },
      {
        text: 'Immersive 3D city walkthroughs',
        included: false,
        lockedLabel: 'Not included: Immersive 3D city walkthroughs',
      },
      {
        text: 'Offline heritage guides',
        included: false,
        lockedLabel: 'Not included: Offline downloadable guides',
      },
      {
        text: 'AI Historian — unlimited queries',
        included: false,
        lockedLabel: 'Not included: AI Historian unlimited',
      },
    ],
  },
  {
    id: '1000',
    label: 'Guardian',
    monthlyAmd: 1000,
    annualAmd: 10000,
    primary: true,
    recommended: true,
    ctaLabel: 'Become a Guardian',
    ctaVariant: 'teal',
    ctaPost: 'Locks in today · Adjustable any time',
    features: [
      { text: 'Everything in Custodian', included: true },
      { text: 'Immersive 3D city walkthroughs', included: true },
      { text: 'Offline guides — all heritage routes', included: true },
      { text: 'AI Historian — unlimited queries', included: true },
      { text: 'Exclusive archival early-access releases', included: true },
      { text: 'Guardian name in annual patron credits', included: true },
    ],
  },
  {
    id: 'custom',
    label: 'Patron',
    monthlyAmd: null,
    annualAmd: null,
    customPrice: true,
    ctaLabel: 'Set My Contribution',
    ctaVariant: 'ghost',
    ctaPost: 'No ceiling · Pure legacy',
    features: [
      { text: 'All Guardian benefits', included: true },
      { text: 'Permanent Patron Wall listing', included: true },
      { text: 'Direct digitization allocation', included: true },
      { text: 'Private research access', included: true },
      { text: 'Personal annual impact letter', included: true },
    ],
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
  { label: 'Secured by Stripe' },
  { label: 'Cancel in one click' },
  { label: 'Tax-deductible receipt' },
  { label: 'Annual impact report' },
];
