import type { ReactNode } from 'react';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import '@/components/culture-catalog/culture-catalog-page.css';

interface CultureCatalogShellProps {
  children: ReactNode;
}

export function CultureCatalogShell({ children }: CultureCatalogShellProps) {
  return <HeritageLandingShell>{children}</HeritageLandingShell>;
}
