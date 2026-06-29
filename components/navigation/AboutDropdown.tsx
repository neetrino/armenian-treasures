import { SimpleDropdown } from '@/components/navigation/SimpleDropdown';
import { ABOUT_MENU } from '@/components/navigation/primary-links';
import { isAboutNavActive } from '@/components/navigation/nav-styles';

export function AboutDropdown() {
  return (
    <SimpleDropdown
      label="About Us"
      items={ABOUT_MENU}
      isActive={isAboutNavActive}
      menuId="about-menu"
      fallbackHref="/about/mission"
    />
  );
}
