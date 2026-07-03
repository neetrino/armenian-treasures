'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';
import { resolveMenuLucideIcon } from '@/lib/navigation/menu-icons';
import { NavDropdownArrow } from '@/components/navigation/NavDropdownArrow';
import { NavDropdownPortal } from '@/components/navigation/NavDropdownPortal';
import {
  isCultureNavActive,
  MEGA_MENU_HEADING_LINK,
  MEGA_MENU_ICON,
  MEGA_MENU_ITEM,
  MEGA_MENU_PANEL,
  navItemClassName,
} from '@/components/navigation/nav-styles';
import { useNavDropdown } from '@/components/navigation/useNavDropdown';
import { cn } from '@/lib/utils';

export function CultureMegaMenu({ columns }: { columns: MegaMenuColumn[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = isCultureNavActive(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const { open, close, containerRef, onMouseEnter, onMouseLeave } = useNavDropdown({
    panelRef,
  });
  const handleTriggerClick = (): void => {
    close();
    router.push('/culture');
  };

  const panelId = 'culture-mega-menu-panel';

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={navItemClassName(active, open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        aria-current={active ? 'page' : undefined}
        onClick={handleTriggerClick}
      >
        Cultural Portal
        <NavDropdownArrow open={open} />
      </button>

      <NavDropdownPortal open={open}>
        <div
          ref={panelRef}
          className="fixed inset-x-0 top-[var(--site-header-height)] z-[1001] flex justify-center px-6"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            id={panelId}
            role="menu"
            className={cn(MEGA_MENU_PANEL, 'w-[min(1180px,calc(100vw-48px))]')}
            style={{
              backgroundImage:
                'radial-gradient(circle at 70% 20%, rgba(39, 198, 200, 0.06), transparent 35%)',
            }}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 lg:gap-x-0 lg:gap-y-5">
              {columns.map((column, columnIndex) => (
                <div
                  key={column.heading}
                  className={cn(
                    'px-[18px]',
                    columnIndex > 0 && 'lg:border-l lg:border-[rgba(201,168,76,0.08)]',
                  )}
                >
                  <Link
                    href={column.headingHref}
                    role="menuitem"
                    onClick={close}
                    className={MEGA_MENU_HEADING_LINK}
                  >
                    {column.heading}
                  </Link>
                  <ul className="flex flex-col">
                    {column.items.map((item) => {
                      const Icon = resolveMenuLucideIcon(item.icon);
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            role="menuitem"
                            onClick={close}
                            className={MEGA_MENU_ITEM}
                          >
                            <Icon className={MEGA_MENU_ICON} aria-hidden strokeWidth={1.75} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </NavDropdownPortal>
    </div>
  );
}
