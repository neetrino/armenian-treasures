import type { MenuNode } from '@/lib/culture-menu';
import type { FooterLinkItem } from '@/components/layout/footer/footer-links';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { chromeLabel } from '@/lib/i18n/ui-chrome';
import { resolveCultureMegaMenu } from '@/lib/navigation/resolve-header-nav';

export function buildFooterCultureLinks(
  tree: MenuNode[],
  locale: SiteLocaleCode = 'EN',
): FooterLinkItem[] {
  const columns = resolveCultureMegaMenu(tree, locale);

  if (columns.length === 0) {
    return [{ href: '/culture', label: chromeLabel(locale, 'culturalPortal') }];
  }

  return columns.map((column) => ({
    label: column.heading,
    href: column.headingHref,
  }));
}
