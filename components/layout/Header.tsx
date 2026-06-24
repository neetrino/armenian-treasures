import { HeaderBar } from './HeaderBar';
import { HeaderThemeProvider } from './header-theme';
import { getMenuTree } from '@/lib/queries/menu';
import { getSiteSettings } from '@/lib/queries/settings';

export async function Header() {
  const [menuTree, settings] = await Promise.all([getMenuTree(), getSiteSettings()]);

  return (
    <HeaderThemeProvider>
      <HeaderBar
        menuTree={menuTree}
        foundationName={settings.foundationName}
        foundationSubtitle={settings.foundationSubtitle}
      />
      <div
        aria-hidden
        className="h-site-header shrink-0"
      />
    </HeaderThemeProvider>
  );
}
