import { Container } from './Container';
import { Logo } from '@/components/brand/Logo';
import { DesktopNav } from '@/components/navigation/DesktopNav';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { getMenuTree } from '@/lib/queries/menu';
import { getSiteSettings } from '@/lib/queries/settings';

export async function Header() {
  const [menuTree, settings] = await Promise.all([getMenuTree(), getSiteSettings()]);
  return (
    <header className="sticky top-0 z-40 bg-brand-gradient text-parchment-50 shadow-card">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Logo
          variant="on-dark"
          title={settings.foundationName}
          subtitle={settings.foundationSubtitle}
        />
        <DesktopNav menuTree={menuTree} />
        <MobileMenu tree={menuTree} />
      </Container>
    </header>
  );
}
