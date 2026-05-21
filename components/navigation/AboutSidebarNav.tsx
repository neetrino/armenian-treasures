'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ABOUT_TABS } from './primary-links';
import { cn } from '@/lib/utils';

export function AboutSidebarNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="About sections" className="lg:sticky lg:top-28">
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {ABOUT_TABS.map((tab) => {
          const active = pathname?.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-shrink-0">
              <Link
                href={tab.href}
                className={cn(
                  'inline-flex w-full items-center rounded-md px-4 py-2.5 text-sm font-medium transition',
                  active
                    ? 'bg-pomegranate text-parchment-50 shadow-sm'
                    : 'text-ink-soft hover:bg-stone-100 hover:text-ink',
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
