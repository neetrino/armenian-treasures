'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/(admin)/admin/(panel)/logout-action';
import { AdminNavContent } from '@/components/admin/AdminNavContent';
import { Logo } from '@/components/brand/Logo';
import { ADMIN_PUBLIC_SITE_LINK } from '@/lib/admin/admin-nav-config';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'admin-sidebar-collapsed';
const WIDTH_STORAGE_KEY = 'admin-sidebar-width';
const COLLAPSED_WIDTH = 84;
const DEFAULT_WIDTH = 284;
const MIN_WIDTH = 250;
const MAX_WIDTH = 420;

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === 'true');
      const storedWidth = Number(localStorage.getItem(WIDTH_STORAGE_KEY));
      if (Number.isFinite(storedWidth)) {
        setWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, storedWidth)));
      }
    } catch {
      // ignore
    }
  }, []);

  const persistWidth = useCallback((value: number): void => {
    try {
      localStorage.setItem(WIDTH_STORAGE_KEY, String(value));
    } catch {
      // ignore
    }
  }, []);

  const toggleCollapsed = (): void => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isResizing) return;

    const onMouseMove = (event: MouseEvent): void => {
      const nextWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, event.clientX));
      setWidth(nextWidth);
      if (collapsed) setCollapsed(false);
    };

    const onMouseUp = (): void => {
      setIsResizing(false);
      persistWidth(width);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [collapsed, isResizing, persistWidth, width]);

  const sidebarWidth = collapsed ? COLLAPSED_WIDTH : width;

  return (
    <aside
      className={cn(
        'relative hidden h-full shrink-0 flex-col border-r border-stone-200/70 bg-gradient-to-b from-parchment-100 via-white to-parchment-50/90 shadow-[inset_-1px_0_0_rgba(255,255,255,0.65)] motion-safe:animate-admin-slide-left transition-[width] duration-300 ease-out lg:flex',
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      <div
        className={cn(
          'relative shrink-0 border-b border-stone-200/60 px-4 py-5',
          collapsed ? 'px-3' : 'px-5',
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze-400/40 to-transparent"
          aria-hidden
        />
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'justify-between')}>
          {collapsed ? (
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pomegranate to-pomegranate-600 text-parchment-50 shadow-md shadow-pomegranate/20"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 3 L14 9 H19 L15 12.5 L16.5 19 L12 15.5 L7.5 19 L9 12.5 L5 9 H10 Z" opacity="0.95" />
              </svg>
            </span>
          ) : (
            <Logo variant="on-light" subtitle="Admin Panel" />
          )}
          <button
            type="button"
            onClick={toggleCollapsed}
            className={cn(
              'rounded-xl text-xs font-medium text-ink-muted transition hover:bg-stone-100 hover:text-ink',
              collapsed ? 'hidden' : 'inline-flex items-center gap-2 px-2.5 py-2',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} aria-hidden /> : <ChevronLeft size={16} aria-hidden />}
          </button>
        </div>
        {collapsed ? (
          <button
            type="button"
            onClick={toggleCollapsed}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl p-2.5 text-xs font-medium text-ink-muted transition hover:bg-stone-100 hover:text-ink"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <ChevronRight size={16} aria-hidden />
          </button>
        ) : null}
      </div>

      <div
        className={cn(
          'relative min-h-0 flex-1 overflow-y-auto py-4',
          '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300/70 [&::-webkit-scrollbar-track]:bg-transparent',
          collapsed ? 'px-2' : 'px-3',
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent"
          aria-hidden
        />
        {mounted ? <AdminNavContent collapsed={collapsed} /> : null}
      </div>

      <div
        className={cn(
          'shrink-0 space-y-2 border-t border-stone-200/70 bg-white/50 p-3 backdrop-blur-sm',
          collapsed ? 'px-2' : 'px-3',
        )}
      >
        <Link
          href={ADMIN_PUBLIC_SITE_LINK.href}
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? ADMIN_PUBLIC_SITE_LINK.label : undefined}
          className={cn(
            'flex items-center rounded-xl border border-stone-200/80 bg-white text-sm font-medium text-ink-soft shadow-sm transition hover:border-bronze-300 hover:text-bronze-800',
            collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2.5',
          )}
        >
          <ADMIN_PUBLIC_SITE_LINK.icon size={16} aria-hidden />
          {!collapsed ? <span>View public site</span> : null}
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            title={collapsed ? 'Logout' : undefined}
            aria-label={collapsed ? 'Logout' : undefined}
            className={cn(
              'flex w-full items-center rounded-xl bg-gradient-to-r from-pomegranate to-pomegranate-600 text-sm font-medium text-parchment-50 shadow-sm shadow-pomegranate/20 transition hover:brightness-110',
              collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2.5',
            )}
          >
            <LogOut size={16} aria-hidden />
            {!collapsed ? <span>Logout</span> : null}
          </button>
        </form>

      </div>

      {!collapsed ? (
        <button
          type="button"
          className={cn(
            'absolute inset-y-0 -right-2 z-20 hidden w-3 cursor-col-resize rounded-full bg-transparent transition hover:bg-bronze-200/40 lg:block',
            isResizing ? 'bg-bronze-300/50' : '',
          )}
          onMouseDown={() => setIsResizing(true)}
          aria-label="Resize sidebar"
          title="Resize sidebar"
        />
      ) : null}
    </aside>
  );
}
