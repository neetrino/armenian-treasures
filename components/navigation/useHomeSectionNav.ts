'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import {
  isHomePage,
  scrollToHomeSection,
  type HomeSectionId,
} from '@/lib/navigation/home-sections';

interface UseHomeSectionNavOptions {
  homeSectionId?: HomeSectionId;
  fallbackHref?: string;
  onScroll?: () => void;
}

export function useHomeSectionNav({
  homeSectionId,
  fallbackHref,
  onScroll,
}: UseHomeSectionNavOptions = {}) {
  const pathname = usePathname();
  const router = useRouter();

  const tryScrollToHomeSection = (): boolean => {
    if (!homeSectionId || !isHomePage(pathname)) return false;

    scrollToHomeSection(homeSectionId);
    onScroll?.();
    return true;
  };

  const tryNavigateToFallback = (): boolean => {
    if (isHomePage(pathname) || !fallbackHref) return false;

    router.push(fallbackHref);
    onScroll?.();
    return true;
  };

  const handleHomeSectionClick = (event: MouseEvent<HTMLElement>): void => {
    if (!tryScrollToHomeSection()) return;
    event.preventDefault();
  };

  const handleSectionTriggerClick = (): boolean => {
    if (tryScrollToHomeSection()) return true;
    return tryNavigateToFallback();
  };

  return {
    pathname,
    isOnHomePage: isHomePage(pathname),
    tryScrollToHomeSection,
    tryNavigateToFallback,
    handleHomeSectionClick,
    handleSectionTriggerClick,
  };
}
