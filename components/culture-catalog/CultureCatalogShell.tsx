import type { ReactNode } from 'react';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import '@/components/culture-catalog/culture-catalog-page.css';

interface CultureCatalogShellProps {
  children: ReactNode;
}

export function CultureCatalogShell({ children }: CultureCatalogShellProps) {
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />
      {children}
    </div>
  );
}
