import type { ReactNode } from 'react';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import '@/components/khndzoresk/khndzoresk.css';

interface HeritageLandingShellProps {
  children: ReactNode;
  svgDefs?: ReactNode;
}

/** Shared Khndzoresk-style page shell: dark canvas, particles, section typography. */
export function HeritageLandingShell({ children, svgDefs }: HeritageLandingShellProps) {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      {svgDefs}
      {children}
    </div>
  );
}
