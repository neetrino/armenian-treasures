import type { ReactNode } from 'react';
import '@/components/khndzoresk/khndzoresk.css';
import '@/app/(public)/login/auth-page.css';

interface AuthPageShellProps {
  children: ReactNode;
}

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <div className="khndzoresk-page auth-shell bg-black">
      <div className="auth-page">{children}</div>
    </div>
  );
}
