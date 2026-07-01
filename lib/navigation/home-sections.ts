export const HOME_SECTION_IDS = {
  virtualMuseum: 'virtual-museum',
  culturalPortal: 'cultural',
  heritageMap: 'map',
  upcomingProjects: 'projects',
  partnership: 'partners',
  donators: 'donors',
  aboutUs: 'about',
} as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[keyof typeof HOME_SECTION_IDS];

const DEDICATED_SECTION_ROUTES: Partial<Record<HomeSectionId, string>> = {
  [HOME_SECTION_IDS.heritageMap]: '/map',
  [HOME_SECTION_IDS.virtualMuseum]: '/virtual-museum',
  [HOME_SECTION_IDS.upcomingProjects]: '/projects',
  [HOME_SECTION_IDS.partnership]: '/partnership',
};

export function resolveDedicatedSectionRoute(sectionId: HomeSectionId): string | null {
  return DEDICATED_SECTION_ROUTES[sectionId] ?? null;
}

export function isHomePage(pathname: string): boolean {
  return pathname === '/';
}

export function buildHomeSectionHref(sectionId: HomeSectionId): string {
  return resolveDedicatedSectionRoute(sectionId) ?? `/#${sectionId}`;
}

const HOME_SECTION_ID_SET = new Set<string>(Object.values(HOME_SECTION_IDS));

export function parseHomeSectionHash(hash: string): HomeSectionId | null {
  const sectionId = hash.replace(/^#/, '');
  return HOME_SECTION_ID_SET.has(sectionId) ? (sectionId as HomeSectionId) : null;
}

export function scrollToHomeSection(sectionId: HomeSectionId): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const headerHeight = parseSiteHeaderHeight();
  const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });

  return true;
}

function parseSiteHeaderHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height').trim();
  if (!raw) return 68;

  if (raw.endsWith('rem')) {
    const rem = parseFloat(raw);
    const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return rem * rootSize;
  }

  return parseFloat(raw) || 68;
}
