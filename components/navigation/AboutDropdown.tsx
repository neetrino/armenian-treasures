'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ABOUT_TABS } from './primary-links';
import { cn } from '@/lib/utils';

const ROW_CLASS =
  'flex w-full items-center px-3 py-2 text-left text-sm font-normal text-ink transition-colors hover:bg-parchment-200/70';

const PANEL_CLASS =
  'w-[10.5rem] rounded-xl border border-stone-100/80 bg-parchment-100 py-1 shadow-[0_12px_40px_rgba(26,23,20,0.12)]';

export function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onDoc(event: MouseEvent): void {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  function scheduleClose(): void {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  function cancelClose(): void {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition',
          open ? 'text-bronze-400' : 'text-parchment-200 hover:text-parchment-50',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        About Us
        <ChevronDown size={14} aria-hidden className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn('absolute left-0 z-40 mt-1.5 overflow-visible', PANEL_CLASS)}
          >
            <ul className="flex flex-col">
              {ABOUT_TABS.map((tab) => (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    onClick={() => setOpen(false)}
                    className={ROW_CLASS}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
