'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { HomeSectionId } from '@/lib/navigation/home-sections';
import { useHomeSectionNav } from '@/components/navigation/useHomeSectionNav';

interface MobileSectionLinkProps {
  href: string;
  homeSectionId?: HomeSectionId;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
}

export function MobileSectionLink({
  href,
  homeSectionId,
  className,
  onNavigate,
  children,
}: MobileSectionLinkProps) {
  const { handleHomeSectionClick } = useHomeSectionNav({
    homeSectionId,
    onScroll: onNavigate,
  });

  return (
    <Link href={href} className={className} onClick={handleHomeSectionClick}>
      {children}
    </Link>
  );
}
