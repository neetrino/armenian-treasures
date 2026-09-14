import {
  CULTURAL_PORTAL_ICON_SOURCES,
  type CulturalPortalIconSource,
} from '@/lib/constants/cultural-portal-icon-sources';
import {
  CULTURAL_PORTAL_CATEGORIES as FIGMA_CATEGORIES,
  type CulturalPortalCategory,
  type CulturalPortalIconKey,
} from '@/lib/constants/cultural-portal';
import type { MenuNode } from '@/lib/culture-menu';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { cultureMenuLabel } from '@/lib/i18n/messages/menu';
import { uiMessage, type UiMessageKey } from '@/lib/i18n/ui-messages';
import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';

/** Resolves homepage grid hrefs from the live admin menu tree. */
const PORTAL_GRID_MENU_PATHS: Partial<Record<CulturalPortalIconKey, string>> = {
  churches: 'architecture/churches',
  castles: 'architecture/castles',
  legends: 'legends/legends-and-heroes',
  mythology: 'legends/myths-and-gods',
  museums: 'museums',
  kings: 'people/icons-of-history',
  scientists: 'people/scientists',
  famousArmenians: 'people/famous-armenians',
  history: 'history/historical-events',
  paintings: 'heritage/paintings',
  music: 'heritage/music',
  writers: 'heritage/writers',
  taraz: 'heritage/taraz',
  carpets: 'heritage/carpets',
  sculptors: 'heritage/sculpting',
  foodDrink: 'heritage/food',
  dance: 'heritage/dance',
  theatre: 'heritage/theatre',
  armaments: 'heritage/armaments',
  publications: 'heritage/publications',
};

const PORTAL_CATEGORY_DESC_KEYS: Partial<Record<CulturalPortalIconKey, UiMessageKey>> = {
  churches: 'portalCatDescChurches',
  castles: 'portalCatDescCastles',
  legends: 'portalCatDescLegends',
  mythology: 'portalCatDescMythology',
  museums: 'portalCatDescMuseums',
  kings: 'portalCatDescKings',
  scientists: 'portalCatDescScientists',
  famousArmenians: 'portalCatDescFamousArmenians',
  history: 'portalCatDescHistory',
  paintings: 'portalCatDescPaintings',
  music: 'portalCatDescMusic',
  writers: 'portalCatDescWriters',
  taraz: 'portalCatDescTaraz',
  carpets: 'portalCatDescCarpets',
  sculptors: 'portalCatDescSculptors',
  foodDrink: 'portalCatDescFoodDrink',
  dance: 'portalCatDescDance',
  theatre: 'portalCatDescTheatre',
  armaments: 'portalCatDescArmaments',
  publications: 'portalCatDescPublications',
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

export function buildCulturePortalCategories(
  tree: MenuNode[],
  locale: SiteLocaleCode = 'EN',
): CulturalPortalCategory[] {
  const hrefMap = buildMenuHrefMap(tree);

  return FIGMA_CATEGORIES.map((category) => {
    const menuPath = PORTAL_GRID_MENU_PATHS[category.icon];
    const href = menuPath
      ? resolveMenuHrefFromMap(hrefMap, menuPath, category.href)
      : category.href;
    const descKey = PORTAL_CATEGORY_DESC_KEYS[category.icon];

    return withIconSource({
      ...category,
      href,
      title: (menuPath ? cultureMenuLabel(locale, menuPath) : null) ?? category.title,
      description: descKey ? uiMessage(locale, descKey) : category.description,
    });
  });
}
