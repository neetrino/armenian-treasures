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
      {
        label: 'History',
        href: '/culture/history',
        icon: 'history',
        menuPath: 'history',
      },
    ],
  },
  {
    heading: 'Myth & People',
    headingHref: '/culture/legends',
    headingMenuPath: 'legends',
    items: [
      {
        label: 'Legends',
        href: '/culture/legends',
        icon: 'legends',
        menuPath: 'legends',
      },
      {
        label: 'Mythology',
        href: '/culture/legends',
        icon: 'mythology',
        menuPath: 'legends',
      },
      {
        label: 'Kings',
        href: '/culture/people',
        icon: 'kings',
        menuPath: 'people',
      },
      {
        label: 'Scientists',
        href: '/culture/people',
        icon: 'scientists',
        menuPath: 'people',
      },
      {
        label: 'Famous Armenians',
        href: '/culture/people',
        icon: 'famousArmenians',
        menuPath: 'people',
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
];

export function flattenCultureMegaMenu(columns: MegaMenuColumn[] = CULTURE_MEGA_MENU): MegaMenuItem[] {
  return columns.flatMap((column) => column.items);
}

export const CULTURE_PORTAL_NAV_ITEM_COUNT = flattenCultureMegaMenu().length;
