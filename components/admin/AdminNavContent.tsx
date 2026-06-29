'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV_GROUPS } from '@/lib/admin/admin-nav-config';
import { cn } from '@/lib/utils';

interface AdminNavContentProps {
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
}

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/admin/dashboard') return pathname === href;
  return pathname.startsWith(href);
}

export function AdminNavContent({ collapsed = false, onNavigate, className }: AdminNavContentProps) {
  const pathname = usePathname() ?? '';

  return (
    <nav className={cn('flex flex-col gap-5', className)} aria-label="Admin">
      {ADMIN_NAV_GROUPS.map((group) => (
        <div key={group.label}>
          {collapsed ? (
            <div className="mx-auto mb-2 h-px w-8 bg-stone-200/90" aria-hidden />
          ) : (
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-bronze-700/70">
              {group.label}
            </p>
          )}
          <ul className={cn('flex flex-col', collapsed ? 'gap-1.5' : 'mt-1.5 gap-1')}>
            {group.links.map((link) => {
              const Icon = link.icon;
              const active = isNavActive(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    title={collapsed ? link.label : undefined}
                    aria-label={collapsed ? link.label : undefined}
                    className={cn(
                      'group relative flex items-center rounded-2xl transition-all duration-200 ease-cinematic',
                      collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5',
                      active
                        ? 'bg-gradient-to-r from-pomegranate to-pomegranate-600 text-parchment-50 shadow-md shadow-pomegranate/25'
                        : 'text-ink-soft hover:-translate-y-px hover:bg-white/80 hover:text-ink hover:shadow-sm',
                    )}
                  >
                    {active && !collapsed ? (
                      <span
                        className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-bronze-300"
                        aria-hidden
                      />
                    ) : null}

                    <span
                      className={cn(
                        'inline-flex shrink-0 items-center justify-center rounded-xl transition-colors',
                        collapsed ? 'h-10 w-10' : 'h-9 w-9',
                        active
                          ? 'bg-white/15 text-parchment-50'
                          : 'bg-stone-100/90 text-bronze-800 group-hover:bg-bronze-50 group-hover:text-pomegranate',
                      )}
                    >
                      <Icon size={18} strokeWidth={1.75} aria-hidden />
                    </span>

                    {!collapsed ? (
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium leading-tight">{link.label}</span>
                        {link.description ? (
                          <span
                            className={cn(
                              'mt-0.5 block text-[11px] leading-snug',
                              active ? 'text-parchment-50/80' : 'text-ink-muted',
                            )}
                          >
                            {link.description}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
