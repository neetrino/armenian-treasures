'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AdminNavContent } from '@/components/admin/AdminNavContent';
import { Logo } from '@/components/brand/Logo';
import { ADMIN_PUBLIC_SITE_LINK } from '@/lib/admin/admin-nav-config';

interface AdminMobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function AdminMobileNav({ open, onClose }: AdminMobileNavProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.aside
            className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-gradient-to-b from-parchment-50 via-white to-parchment-100 shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-stone-200/70 px-5 py-4">
              <Logo variant="on-light" subtitle="Admin Panel" />
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-stone-200 bg-white p-2 text-ink-soft shadow-sm transition hover:text-ink"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <AdminNavContent onNavigate={onClose} />
            </div>

            <div className="border-t border-stone-200/70 bg-white/60 p-4 backdrop-blur-sm">
              <Link
                href={ADMIN_PUBLIC_SITE_LINK.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-soft shadow-sm transition hover:border-bronze-300 hover:text-bronze-800"
              >
                <ADMIN_PUBLIC_SITE_LINK.icon size={16} aria-hidden />
                View public site
              </Link>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
