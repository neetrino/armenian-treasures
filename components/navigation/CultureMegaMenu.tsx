'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { CULTURE_MEGA_MENU } from '@/lib/navigation/culture-mega-menu';
import { NavDropdownArrow } from '@/components/navigation/NavDropdownArrow';
import { NavDropdownPortal } from '@/components/navigation/NavDropdownPortal';
import {
  isCultureNavActive,
  MEGA_MENU_HEADING,
  MEGA_MENU_ICON,
  MEGA_MENU_ITEM,
  MEGA_MENU_PANEL,
  navItemClassName,
} from '@/components/navigation/nav-styles';
import { useNavDropdown } from '@/components/navigation/useNavDropdown';
import { cn } from '@/lib/utils';

export function CultureMegaMenu() {
  const pathname = usePathname();
  const active = isCultureNavActive(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const { open, toggle, close, containerRef, onMouseEnter, onMouseLeave } = useNavDropdown();

  const panelId = 'culture-mega-menu-panel';

  return (
    <div
      ref={containerRef}
      className="relative flex h-full items-center"
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
        onClick={toggle}
      >
        Cultural Portal
        <NavDropdownArrow open={open} />
      </button>

      <NavDropdownPortal open={open}>
        <div
          className="fixed inset-x-0 top-[var(--site-header-height)] z-[1001] flex justify-center px-6"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            ref={panelRef}
            id={panelId}
            role="menu"
            className={cn(MEGA_MENU_PANEL, 'w-[min(920px,calc(100vw-80px))]')}
            style={{
              backgroundImage:
                'radial-gradient(circle at 70% 20%, rgba(39, 198, 200, 0.06), transparent 35%)',
            }}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-5">
              {CULTURE_MEGA_MENU.map((column, columnIndex) => (
                <div
                  key={column.heading}
                  className={cn(
                    columnIndex > 0 && 'lg:border-l lg:border-[rgba(214,184,90,0.12)] lg:pl-8',
                  )}
                >
                  <p className={MEGA_MENU_HEADING}>{column.heading}</p>
                  <ul className="flex flex-col">
                    {column.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            role="menuitem"
                            onClick={close}
                            className={MEGA_MENU_ITEM}
                          >
                            <Icon className={MEGA_MENU_ICON} strokeWidth={1.35} aria-hidden />
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
