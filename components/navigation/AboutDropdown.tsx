import { SimpleDropdown } from '@/components/navigation/SimpleDropdown';
import { ABOUT_MENU } from '@/components/navigation/primary-links';
import { isAboutNavActive } from '@/components/navigation/nav-styles';
import { buildHomeSectionHref, HOME_SECTION_IDS } from '@/lib/navigation/home-sections';

export function AboutDropdown() {
  return (
    <SimpleDropdown
      label="About Us"
      items={ABOUT_MENU}
      isActive={isAboutNavActive}
      menuId="about-menu"
      homeSectionId={HOME_SECTION_IDS.aboutUs}
      fallbackHref={buildHomeSectionHref(HOME_SECTION_IDS.aboutUs)}
    />
  );
}
