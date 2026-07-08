export const PARTNERSHIP_STATS = [
  { num: '14+', label: 'Partner Institutions' },
  { num: '7', label: 'Countries Reached' },
  { num: '120K', label: 'Artifacts Preserved' },
  { num: '2.4M', label: 'Global Learners' },
  { num: 'Since 2020', label: 'In Operation' },
] as const;

export type PartnerLogo =
  | { type: 'image'; src: string; cover?: boolean; alt: string }
  | { type: 'placeholder'; label: string };

export type PartnerCard = {
  sector: string;
  name: string;
  desc: string;
  href: string;
  arrow: string;
  wide?: boolean;
  future?: boolean;
  logo: PartnerLogo;
};

export type PartnerCategory = {
  label: string;
  row: 'partner-row-1' | 'partner-row-2' | 'partner-row-3' | 'partner-row-4';
  partners: PartnerCard[];
};

const LOGO = (file: string, alt: string, cover?: boolean): PartnerLogo => ({
  type: 'image',
  src: `/partnerships/logos/${file}`,
  alt,
  cover,
});

export const PARTNERSHIP_CATEGORIES: PartnerCategory[] = [
  {
    label: 'Government & Public Institutions',
    row: 'partner-row-1',
    partners: [
      {
        sector: 'Sovereign Government Authority',
        name: 'Ministry of Education, Science, Culture and Sports of the Republic of Armenia',
        desc: 'The sovereign institutional backbone of Armenian heritage policy. The MoESCS provides governmental mandate, regulatory alignment, and direct access to state-held cultural repositories — ensuring Armenian Treasures operates within the highest frameworks of national cultural law, public accountability, and constitutional heritage protection.',
        href: '/culture',
        arrow: 'View Institution →',
        wide: true,
        logo: LOGO('partner-01.webp', 'Ministry of Education, Science, Culture and Sports'),
      },
    ],
  },
  {
    label: 'Religious & Cultural Heritage Institutions',
    row: 'partner-row-2',
    partners: [
      {
        sector: 'Apostolic Religious Heritage',
        name: 'Armenian Apostolic Church — Mother See of Holy Etchmiadzin',
        desc: 'The world\'s oldest national church, founded 301 AD, is the most enduring custodian of Armenian spiritual and cultural identity. This alliance grants access to centuries of liturgical manuscripts, sacred architecture, and oral theological tradition.',
        href: '/culture',
        arrow: 'View Institution →',
        logo: LOGO('partner-02.webp', 'Mother See of Holy Etchmiadzin'),
      },
      {
        sector: 'Regional Religious Network',
        name: 'Armenian Apostolic Church — Regional Dioceses',
        desc: 'The global network of regional Dioceses extends Armenian Treasures\' reach into diaspora communities across five continents, bridging the institutional authority of Etchmiadzin with the lived cultural practice of Armenian parishes worldwide.',
        href: '/culture',
        arrow: 'View Institution →',
        logo: { type: 'placeholder', label: 'Regional Dioceses Network' },
      },
    ],
  },
  {
    label: 'Museums & Spatial Repositories',
    row: 'partner-row-4',
    partners: [
      {
        sector: 'Archaeological Museum-Reserve',
        name: 'Erebuni Historical & Archaeological Museum-Reserve',
        desc: 'Guardian of the 782 BC Urartian fortress that gave Yerevan its name. This partnership enables high-resolution 3D scanning of cuneiform inscriptions, bronze artefacts, and excavated architectural remains from one of the oldest continuously inhabited sites in the region.',
        href: '/culture',
        arrow: 'View Institution →',
        logo: LOGO('partner-03.webp', 'Erebuni Museum-Reserve', true),
      },
      {
        sector: "Composer's House Museum",
        name: 'Alexander Spendiaryan House-Museum',
        desc: "The preserved home and creative archive of Armenia's foremost opera composer. This partnership enables the digital rescue of handwritten scores, personal correspondence, and performance ephemera from Armenia's golden age of classical music.",
        href: '/culture',
        arrow: 'View Institution →',
        logo: { type: 'placeholder', label: 'Alexander Spendiaryan House-Museum' },
      },
      {
        sector: "Composer's House Museum",
        name: 'Aram Khachaturian House-Museum',
        desc: "The living memorial of one of the 20th century's most original musical voices. Through this partnership, Armenian Treasures digitises concert recordings, biographical documents, and the personal effects of the Sabre Dance composer for global educational access.",
        href: '/khachaturian-museum',
        arrow: 'View Institution →',
        logo: LOGO('partner-04.webp', 'Aram Khachaturian House-Museum'),
      },
      {
        sector: 'Contemporary Arts Centre',
        name: 'Cafesjian Center for the Arts',
        desc: "Yerevan's premier contemporary arts institution, housing one of the most significant sculpture collections in the South Caucasus. The Cafesjian partnership bridges classical heritage with living Armenian artistic expression at the highest institutional level.",
        href: '/culture',
        arrow: 'View Institution →',
        logo: LOGO('partner-05.webp', 'Cafesjian Center for the Arts', true),
      },
    ],
  },
  {
    label: 'Educational & Innovation Partners',
    row: 'partner-row-1',
    partners: [
      {
        sector: 'Innovation & Creative Education',
        name: 'TUMO Center for Creative Technologies',
        desc: "TUMO is the most celebrated educational innovation in modern Armenia — a free after-school programme teaching digital arts, technology, and creative skills to thousands of young Armenians annually, with centres now on three continents. This partnership embeds Armenian cultural heritage directly into TUMO's cutting-edge digital curriculum, giving the next generation both the tools and the subject matter to become stewards of their own civilisation.",
        href: '/culture',
        arrow: 'View Institution →',
        wide: true,
        logo: LOGO('partner-06.webp', 'TUMO Center for Creative Technologies', true),
      },
    ],
  },
  {
    label: 'Foundations & Pan-Armenian Organisations',
    row: 'partner-row-3',
    partners: [
      {
        sector: 'International Foundation',
        name: 'Calouste Gulbenkian Foundation',
        desc: "One of the world's great philanthropic institutions with a mission spanning art, culture, science, and education. The Gulbenkian partnership grants Armenian Treasures the gravitas and global network of an institution recognised across four continents.",
        href: '/culture',
        arrow: 'View Institution →',
        logo: LOGO('partner-07.webp', 'Calouste Gulbenkian Foundation'),
      },
      {
        sector: 'Philanthropic Foundation',
        name: 'Tufenkian Foundation',
        desc: 'Since 1999, the Tufenkian Foundation has channelled diaspora resources into sustainable development and cultural preservation across Armenia. This partnership amplifies rural heritage initiatives and community-driven archiving in regions underserved by national infrastructure.',
        href: '/culture',
        arrow: 'View Institution →',
        logo: LOGO('partner-08.webp', 'Tufenkian Foundation'),
      },
      {
        sector: 'Pan-Armenian Organisation',
        name: 'Armenian General Benevolent Union (AGBU)',
        desc: 'With 130 chapters across five continents and over a century of pan-Armenian service, AGBU provides direct pathways to diaspora communities, educational networks, and cultural programming reaching hundreds of thousands of Armenians globally.',
        href: '/culture',
        arrow: 'View Institution →',
        logo: LOGO('partner-09.webp', 'Armenian General Benevolent Union'),
      },
    ],
  },
  {
    label: 'Technology & Corporate Partners',
    row: 'partner-row-1',
    partners: [
      {
        sector: 'Technology & Innovation — Forthcoming',
        name: 'Strategic Technology Partner',
        desc: 'Armenian Treasures is in active dialogue with leading global technology companies to establish a flagship corporate partnership centred on AI, spatial computing, and immersive heritage experiences. This position is reserved for an organisation that shares our conviction that technology must serve culture — not the reverse. We welcome formal inquiries from organisations at the frontier of human-centred innovation.',
        href: '#partner-form',
        arrow: 'Express Strategic Interest →',
        wide: true,
        future: true,
        logo: { type: 'placeholder', label: 'Strategic Technology Partner' },
      },
    ],
  },
];

export const PARTNERSHIP_SECTORS = [
  'Government & Public Institution',
  'Religious & Cultural Heritage',
  'Museum & Archive',
  'University & Research',
  'Foundation & NGO',
  'Technology & Corporate',
  'Media & Publishing',
  'Other',
] as const;
