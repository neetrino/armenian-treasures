import { getMenuTree } from '@/lib/queries/menu';
import { getSiteSettings } from '@/lib/queries/settings';
import {
  resolveCultureMegaMenu,
  resolveProjectsNavItems,
} from '@/lib/navigation/resolve-header-nav';
import { HeaderBar } from './HeaderBar';
import { HeaderThemeProvider } from './header-theme';

export async function Header() {
  const [menuTree, settings] = await Promise.all([getMenuTree(), getSiteSettings()]);

  const cultureMegaMenu = resolveCultureMegaMenu(menuTree);
  const projectsMenu = resolveProjectsNavItems();

  return (
    <HeaderThemeProvider>
      <HeaderBar
        menuTree={menuTree}
        cultureMegaMenu={cultureMegaMenu}
        projectsMenu={projectsMenu}
        foundationName={settings.foundationName}
        foundationSubtitle={settings.foundationSubtitle}
      />
      <div aria-hidden className="h-site-header shrink-0" />
    </HeaderThemeProvider>
  );
}
