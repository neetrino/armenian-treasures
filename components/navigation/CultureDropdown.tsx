'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { resolveMenuHref, isFormRoute, type MenuNode } from '@/lib/culture-menu';
import { isCultureNavActive, navTriggerClassName } from './nav-styles';
import { useHeaderTheme } from '@/components/layout/header-theme';
import { cn } from '@/lib/utils';
import { navItemInteraction } from '@/components/layout/header-motion';

const ROW_CLASS =
  'flex w-full items-center justify-between gap-2 px-3.5 py-2 text-left text-sm font-normal text-ink transition-colors hover:bg-parchment-200/70';

const PANEL_CLASS =
  'min-w-[14rem] rounded-xl border border-stone-100/80 bg-parchment-100 py-1 shadow-[0_12px_40px_rgba(26,23,20,0.12)]';

interface CultureDropdownProps {
  tree: MenuNode[];
}

export function CultureDropdown({ tree }: CultureDropdownProps) {
  const pathname = usePathname();
  const theme = useHeaderTheme();
  const active = isCultureNavActive(pathname);
  const reduced = useReducedMotion();
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
      <motion.button
        type="button"
        className={navTriggerClassName(active, open, theme)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-current={active ? 'page' : undefined}
        onClick={() => setOpen((value) => !value)}
        {...(reduced ? {} : navItemInteraction)}
      >
        Culture Portal
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex text-bronze-400/80"
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn('absolute left-0 z-[60] mt-1.5 overflow-visible', PANEL_CLASS)}
          >
            <ul className="flex flex-col">
              {tree.map((node) => (
                <CultureDropdownRow key={node.id} node={node} onSelect={() => setOpen(false)} />
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface RowProps {
  node: MenuNode;
  onSelect: () => void;
}

function CultureDropdownRow({ node, onSelect }: RowProps) {
  const href = resolveMenuHref(node);
  const children = (node.children ?? []).filter((child) => child.isActive);
  const hasSubmenu = children.length > 0 && !isFormRoute(node.routeType);

  if (!hasSubmenu) {
    return (
      <li>
        <Link href={href} onClick={onSelect} className={ROW_CLASS}>
          {node.title}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link href={href} onClick={onSelect} className={ROW_CLASS}>
        <span>{node.title}</span>
        <ChevronRight size={16} className="shrink-0 text-ink-muted" aria-hidden />
      </Link>
      <div className="pointer-events-none invisible absolute left-full top-0 z-[70] pl-0.5 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
        <div role="menu" className={PANEL_CLASS}>
          <ul>
            {children.map((child) => (
              <li key={child.id}>
                <Link
                  href={resolveMenuHref(child, node)}
                  onClick={onSelect}
                  className={ROW_CLASS}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
