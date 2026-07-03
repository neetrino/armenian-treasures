import type { MenuNode } from '@/lib/culture-menu';
import type { FooterLinkItem } from '@/components/layout/footer/footer-links';
import { resolveCultureMegaMenu } from '@/lib/navigation/resolve-header-nav';

export function buildFooterCultureLinks(tree: MenuNode[]): FooterLinkItem[] {
  const columns = resolveCultureMegaMenu(tree);

  if (columns.length === 0) {
    return [{ href: '/culture', label: 'Cultural Portal' }];
  }

  return columns.map((column) => ({
    label: column.heading,
    href: column.headingHref,
  }));
}
