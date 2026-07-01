export interface MegaMenuItem {
  label: string;
  href: string;
  /** Serializable slug key — resolved to a Lucide icon on the client. */
  icon: string;
  /** DB menu path used to resolve live hrefs from the admin menu tree. */
  menuPath?: string;
}

export interface MegaMenuColumn {
  heading: string;
  headingHref: string;
  /** DB menu path used to resolve live heading href from the admin menu tree. */
  headingMenuPath?: string;
  items: MegaMenuItem[];
}

export const CULTURE_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: 'Architecture',
    headingHref: '/culture/architecture',
    headingMenuPath: 'architecture',
    items: [
      {
        label: 'Churches',
        href: '/culture/architecture/churches',
        icon: 'churches',
        menuPath: 'architecture/churches',
      },
      {
        label: 'Castles',
        href: '/culture/architecture/castles',
        icon: 'castles',
        menuPath: 'architecture/castles',
      },
      {
        label: 'Museums',
        href: '/culture/museums',
        icon: 'museums',
        menuPath: 'museums',
      },
    ],
  },
  {
    heading: 'Myth & People',
    headingHref: '/culture/legends',
    headingMenuPath: 'legends',
    items: [
      {
        label: 'Myths & Gods',
        href: '/culture/legends/myths-and-gods',
        icon: 'mythology',
        menuPath: 'legends/myths-and-gods',
      },
      {
        label: 'Legends & Heroes',
        href: '/culture/legends/legends-and-heroes',
        icon: 'legends',
        menuPath: 'legends/legends-and-heroes',
      },
      {
        label: 'Icons of History',
        href: '/culture/people/icons-of-history',
        icon: 'kings',
        menuPath: 'people/icons-of-history',
      },
      {
        label: 'Scientists',
        href: '/culture/people/scientists',
        icon: 'scientists',
        menuPath: 'people/scientists',
      },
      {
        label: 'Famous Armenians',
        href: '/culture/people/famous-armenians',
        icon: 'famousArmenians',
        menuPath: 'people/famous-armenians',
      },
    ],
  },
  {
    heading: 'Arts & Culture',
    headingHref: '/culture/heritage',
    headingMenuPath: 'heritage',
    items: [
      {
        label: 'Paintings',
        href: '/culture/heritage/paintings',
        icon: 'paintings',
        menuPath: 'heritage/paintings',
      },
      {
        label: 'Music',
        href: '/culture/heritage/music',
        icon: 'music',
        menuPath: 'heritage/music',
      },
      {
        label: 'Writers',
        href: '/culture/heritage/writers',
        icon: 'writers',
        menuPath: 'heritage/writers',
      },
      {
        label: 'Taraz',
        href: '/culture/heritage/taraz',
        icon: 'taraz',
        menuPath: 'heritage/taraz',
      },
      {
        label: 'Carpets',
        href: '/culture/heritage/carpets',
        icon: 'carpets',
        menuPath: 'heritage/carpets',
      },
    ],
  },
  {
    heading: 'More Culture',
    headingHref: '/culture/heritage',
    headingMenuPath: 'heritage',
    items: [
      {
        label: 'Sculptors',
        href: '/culture/heritage/sculpting',
        icon: 'sculptors',
        menuPath: 'heritage/sculpting',
      },
      {
        label: 'Theatre',
        href: '/culture/heritage/theatre',
        icon: 'theatre',
        menuPath: 'heritage/theatre',
      },
      {
        label: 'Dance',
        href: '/culture/heritage/dance',
        icon: 'dance',
        menuPath: 'heritage/dance',
      },
      {
        label: 'Food & Drink',
        href: '/culture/heritage/food',
        icon: 'foodDrink',
        menuPath: 'heritage/food',
      },
      {
        label: 'Armaments',
        href: '/culture/heritage/armaments',
        icon: 'armaments',
        menuPath: 'heritage/armaments',
      },
      {
        label: 'Publications',
        href: '/culture/heritage/publications',
        icon: 'publications',
        menuPath: 'heritage/publications',
      },
    ],
  },
  {
    heading: 'Historical Highlights',
    headingHref: '/culture/history',
    headingMenuPath: 'history',
    items: [
      {
        label: 'Historical Events',
        href: '/culture/history/historical-events',
        icon: 'history',
        menuPath: 'history/historical-events',
      },
      {
        label: 'Capitals',
        href: '/culture/history/capitals',
        icon: 'history',
        menuPath: 'history/capitals',
      },
      {
        label: 'Battles & Wars',
        href: '/culture/history/battles-and-wars',
        icon: 'armaments',
        menuPath: 'history/battles-and-wars',
      },
      {
        label: 'Christian Heritage',
        href: '/culture/history/christian-heritage',
        icon: 'churches',
        menuPath: 'history/christian-heritage',
      },
      {
        label: 'Chronicles',
        href: '/culture/history/chronicles-and-manuscripts',
        icon: 'publications',
        menuPath: 'history/chronicles-and-manuscripts',
      },
      {
        label: 'Monuments',
        href: '/culture/history/monuments-and-landmarks',
        icon: 'sculptors',
        menuPath: 'history/monuments-and-landmarks',
      },
      {
        label: 'Traditions',
        href: '/culture/history/traditions',
        icon: 'dance',
        menuPath: 'history/traditions',
      },
    ],
  },
];

export function flattenCultureMegaMenu(columns: MegaMenuColumn[] = CULTURE_MEGA_MENU): MegaMenuItem[] {
  return columns.flatMap((column) => column.items);
}

export const CULTURE_PORTAL_NAV_ITEM_COUNT = flattenCultureMegaMenu().length;
