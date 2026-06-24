'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  isHomePage,
  parseHomeSectionHash,
  scrollToHomeSection,
} from '@/lib/navigation/home-sections';

export function HomeSectionHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isHomePage(pathname)) return;

    const scrollFromHash = (): void => {
      const sectionId = parseHomeSectionHash(window.location.hash);
      if (!sectionId) return;

      requestAnimationFrame(() => {
        scrollToHomeSection(sectionId);
      });
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);

    return () => {
      window.removeEventListener('hashchange', scrollFromHash);
    };
  }, [pathname]);

  return null;
}
