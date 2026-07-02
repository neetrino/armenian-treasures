/**
 * Canonical Culture Portal mega menu — aligned 1:1 with the AT Features sheet.
 * DB slugs/paths stay in prisma/seeds/culture-menu.ts; labels and column order live here.
 */
import type { MegaMenuColumn, MegaMenuItem } from '@/lib/navigation/culture-mega-menu';

type AtFeaturesItem = Omit<MegaMenuItem, 'href'> & {
  /** Fallback href when the live menu tree is unavailable. */
  fallbackHref: string;
};

type AtFeaturesColumn = {
  heading: string;
  headingMenuPath: string;
  fallbackHeadingHref: string;
  items: AtFeaturesItem[];
};

/** AT Features sheet column order and labels (source of truth for navigation UI). */
export const AT_FEATURES_CULTURE_COLUMNS: AtFeaturesColumn[] = [
  {
    heading: 'Architecture',
    headingMenuPath: 'architecture',
    fallbackHeadingHref: '/culture/architecture',
    items: [
      {
        label: 'Churches & Monasteries',
        icon: 'churches',
        menuPath: 'architecture/churches',
        fallbackHref: '/culture/architecture/churches',
      },
      {
        label: 'Castles',
        icon: 'castles',
        menuPath: 'architecture/castles',
        fallbackHref: '/culture/architecture/castles',
      },
      {
        label: 'Museums',
        icon: 'museums',
        menuPath: 'museums',
        fallbackHref: '/culture/museums',
      },
    ],
  },
  {
    heading: 'Myths & Legends',
    headingMenuPath: 'legends',
    fallbackHeadingHref: '/culture/legends',
    items: [
      {
        label: 'Myths & Gods',
        icon: 'mythology',
        menuPath: 'legends/myths-and-gods',
        fallbackHref: '/culture/legends/myths-and-gods',
      },
      {
        label: 'Legendaries & Heroes',
        icon: 'legends',
        menuPath: 'legends/legends-and-heroes',
        fallbackHref: '/culture/legends/legends-and-heroes',
      },
    ],
  },
  {
    heading: 'People',
    headingMenuPath: 'people',
    fallbackHeadingHref: '/culture/people',
    items: [
      {
        label: 'Icons of History',
        icon: 'kingsAndDynasties',
        menuPath: 'people/icons-of-history',
        fallbackHref: '/culture/people/icons-of-history',
      },
      {
        label: 'Scientists & Inventors',
        icon: 'scientists',
        menuPath: 'people/scientists',
        fallbackHref: '/culture/people/scientists',
      },
      {
        label: 'Famous Armenians',
        icon: 'famousArmenians',
        menuPath: 'people/famous-armenians',
        fallbackHref: '/culture/people/famous-armenians',
      },
    ],
  },
  {
    heading: 'Art & Culture',
    headingMenuPath: 'heritage',
    fallbackHeadingHref: '/culture/heritage',
    items: [
      {
        label: 'Paintings',
        icon: 'paintings',
        menuPath: 'heritage/paintings',
        fallbackHref: '/culture/heritage/paintings',
      },
      {
        label: 'Music',
        icon: 'music',
        menuPath: 'heritage/music',
        fallbackHref: '/culture/heritage/music',
      },
      {
        label: 'Writers',
        icon: 'writers',
        menuPath: 'heritage/writers',
        fallbackHref: '/culture/heritage/writers',
      },
      {
        label: 'Taraz',
        icon: 'taraz',
        menuPath: 'heritage/taraz',
        fallbackHref: '/culture/heritage/taraz',
      },
      {
        label: 'Carpets',
        icon: 'carpets',
        menuPath: 'heritage/carpets',
        fallbackHref: '/culture/heritage/carpets',
      },
    ],
  },
  {
    heading: 'More Culture',
    headingMenuPath: 'heritage',
    fallbackHeadingHref: '/culture/heritage',
    items: [
      {
        label: 'Sculptors',
        icon: 'sculptors',
        menuPath: 'heritage/sculpting',
        fallbackHref: '/culture/heritage/sculpting',
      },
      {
        label: 'Theatre',
        icon: 'theatre',
        menuPath: 'heritage/theatre',
        fallbackHref: '/culture/heritage/theatre',
      },
      {
        label: 'Dance',
        icon: 'dance',
        menuPath: 'heritage/dance',
        fallbackHref: '/culture/heritage/dance',
      },
      {
        label: 'Food & Drink',
        icon: 'foodDrink',
        menuPath: 'heritage/food',
        fallbackHref: '/culture/heritage/food',
      },
      {
        label: 'Publications',
        icon: 'publications',
        menuPath: 'heritage/publications',
        fallbackHref: '/culture/heritage/publications',
      },
      {
        label: 'Armaments',
        icon: 'armaments',
        menuPath: 'heritage/armaments',
        fallbackHref: '/culture/heritage/armaments',
      },
    ],
  },
  {
    heading: 'Historical Highlights',
    headingMenuPath: 'history',
    fallbackHeadingHref: '/culture/history',
    items: [
      {
        label: 'Historical Events & Turning Points',
        icon: 'history',
        menuPath: 'history/historical-events',
        fallbackHref: '/culture/history/historical-events',
      },
      {
        label: 'Capitals',
        icon: 'capitals',
        menuPath: 'history/capitals',
        fallbackHref: '/culture/history/capitals',
      },
      {
        label: 'Battles & Wars',
        icon: 'battlesAndWars',
        menuPath: 'history/battles-and-wars',
        fallbackHref: '/culture/history/battles-and-wars',
      },
      {
        label: 'Christian Heritage',
        icon: 'christianHeritage',
        menuPath: 'history/christian-heritage',
        fallbackHref: '/culture/history/christian-heritage',
      },
      {
        label: 'Chronicles & Manuscripts',
        icon: 'chroniclesAndManuscripts',
        menuPath: 'history/chronicles-and-manuscripts',
        fallbackHref: '/culture/history/chronicles-and-manuscripts',
      },
      {
        label: 'Monuments & Landmarks',
        icon: 'monumentsAndLandmarks',
        menuPath: 'history/monuments-and-landmarks',
        fallbackHref: '/culture/history/monuments-and-landmarks',
      },
      {
        label: 'Traditions',
        icon: 'traditions',
        menuPath: 'history/traditions',
        fallbackHref: '/culture/history/traditions',
      },
    ],
  },
];

export function buildCultureMegaMenuFromAtFeatures(): MegaMenuColumn[] {
  return AT_FEATURES_CULTURE_COLUMNS.map((column) => ({
    heading: column.heading,
    headingHref: column.fallbackHeadingHref,
    headingMenuPath: column.headingMenuPath,
    items: column.items.map((item) => ({
      label: item.label,
      href: item.fallbackHref,
      icon: item.icon,
      menuPath: item.menuPath,
    })),
  }));
}
