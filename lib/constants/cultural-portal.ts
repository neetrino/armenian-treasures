import {
  CULTURAL_PORTAL_ICON_SOURCES,
  type CulturalPortalIconSource,
} from '@/lib/constants/cultural-portal-icon-sources';

export type CulturalPortalIconKey =
  | 'churches'
  | 'castles'
  | 'legends'
  | 'mythology'
  | 'museums'
  | 'kings'
  | 'scientists'
  | 'famousArmenians'
  | 'history'
  | 'paintings'
  | 'music'
  | 'writers'
  | 'taraz'
  | 'carpets'
  | 'sculptors'
  | 'foodDrink'
  | 'dance'
  | 'theatre'
  | 'armaments'
  | 'publications';

export interface CulturalPortalCategory {
  icon: CulturalPortalIconKey;
  iconSrc: string;
  sourceHref: string;
  title: string;
  description: string;
  href: string;
}

function withIconSource(
  category: Omit<CulturalPortalCategory, keyof CulturalPortalIconSource>,
): CulturalPortalCategory {
  const source = CULTURAL_PORTAL_ICON_SOURCES[category.icon];
  return {
    ...category,
    iconSrc: source.iconSrc,
    sourceHref: source.sourceHref,
  };
}

export const CULTURAL_PORTAL_SECTION = {
  eyebrow: 'CULTURAL PORTAL',
  title: 'EXPLORE ARMENIAN CIVILISATION',
  description:
    'From the stone-carved khachkars of Geghard to the epics of Sassounsi Davit — every facet of Armenian identity, catalogued and illuminated.',
} as const;

export const CULTURAL_PORTAL_CATEGORIES: CulturalPortalCategory[] = [
  withIconSource({
    icon: 'churches',
    title: 'Churches',
    description: 'Haghpat, Geghard, Etchmiadzin & more',
    href: '/culture/architecture/churches',
  }),
  withIconSource({
    icon: 'castles',
    title: 'Castles',
    description: 'Fortress cities & medieval strongholds',
    href: '/culture/architecture/castles',
  }),
  withIconSource({
    icon: 'legends',
    title: 'Legends',
    description: 'Oral traditions passed through millennia',
    href: '/culture/legends',
  }),
  withIconSource({
    icon: 'mythology',
    title: 'Mythology',
    description: 'Gods, rituals & cosmological epics',
    href: '/culture/legends',
  }),
  withIconSource({
    icon: 'museums',
    title: 'Museums',
    description: 'National collections & diaspora galleries',
    href: '/culture/museums',
  }),
  withIconSource({
    icon: 'kings',
    title: 'Kings',
    description: 'Tigranes the Great & the Artaxiad dynasty',
    href: '/culture/people',
  }),
  withIconSource({
    icon: 'scientists',
    title: 'Scientists',
    description: 'Pioneers of medicine, astronomy & physics',
    href: '/culture/people',
  }),
  withIconSource({
    icon: 'famousArmenians',
    title: 'Famous Armenians',
    description: 'Artists, leaders & innovators worldwide',
    href: '/culture/people',
  }),
  withIconSource({
    icon: 'history',
    title: 'History',
    description: 'Urartu to the modern Republic',
    href: '/culture/history',
  }),
  withIconSource({
    icon: 'paintings',
    title: 'Paintings',
    description: 'Miniatures, icons & contemporary art',
    href: '/culture/heritage/paintings',
  }),
  withIconSource({
    icon: 'music',
    title: 'Music',
    description: 'Duduk, folk traditions & liturgical chant',
    href: '/culture/heritage/music',
  }),
  withIconSource({
    icon: 'writers',
    title: 'Writers',
    description: 'Narek, Tumanyan, Charents & beyond',
    href: '/culture/heritage/writers',
  }),
  withIconSource({
    icon: 'taraz',
    title: 'Taraz',
    description: 'Regional costumes & traditional dress',
    href: '/culture/heritage/taraz',
  }),
  withIconSource({
    icon: 'carpets',
    title: 'Carpets',
    description: 'Woven stories in ancient patterns',
    href: '/culture/heritage/carpets',
  }),
  withIconSource({
    icon: 'sculptors',
    title: 'Sculptors',
    description: 'Khachkars, monuments & contemporary works',
    href: '/culture/heritage',
  }),
  withIconSource({
    icon: 'foodDrink',
    title: 'Food & Drink',
    description: 'The world’s oldest winemaking tradition',
    href: '/culture/heritage/food',
  }),
  withIconSource({
    icon: 'dance',
    title: 'Dance',
    description: 'Kochari, Shalakho & ceremonial forms',
    href: '/culture/heritage/dance',
  }),
  withIconSource({
    icon: 'theatre',
    title: 'Theatre',
    description: 'From ancient Artashat to Sundukyan Stage',
    href: '/culture/heritage/theatre',
  }),
  withIconSource({
    icon: 'armaments',
    title: 'Armaments',
    description: 'Military history & weapons of the ages',
    href: '/culture/heritage/armaments',
  }),
  withIconSource({
    icon: 'publications',
    title: 'Publications',
    description: 'Manuscripts, journals & scholarly works',
    href: '/culture/heritage/publications',
  }),
];
