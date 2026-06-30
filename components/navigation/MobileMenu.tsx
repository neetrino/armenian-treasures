'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { MegaMenuColumn } from '@/lib/navigation/culture-mega-menu';
import {
  ABOUT_MENU,
  PRIMARY_LINKS,
  navDropdownLinkKey,
  type NavDropdownLink,
} from './primary-links';
import { LanguageSelector } from './LanguageSelector';
import { signOutMemberAction } from '@/app/(public)/profile/actions';
import type { HeaderMemberSummary } from '@/lib/auth/member-session';
import { MobileSectionLink } from './MobileSectionLink';
import {
  isAboutNavActive,
  isCultureNavActive,
  isNavActive,
  isProjectsNavActive,
} from './nav-styles';
import { cn } from '@/lib/utils';
import { navItemInteraction } from '@/components/layout/header-motion';

import type { MenuNode } from '@/lib/culture-menu';

interface MobileMenuProps {
  tree: MenuNode[];
  cultureMegaMenu: MegaMenuColumn[];
  projectsMenu: NavDropdownLink[];
  member: HeaderMemberSummary | null;
}

const MOBILE_SECTION =
  'font-cinzel text-[13px] font-bold uppercase tracking-[0.13em] text-heritage-nav';

const MOBILE_LINK =
  'block py-2.5 font-display text-lg text-[rgba(232,216,155,0.82)] transition hover:text-[#F2DA83]';

const MOBILE_LINK_ACTIVE = 'block py-2.5 font-display text-lg text-heritage-teal';

function mobileLinkClass(pathname: string, href: string): string {
  return isNavActive(pathname, href) ? MOBILE_LINK_ACTIVE : MOBILE_LINK;
}

export function MobileMenu({ tree: _tree, cultureMegaMenu, projectsMenu, member }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [cultureOpen, setCultureOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setCultureOpen(false);
    setProjectsOpen(false);
    setAboutOpen(false);
    setOpenColumn(null);
  }, [pathname]);

  const close = (): void => {
    setOpen(false);
    setCultureOpen(false);
    setProjectsOpen(false);
    setAboutOpen(false);
    setOpenColumn(null);
  };

  return (
    <div className="lg:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center border transition',
          'border-[rgba(214,184,90,0.28)] text-heritage-nav hover:border-[rgba(39,198,200,0.45)] hover:text-heritage-teal',
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
              className="fixed inset-0 z-[1001] bg-[rgba(3,5,4,0.85)] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              aria-hidden
            />
            <motion.div
              className="fixed inset-x-0 top-site-header z-[1002] flex max-h-[calc(100svh-var(--site-header-height))] flex-col overflow-y-auto border-t border-[rgba(214,184,90,0.16)] bg-[rgba(3,5,4,0.98)] px-6 py-7 backdrop-blur-md"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className={MOBILE_SECTION}>Menu</span>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(214,184,90,0.28)] text-heritage-nav hover:text-heritage-teal"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} aria-hidden />
                </button>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                <MobileAccordion
                  label="Cultural Portal"
                  open={cultureOpen}
                  onToggle={() => setCultureOpen((v) => !v)}
                  onLabelClick={() => {
                    close();
                    router.push('/culture');
                  }}
                  active={isCultureNavActive(pathname)}
                >
                  {cultureMegaMenu.map((column) => (
                    <div key={column.heading} className="border-b border-[rgba(214,184,90,0.1)] py-2 last:border-b-0">
                      <div className="flex items-center justify-between gap-2 py-2">
                        <Link
                          href={column.headingHref}
                          onClick={close}
                          className="font-cinzel text-[11px] font-extrabold uppercase tracking-[0.22em] text-heritage-teal no-underline transition-colors hover:text-heritage-champagne"
                        >
                          {column.heading}
                        </Link>
                        <button
                          type="button"
                          className="flex shrink-0 items-center justify-center rounded-sm p-1 text-heritage-teal transition-colors hover:text-heritage-champagne focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[rgba(39,198,200,0.75)]"
                          onClick={() =>
                            setOpenColumn((current) =>
                              current === column.heading ? null : column.heading,
                            )
                          }
                          aria-expanded={openColumn === column.heading}
                          aria-label={`${openColumn === column.heading ? 'Collapse' : 'Expand'} ${column.heading}`}
                        >
                          <ChevronDown
                            size={14}
                            className={cn(
                              'transition-transform',
                              openColumn === column.heading && 'rotate-180',
                            )}
                            aria-hidden
                          />
                        </button>
                      </div>
                      {openColumn === column.heading ? (
                        <ul className="pb-2 pl-1">
                          {column.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={close}
                                className={mobileLinkClass(pathname, item.href)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </MobileAccordion>

                <MobileAccordion
                  label="Upcoming Projects"
                  open={projectsOpen}
                  onToggle={() => setProjectsOpen((v) => !v)}
                  onLabelClick={() => {
                    close();
                    router.push('/projects');
                  }}
                  active={isProjectsNavActive(pathname)}
                >
                  <ul>
                    {projectsMenu.map((item) => (
                      <li key={navDropdownLinkKey(item)}>
                        <Link href={item.href} onClick={close} className={mobileLinkClass(pathname, item.href)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MobileAccordion>

                {PRIMARY_LINKS.map((link) => (
                  <MobileSectionLink
                    key={link.href}
                    href={link.href}
                    homeSectionId={link.homeSectionId}
                    onNavigate={close}
                    className={cn(
                      MOBILE_SECTION,
                      'py-3',
                      isNavActive(pathname, link.href) && 'text-heritage-teal',
                    )}
                  >
                    {link.label}
                  </MobileSectionLink>
                ))}

                <MobileAccordion
                  label="About Us"
                  open={aboutOpen}
                  onToggle={() => setAboutOpen((v) => !v)}
                  onLabelClick={() => {
                    close();
                    router.push('/about/mission');
                  }}
                  active={isAboutNavActive(pathname)}
                >
                  <ul>
                    {ABOUT_MENU.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={close} className={mobileLinkClass(pathname, item.href)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MobileAccordion>
              </nav>

              <div className="mt-6 border-t border-[rgba(214,184,90,0.16)] pt-6 lg:hidden">
                <LanguageSelector className="w-full" />
              </div>

              <div className="mt-6 border-t border-[rgba(214,184,90,0.16)] pt-6">
                {member ? (
                  <div className="flex flex-col gap-3">
                    <p className="font-cinzel text-[11px] font-extrabold uppercase tracking-[0.22em] text-heritage-teal">
                      Account
                    </p>
                    <p className="font-display text-sm text-[rgba(232,216,155,0.82)]">{member.name}</p>
                    <Link href="/profile" onClick={close} className={MOBILE_LINK}>
                      Profile
                    </Link>
                    <form action={signOutMemberAction}>
                      <button type="submit" className={cn(MOBILE_LINK, 'text-left')}>
                        Sign out
                      </button>
                    </form>
                  </div>
                ) : (
                  <Link href="/login" onClick={close} className={MOBILE_LINK}>
                    Sign in
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface MobileAccordionProps {
  label: string;
  open: boolean;
  onToggle: () => void;
  onLabelClick?: () => void;
  active: boolean;
  children: React.ReactNode;
}

function MobileAccordion({
  label,
  open,
  onToggle,
  onLabelClick,
  active,
  children,
}: MobileAccordionProps) {
  return (
    <div className="border-b border-[rgba(214,184,90,0.1)]">
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={onLabelClick ?? onToggle}
          className={cn(
            'min-w-0 flex-1 py-3 text-left',
            MOBILE_SECTION,
            active && 'text-heritage-teal',
          )}
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-heritage-nav hover:text-heritage-teal"
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${label}`}
        >
          <ChevronDown
            size={16}
            className={cn('opacity-70 transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </button>
      </div>
      {open ? <div className="pb-3 pl-1">{children}</div> : null}
    </div>
  );
}
