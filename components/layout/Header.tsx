import { getMenuTree } from '@/lib/queries/menu';
import { getSiteSettings } from '@/lib/queries/settings';
import {
  resolveCultureMegaMenu,
  resolveProjectsNavItems,
} from '@/lib/navigation/resolve-header-nav';
import { getHeaderAccountSummary } from '@/lib/auth/header-session';
import { HeaderBar } from './HeaderBar';
import { HeaderThemeProvider } from './header-theme';

export async function Header() {
  const [menuTree, settings, account] = await Promise.all([
    getMenuTree(),
    getSiteSettings(),
    getHeaderAccountSummary(),
  ]);

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
        enabledLocales={settings.enabledLocales}
        account={account}
      />
      <div aria-hidden className="h-site-header shrink-0" />
    </HeaderThemeProvider>
  );
}
