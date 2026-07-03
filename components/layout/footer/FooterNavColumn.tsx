import Link from 'next/link';
import type { FooterLinkItem } from '@/components/layout/footer/footer-links';
import { cn } from '@/lib/utils';

interface FooterNavColumnProps {
  title: string;
  links: FooterLinkItem[];
  linkVariant?: 'default' | 'category' | 'category-plain';
}

export function FooterNavColumn({ title, links, linkVariant = 'default' }: FooterNavColumnProps) {
  const linkClassName =
    linkVariant === 'category'
      ? 'site-footer__category-link'
      : linkVariant === 'category-plain'
        ? 'site-footer__category-link site-footer__category-link--plain'
        : 'site-footer__link';

  return (
    <nav aria-label={title} className="min-w-0">
      <p className="site-footer__column-title">{title}</p>

      <ul
        className={cn(
          'mt-5 flex flex-col',
          linkVariant === 'default' ? 'gap-3' : 'gap-2.5',
        )}
      >
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link href={link.href} className={linkClassName}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
