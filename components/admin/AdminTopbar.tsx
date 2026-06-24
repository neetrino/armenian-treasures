import Link from 'next/link';
import { ExternalLink, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/(admin)/admin/(panel)/logout-action';
import type { AdminContext } from '@/lib/auth/require-admin';

interface AdminTopbarProps {
  title: string;
  user: AdminContext;
}

export function AdminTopbar({ title, user: _user }: AdminTopbarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 bg-white px-6 py-4">
      <div>
        <p className="text-[11px] uppercase tracking-eyebrow text-bronze-700">Admin</p>
        <h1 className="font-display text-2xl text-ink">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-pomegranate hover:text-pomegranate"
        >
          <ExternalLink size={14} aria-hidden /> View site
        </Link>
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-pomegranate px-3 py-1.5 text-xs font-medium text-parchment-50 transition hover:bg-pomegranate-600"
            >
              <LogOut size={14} aria-hidden /> Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
