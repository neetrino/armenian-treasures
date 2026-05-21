'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Plus } from 'lucide-react';
import { resolveMenuHref, isFormRoute, type MenuNode } from '@/lib/culture-menu';
import { cn } from '@/lib/utils';

interface CultureDropdownProps {
  tree: MenuNode[];
}

export function CultureDropdown({ tree }: CultureDropdownProps) {
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
          'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-parchment-200 transition hover:text-parchment-50',
          open && 'text-parchment-50',
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        Culture Portal
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
            className="absolute left-1/2 z-40 mt-3 w-[min(680px,90vw)] -translate-x-1/2 rounded-2xl border border-stone-100 bg-white p-6 shadow-card-hover"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {tree.map((node) => (
                <CultureDropdownSection key={node.id} node={node} onSelect={() => setOpen(false)} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface SectionProps {
  node: MenuNode;
  onSelect: () => void;
}

function CultureDropdownSection({ node, onSelect }: SectionProps) {
  const href = resolveMenuHref(node);
  if (isFormRoute(node.routeType)) {
    return (
      <Link
        href={href}
        onClick={onSelect}
        className="flex items-start gap-3 rounded-lg p-2 text-sm text-pomegranate transition hover:bg-pomegranate/5"
      >
        <Plus size={16} className="mt-0.5" aria-hidden />
        <span>
          <span className="block font-medium">{node.title}</span>
          {node.description ? (
            <span className="block text-xs text-ink-muted">{node.description}</span>
          ) : null}
        </span>
      </Link>
    );
  }
  const children = node.children ?? [];
  return (
    <div>
      <Link
        href={href}
        onClick={onSelect}
        className="block font-display text-lg text-ink transition hover:text-pomegranate"
      >
        {node.title}
      </Link>
      {node.description ? (
        <p className="mt-0.5 text-xs text-ink-muted">{node.description}</p>
      ) : null}
      {children.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {children.map((child) => {
            const childHref = resolveMenuHref(child, node);
            const isForm = isFormRoute(child.routeType);
            return (
              <li key={child.id}>
                <Link
                  href={childHref}
                  onClick={onSelect}
                  className={cn(
                    'group/link flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition',
                    isForm
                      ? 'text-pomegranate hover:bg-pomegranate/5'
                      : 'text-ink-soft hover:bg-parchment-200 hover:text-ink',
                  )}
                >
                  {isForm ? <Plus size={14} aria-hidden /> : null}
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
