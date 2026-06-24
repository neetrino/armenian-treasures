'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NavDropdownArrow } from '@/components/navigation/NavDropdownArrow';
import { NavDropdownPortal } from '@/components/navigation/NavDropdownPortal';
import {
  navItemClassName,
  SIMPLE_DROPDOWN_ITEM,
  SIMPLE_DROPDOWN_PANEL,
} from '@/components/navigation/nav-styles';
import { useNavDropdown } from '@/components/navigation/useNavDropdown';
import type { NavDropdownLink } from '@/components/navigation/primary-links';

interface SimpleDropdownProps {
  label: string;
  items: NavDropdownLink[];
  isActive: (pathname: string) => boolean;
  menuId: string;
}

export function SimpleDropdown({ label, items, isActive, menuId }: SimpleDropdownProps) {
  const pathname = usePathname();
  const active = isActive(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [panelStyle, setPanelStyle] = useState<{ left: number } | null>(null);
  const { open, toggle, close, containerRef, onMouseEnter, onMouseLeave } = useNavDropdown();

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = (): void => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPanelStyle({ left: rect.left + rect.width / 2 });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', updatePosition, { passive: true });
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open]);

  const panelId = `${menuId}-panel`;

  return (
    <div
      ref={containerRef}
      className="relative flex h-full items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        className={navItemClassName(active, open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        aria-current={active ? 'page' : undefined}
        onClick={toggle}
      >
        {label}
        <NavDropdownArrow open={open} />
      </button>

      <NavDropdownPortal open={open && panelStyle !== null}>
        <div
          id={panelId}
          role="menu"
          className={SIMPLE_DROPDOWN_PANEL}
          style={{
            position: 'fixed',
            top: 'var(--site-header-height)',
            left: panelStyle?.left ?? 0,
            transform: 'translateX(-50%)',
            zIndex: 1001,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} role="menuitem" onClick={close} className={SIMPLE_DROPDOWN_ITEM}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </NavDropdownPortal>
    </div>
  );
}
