import { buildCultureMegaMenuFromAtFeatures } from '@/lib/navigation/at-features-culture-menu';

export interface MegaMenuItem {
  label: string;
  href: string;
  /** Serializable slug key — resolved to an ornamental icon on the client. */
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

/** AT Features sheet — 6 columns, 26 navigable culture destinations. */
export const CULTURE_MEGA_MENU: MegaMenuColumn[] = buildCultureMegaMenuFromAtFeatures();

export function flattenCultureMegaMenu(columns: MegaMenuColumn[] = CULTURE_MEGA_MENU): MegaMenuItem[] {
  return columns.flatMap((column) => column.items);
}

export const CULTURE_PORTAL_NAV_ITEM_COUNT = flattenCultureMegaMenu().length;
