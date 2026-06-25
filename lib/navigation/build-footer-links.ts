import type { MenuNode } from '@/lib/culture-menu';
import type { FooterLinkItem } from '@/components/layout/footer/footer-links';
import { flattenCultureMegaMenu } from '@/lib/navigation/culture-mega-menu';
import { buildMenuHrefMap, resolveMenuHrefFromMap } from '@/lib/navigation/menu-href-map';

export function buildFooterCultureLinks(tree: MenuNode[]): FooterLinkItem[] {
  const hrefMap = buildMenuHrefMap(tree);

  const links = flattenCultureMegaMenu().map((item) => ({
    href: item.menuPath
      ? resolveMenuHrefFromMap(hrefMap, item.menuPath, item.href)
      : item.href,
    label: item.label,
  }));

  if (links.length === 0) {
    return [{ href: '/culture', label: 'Cultural Portal' }];
  }

  return links.slice(0, 8);
}
