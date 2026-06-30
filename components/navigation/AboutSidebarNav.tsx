'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ABOUT_TABS } from './primary-links';
import { cn } from '@/lib/utils';

export function AboutSidebarNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="About sections" className="w-full">
      <ul className="flex flex-wrap justify-center gap-2 pb-2 lg:gap-2.5 lg:pb-0">
        {ABOUT_TABS.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-shrink-0">
              <Link
                href={tab.href}
                className={cn(
                  'inline-flex w-full items-center border px-4 py-3 font-cinzel text-[11px] font-extrabold uppercase tracking-[0.16em] transition',
                  active
                    ? 'border-[rgba(39,198,200,0.34)] bg-[rgba(39,198,200,0.08)] text-heritage-teal'
                    : 'border-surface bg-[var(--surface-card-bg)] text-heritage-gold/85 hover:border-[var(--surface-card-hover-border)] hover:text-heritage-gold',
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
