import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeSectionHashScroll } from '@/components/navigation/HomeSectionHashScroll';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';

async function PublicLayout({ children }: { children: ReactNode }) {
  const locale = await getCurrentSiteLocale();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-layout">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-bronze-500 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        {uiMessage(locale, 'skipToContent')}
      </a>
      <Header />
      <HomeSectionHashScroll />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
