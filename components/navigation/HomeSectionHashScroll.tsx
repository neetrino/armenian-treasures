'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  isHomePage,
  parseHomeSectionHash,
  resolveDedicatedSectionRoute,
  scrollToHomeSection,
} from '@/lib/navigation/home-sections';

export function HomeSectionHashScroll() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isHomePage(pathname)) return;

    const scrollFromHash = (): void => {
      const sectionId = parseHomeSectionHash(window.location.hash);
      if (!sectionId) return;

      const dedicatedRoute = resolveDedicatedSectionRoute(sectionId);
      if (dedicatedRoute) {
        router.replace(dedicatedRoute);
        return;
      }

      requestAnimationFrame(() => {
        scrollToHomeSection(sectionId);
      });
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);

    return () => {
      window.removeEventListener('hashchange', scrollFromHash);
    };
  }, [pathname, router]);

  return null;
}
