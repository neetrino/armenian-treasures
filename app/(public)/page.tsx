import type { Metadata } from 'next';

import { HeroHome } from '@/components/sections/HeroHome';
import { HomeHeritageSections } from '@/components/sections/HomeHeritageSections';
import { getHeaderAccountSummary } from '@/lib/auth/header-session';
import { getHomeContent } from '@/lib/queries/home';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent();
  return buildPublicPageMetadata({
    title: 'Armenian Treasures — Cultural Heritage Foundation',
    description: home.heroDescription,
    pathname: '/',
  });
}

function isLoginLikeHref(href: string): boolean {
  const path = href.split('?')[0]?.toLowerCase() ?? '';
  return path === '/login' || path === '/register' || path.endsWith('/login') || path.endsWith('/register');
}

async function HomePage() {
  const [home, account] = await Promise.all([getHomeContent(), getHeaderAccountSummary()]);
  const hideLoginCta = Boolean(account) && isLoginLikeHref(home.secondaryCtaUrl);

  return (
    <>
      <HeroHome
        badge={home.heroBadge}
        title={home.heroTitle}
        highlight={home.heroHighlight}
        subtitle={home.heroSubtitle}
        tagline={home.heroTagline}
        description={home.heroDescription}
        primaryCtaText={home.primaryCtaText}
        primaryCtaUrl={home.primaryCtaUrl}
        secondaryCtaText={home.secondaryCtaText}
        secondaryCtaUrl={home.secondaryCtaUrl}
        stats={home.stats}
        heroImage={home.heroImage}
        heroMobileImage={home.heroMobileImage}
        hideSecondaryCta={hideLoginCta}
      />

      <HomeHeritageSections />
    </>
  );
}

export default HomePage;
