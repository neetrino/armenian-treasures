import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: ReactNode;
  wide?: boolean;
  profile?: boolean;
}

function AuthCardOrnament({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="none"
      className={cn('auth-card__ornament', className)}
    >
      <path
        d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

export function AuthCard({ children, wide, profile }: AuthCardProps) {
  return (
    <div className={cn('auth-card', wide && 'auth-card-wide', profile && 'auth-card-profile')}>
      <div aria-hidden className="auth-card__halo" />
      <div aria-hidden className="auth-card__topline" />
      <AuthCardOrnament className="auth-card__ornament--tl" />
      <AuthCardOrnament className="auth-card__ornament--br" />
      <div className="auth-card__inner">{children}</div>
    </div>
  );
}

interface AuthCardIntroProps {
  eyebrow: string;
  title: string;
  lead: string;
  flush?: boolean;
}

export function AuthCardIntro({ eyebrow, title, lead, flush }: AuthCardIntroProps) {
  return (
    <>
      <div className={cn('auth-card-intro', flush && 'auth-card-intro-flush')}>
        <p className="auth-card-eyebrow">{eyebrow}</p>
        <h1 className="auth-card-title">{title}</h1>
        <p className="auth-card-lead">{lead}</p>
      </div>
      <div aria-hidden className="auth-card-divider">
        <span className="auth-card-divider__line" />
        <span className="auth-card-divider__gem" />
        <span className="auth-card-divider__line" />
      </div>
    </>
  );
}
