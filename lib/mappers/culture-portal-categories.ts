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

import {

  CULTURE_MEGA_MENU,

  flattenCultureMegaMenu,

} from '@/lib/navigation/culture-mega-menu';

import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';



const FIGMA_COPY_BY_LABEL = new Map(

  FIGMA_CATEGORIES.map((category) => [category.title, category]),

);



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



function resolveMegaMenuIcon(icon: string): CulturalPortalIconKey {

  if (icon in CULTURAL_PORTAL_ICON_SOURCES) {

    return icon as CulturalPortalIconKey;

  }



  return 'history';

}



function buildFigmaCulturePortalCategories(tree: MenuNode[]): CulturalPortalCategory[] {

  const hrefMap = buildMenuHrefMap(tree);



  return flattenCultureMegaMenu(CULTURE_MEGA_MENU).map((item) => {

    const figma = FIGMA_COPY_BY_LABEL.get(item.label);

    const href = item.menuPath
      ? resolveMenuHrefFromMap(hrefMap, item.menuPath, item.href)
      : item.href;



    return withIconSource({

      icon: figma?.icon ?? resolveMegaMenuIcon(item.icon),

      title: item.label,

      description:

        figma?.description ?? `Explore ${item.label.toLowerCase()} in the open archive.`,

      href,

    });

  });

}



export function buildCulturePortalCategories(tree: MenuNode[]): CulturalPortalCategory[] {

  const categories = buildFigmaCulturePortalCategories(tree);

  return categories.length > 0 ? categories : [...FIGMA_CATEGORIES];

}

