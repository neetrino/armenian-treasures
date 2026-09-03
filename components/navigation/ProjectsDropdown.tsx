import { NavLink } from '@/components/navigation/NavLink';
import type { NavDropdownLink } from '@/components/navigation/primary-links';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { headerChromeLabel } from '@/lib/i18n/ui-chrome';

interface ProjectsDropdownProps {
  items: NavDropdownLink[];
  locale: SiteLocaleCode;
}

export function ProjectsDropdown({ items: _items, locale }: ProjectsDropdownProps) {
  return <NavLink href="/projects">{headerChromeLabel(locale, 'upcomingProjects')}</NavLink>;
}
