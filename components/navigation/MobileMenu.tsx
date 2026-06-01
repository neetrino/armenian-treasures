'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, Plus, X } from 'lucide-react';
import { ABOUT_TABS, PRIMARY_LINKS } from './primary-links';
import { HeaderSupportCta } from './HeaderSupportCta';
import { useHeaderTheme } from '@/components/layout/header-theme';
import { isAboutNavActive, isCultureNavActive, isNavActive } from './nav-styles';
import {
  isFormRoute,
  resolveMenuHref,
  type MenuNode,
} from '@/lib/culture-menu';
import { cn } from '@/lib/utils';
import { navItemInteraction } from '@/components/layout/header-motion';

interface MobileMenuProps {
  tree: MenuNode[];
}

const MOBILE_LINK =
  'rounded-lg px-3 py-2.5 text-base font-medium text-parchment-100 transition hover:bg-white/8 hover:text-parchment-50';

const MOBILE_LINK_ACTIVE =
  'rounded-lg border-l-2 border-bronze-500 bg-white/5 px-3 py-2.5 text-base font-medium text-parchment-50';

function mobileLinkClass(pathname: string, href: string): string {
  return isNavActive(pathname, href) ? MOBILE_LINK_ACTIVE : MOBILE_LINK;
}

export function MobileMenu({ tree }: MobileMenuProps) {
  const pathname = usePathname();
  const theme = useHeaderTheme();
  const isSolid = theme === 'solid';
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(isAboutNavActive(pathname));
  const [cultureOpen, setCultureOpen] = useState(isCultureNavActive(pathname));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setAboutOpen(isAboutNavActive(pathname));
    setCultureOpen(isCultureNavActive(pathname));
  }, [pathname, open]);

  const close = (): void => setOpen(false);

  return (
    <div className="lg:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-full border transition',
          isSolid
            ? 'border-stone-200 text-ink hover:bg-stone-100'
            : 'border-white/10 text-parchment-50 hover:bg-white/10',
        )}
        aria-label="Open menu"
        aria-expanded={open}
        {...(reduced ? {} : navItemInteraction)}
      >
        <Menu size={20} strokeWidth={1.5} aria-hidden />
      </motion.button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-[#0a0618]/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={close}
              aria-hidden
            />
            <motion.div
              className="fixed right-0 top-0 z-50 flex h-full w-[min(88vw,20rem)] flex-col overflow-y-auto border-l border-white/10 bg-[#12081c]/95 p-5 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:w-80 sm:p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-eyebrow text-bronze-400">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-parchment-50 hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} aria-hidden />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile primary">
                <Link href="/" onClick={close} className={mobileLinkClass(pathname, '/')}>
                  Home
                </Link>

                <div>
                  <button
                    type="button"
                    onClick={() => setAboutOpen((v) => !v)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-medium transition',
                      isAboutNavActive(pathname)
                        ? 'border-l-2 border-bronze-500 bg-white/5 text-parchment-50'
                        : 'text-parchment-100 hover:bg-white/8 hover:text-parchment-50',
                    )}
                    aria-expanded={aboutOpen}
                  >
                    About Us
                    <ChevronDown
                      size={16}
                      className={cn('text-bronze-400 transition-transform', aboutOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  {aboutOpen ? (
                    <ul className="ml-3 mt-1 flex flex-col border-l border-white/10 pl-3">
                      {ABOUT_TABS.map((tab) => (
                        <li key={tab.href}>
                          <Link
                            href={tab.href}
                            onClick={close}
                            className={mobileLinkClass(pathname, tab.href)}
                          >
                            {tab.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setCultureOpen((v) => !v)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-medium transition',
                      isCultureNavActive(pathname)
                        ? 'border-l-2 border-bronze-500 bg-white/5 text-parchment-50'
                        : 'text-parchment-100 hover:bg-white/8 hover:text-parchment-50',
                    )}
                    aria-expanded={cultureOpen}
                  >
                    Culture Portal
                    <ChevronDown
                      size={16}
                      className={cn('text-bronze-400 transition-transform', cultureOpen && 'rotate-180')}
                      aria-hidden
                    />
                  </button>
                  {cultureOpen ? (
                    <ul className="ml-3 mt-1 flex flex-col border-l border-white/10 pl-3">
                      {tree
                        .filter((node) => node.isActive)
                        .map((node) => (
                          <MobileMenuNode key={node.id} node={node} pathname={pathname} onSelect={close} />
                        ))}
                    </ul>
                  ) : null}
                </div>

                {PRIMARY_LINKS.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className={mobileLinkClass(pathname, link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 border-t border-white/10 pt-6">
                <HeaderSupportCta className="w-full justify-center" onNavigate={close} />
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
  pathname: string;
  onSelect: () => void;
}

function MobileMenuNode({ node, pathname, onSelect }: MobileNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const href = resolveMenuHref(node);
  const isForm = isFormRoute(node.routeType);
  const active = isNavActive(pathname, href);

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={href}
          onClick={onSelect}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm',
            active
              ? 'border-l-2 border-bronze-500 bg-white/5 font-medium text-parchment-50'
              : isForm
                ? 'text-bronze-400 hover:bg-white/8'
                : 'text-parchment-200/90 hover:bg-white/8 hover:text-parchment-50',
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
      <div className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-parchment-100">
        <Link
          href={href}
          onClick={onSelect}
          className={active ? 'font-medium text-parchment-50' : 'hover:text-parchment-50'}
        >
          {node.title}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded p-1 text-bronze-400"
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
        <ul className="ml-3 flex flex-col border-l border-white/10 pl-3">
          {(node.children ?? []).map((child) => {
            const childHref = resolveMenuHref(child, node);
            const childIsForm = isFormRoute(child.routeType);
            const childActive = isNavActive(pathname, childHref);
            return (
              <li key={child.id}>
                <Link
                  href={childHref}
                  onClick={onSelect}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                    childActive
                      ? 'font-medium text-parchment-50'
                      : childIsForm
                        ? 'text-bronze-400 hover:bg-white/8'
                        : 'text-parchment-200/80 hover:bg-white/8 hover:text-parchment-50',
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
