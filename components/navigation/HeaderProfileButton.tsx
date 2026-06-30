'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import { signOutMemberAction } from '@/app/(public)/profile/actions';
import { cn } from '@/lib/utils';
import type { HeaderMemberSummary } from '@/lib/auth/member-session';

interface HeaderProfileButtonProps {
  member: HeaderMemberSummary | null;
}

const ICON_BUTTON =
  'inline-flex h-9 w-9 items-center justify-center border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]';

const ICON_BUTTON_GUEST =
  'border-[var(--surface-border)] text-[var(--nav-text)] hover:border-[rgba(39,198,200,0.45)] hover:text-[var(--nav-text-active)]';

const ICON_BUTTON_MEMBER =
  'border-[rgba(39,198,200,0.35)] bg-[rgba(39,198,200,0.08)] text-heritage-teal hover:border-[rgba(39,198,200,0.55)] hover:text-[var(--accent-hover)]';

export function HeaderProfileButton({ member }: HeaderProfileButtonProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  if (!member) {
    return (
      <Link
        href="/login"
        className={cn(ICON_BUTTON, ICON_BUTTON_GUEST)}
        aria-label="Sign in"
        title="Sign in"
      >
        <User size={18} strokeWidth={1.5} aria-hidden />
      </Link>
    );
  }

  const handleSignOut = async (): Promise<void> => {
    setSigningOut(true);
    await signOutMemberAction();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(ICON_BUTTON, ICON_BUTTON_MEMBER)}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        title={member.name}
      >
        <User size={18} strokeWidth={1.5} aria-hidden />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[1003] min-w-[12rem] overflow-hidden rounded-md border border-surface bg-[var(--profile-menu-bg)] py-1 shadow-[var(--shadow-dropdown)] backdrop-blur-md"
        >
          <div className="border-b border-surface px-3 py-2.5">
            <p className="truncate font-display text-sm text-surface">{member.name}</p>
            <p className="truncate text-xs text-surface-subtle">{member.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 font-display text-sm text-surface transition hover:bg-[rgba(201,168,76,0.08)] hover:text-[var(--accent-hover)]"
          >
            Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            disabled={signingOut}
            onClick={() => void handleSignOut()}
            className="block w-full px-3 py-2.5 text-left font-display text-sm text-surface transition hover:bg-[rgba(201,168,76,0.08)] hover:text-[var(--accent-hover)] disabled:opacity-60"
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
