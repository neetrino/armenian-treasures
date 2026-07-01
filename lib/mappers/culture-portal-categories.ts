import {
  CULTURAL_PORTAL_ICON_SOURCES,
  type CulturalPortalIconSource,
} from '@/lib/constants/cultural-portal-icon-sources';
import {
  CULTURAL_PORTAL_CATEGORIES as FIGMA_CATEGORIES,
  type CulturalPortalCategory,
} from '@/lib/constants/cultural-portal';
import type { MenuNode } from '@/lib/culture-menu';
import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';

/** Resolves homepage grid hrefs from the live admin menu tree. */
const PORTAL_GRID_MENU_PATHS: Record<string, string> = {
  Churches: 'architecture/churches',
  Castles: 'architecture/castles',
  Legends: 'legends/legends-and-heroes',
  Mythology: 'legends/myths-and-gods',
  Museums: 'museums',
  Kings: 'people/icons-of-history',
  Scientists: 'people/scientists',
  'Famous Armenians': 'people/famous-armenians',
  History: 'history/historical-events',
  Paintings: 'heritage/paintings',
  Music: 'heritage/music',
  Writers: 'heritage/writers',
  Taraz: 'heritage/taraz',
  Carpets: 'heritage/carpets',
  Sculptors: 'heritage/sculpting',
  'Food & Drink': 'heritage/food',
  Dance: 'heritage/dance',
  Theatre: 'heritage/theatre',
  Armaments: 'heritage/armaments',
  Publications: 'heritage/publications',
};

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

export function buildCulturePortalCategories(tree: MenuNode[]): CulturalPortalCategory[] {
  const hrefMap = buildMenuHrefMap(tree);

  return FIGMA_CATEGORIES.map((category) => {
    const menuPath = PORTAL_GRID_MENU_PATHS[category.title];
    const href = menuPath
      ? resolveMenuHrefFromMap(hrefMap, menuPath, category.href)
      : category.href;

    return withIconSource({ ...category, href });
  });
}
