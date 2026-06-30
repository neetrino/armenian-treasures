import type { ReactNode } from 'react';
import { AuthGridBackground } from '@/components/auth/AuthGridBackground';
import '@/components/khndzoresk/khndzoresk.css';
import '@/app/(public)/login/auth-page.css';

interface AuthPageShellProps {
  children: ReactNode;
}

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <div className="khndzoresk-page auth-shell">
      <AuthGridBackground />
      <div aria-hidden className="auth-shell-glow" />
      <div className="auth-page">{children}</div>
    </div>
  );
}
