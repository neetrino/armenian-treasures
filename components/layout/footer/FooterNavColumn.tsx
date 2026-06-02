import Link from 'next/link';
import type { FooterLinkItem } from '@/components/layout/footer/footer-links';

interface FooterNavColumnProps {
  title: string;
  links: FooterLinkItem[];
}

function ColumnDiamond() {
  return (
    <svg viewBox="0 0 10 10" className="mb-2 h-2 w-2 text-bronze-400/75" aria-hidden>
      <path
        d="M5 0.5 L6 4 L9.5 5 L6 6 L5 9.5 L4 6 L0.5 5 L4 4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
    </svg>
  );
}

export function FooterNavColumn({ title, links }: FooterNavColumnProps) {
  return (
    <nav aria-label={title} className="min-w-0">
      <ColumnDiamond />
      <p className="text-[11px] uppercase tracking-eyebrow text-bronze-400">{title}</p>
      <ul className="mt-5 flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-parchment-200/88 transition hover:text-parchment-50"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
