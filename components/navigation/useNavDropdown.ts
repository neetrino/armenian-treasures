'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const CLOSE_DELAY_MS = 120;

export function useNavDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close();
    };

    const onPointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target)) close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open, close]);

  const cancelClose = useCallback((): void => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const scheduleClose = useCallback((): void => {
    cancelClose();
    closeTimer.current = setTimeout(close, CLOSE_DELAY_MS);
  }, [cancelClose, close]);

  const onMouseEnter = useCallback((): void => {
    cancelClose();
    openMenu();
  }, [cancelClose, openMenu]);

  const onMouseLeave = useCallback((): void => {
    scheduleClose();
  }, [scheduleClose]);

  return {
    open,
    setOpen,
    close,
    openMenu,
    toggle,
    containerRef,
    onMouseEnter,
    onMouseLeave,
    scheduleClose,
    cancelClose,
  };
}
