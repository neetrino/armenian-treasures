'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Plus, X } from 'lucide-react';
import { ABOUT_TABS, PRIMARY_LINKS } from './primary-links';
import {
  isFormRoute,
  resolveMenuHref,
  type MenuNode,
} from '@/lib/culture-menu';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  tree: MenuNode[];
}

export function MobileMenu({ tree }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-parchment-50 hover:bg-white/10"
        aria-label="Open menu"
      >
        <Menu size={20} strokeWidth={1.5} aria-hidden />
      </button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-midnight-900/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-[88vw] max-w-sm overflow-y-auto bg-parchment-50 p-6 shadow-card-hover"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="eyebrow">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-stone-100"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base text-ink hover:bg-stone-100"
                >
                  Home
                </Link>
                <p className="mt-2 px-3 text-xs uppercase tracking-eyebrow text-bronze-700">
                  About Us
                </p>
                <ul className="flex flex-col">
                  {ABOUT_TABS.map((tab) => (
                    <li key={tab.href}>
                      <Link
                        href={tab.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-base text-ink-soft hover:bg-stone-100 hover:text-ink"
                      >
                        {tab.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {PRIMARY_LINKS.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base text-ink hover:bg-stone-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6">
                <p className="px-3 text-xs uppercase tracking-eyebrow text-bronze-700">
                  Culture Portal
                </p>
                <ul className="mt-2 flex flex-col">
                  {tree
                    .filter((node) => node.isActive)
                    .map((node) => (
                      <MobileMenuNode key={node.id} node={node} onSelect={() => setOpen(false)} />
                    ))}
                </ul>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface MobileNodeProps {
  node: MenuNode;
  onSelect: () => void;
}

function MobileMenuNode({ node, onSelect }: MobileNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const href = resolveMenuHref(node);
  const isForm = isFormRoute(node.routeType);

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={href}
          onClick={onSelect}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2.5 text-base',
            isForm
              ? 'text-pomegranate hover:bg-pomegranate/5'
              : 'text-ink hover:bg-stone-100',
          )}
        >
          {isForm ? <Plus size={16} aria-hidden /> : null}
          {node.title}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <div className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base text-ink hover:bg-stone-100">
        <Link href={href} onClick={onSelect}>
          {node.title}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded p-1 text-ink-muted"
          aria-label={expanded ? `Collapse ${node.title}` : `Expand ${node.title}`}
          aria-expanded={expanded}
        >
          <Plus
            size={16}
            aria-hidden
            className={cn('transition-transform', expanded && 'rotate-45')}
          />
        </button>
      </div>
      {expanded ? (
        <ul className="ml-4 mt-1 flex flex-col">
          {(node.children ?? []).map((child) => {
            const childHref = resolveMenuHref(child, node);
            const childIsForm = isFormRoute(child.routeType);
            return (
              <li key={child.id}>
                <Link
                  href={childHref}
                  onClick={onSelect}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                    childIsForm
                      ? 'text-pomegranate hover:bg-pomegranate/5'
                      : 'text-ink-soft hover:bg-stone-100 hover:text-ink',
                  )}
                >
                  {childIsForm ? <Plus size={14} aria-hidden /> : null}
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}
