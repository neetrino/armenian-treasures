import Link from 'next/link';
import type { FooterLinkItem } from '@/components/layout/footer/footer-links';

interface FooterNavColumnProps {
  title: string;
  links: FooterLinkItem[];
}

export function FooterNavColumn({ title, links }: FooterNavColumnProps) {
  return (
    <nav aria-label={title} className="min-w-0">
      <p className="font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
        {title}
      </p>

      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="font-display text-[clamp(0.875rem,0.95vw,0.9375rem)] leading-[1.4] text-surface-body transition-colors duration-[240ms] hover:text-surface"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
