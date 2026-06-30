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
  'inline-flex h-9 w-9 items-center justify-center border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(9,9,9,0.9)]';

const ICON_BUTTON_GUEST =
  'border-[rgba(214,184,90,0.28)] text-heritage-nav hover:border-[rgba(39,198,200,0.45)] hover:text-heritage-teal';

const ICON_BUTTON_MEMBER =
  'border-[rgba(39,198,200,0.35)] bg-[rgba(39,198,200,0.08)] text-heritage-teal hover:border-[rgba(39,198,200,0.55)] hover:text-[#F2DA83]';

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
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[1003] min-w-[12rem] overflow-hidden rounded-md border border-[rgba(214,184,90,0.22)] bg-[rgba(9,9,9,0.98)] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          <div className="border-b border-[rgba(214,184,90,0.14)] px-3 py-2.5">
            <p className="truncate font-display text-sm text-[rgba(232,216,155,0.92)]">{member.name}</p>
            <p className="truncate text-xs text-[rgba(232,216,155,0.55)]">{member.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 font-display text-sm text-[rgba(232,216,155,0.82)] transition hover:bg-[rgba(201,168,76,0.08)] hover:text-[#F2DA83]"
          >
            Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            disabled={signingOut}
            onClick={() => void handleSignOut()}
            className="block w-full px-3 py-2.5 text-left font-display text-sm text-[rgba(232,216,155,0.82)] transition hover:bg-[rgba(201,168,76,0.08)] hover:text-[#F2DA83] disabled:opacity-60"
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
