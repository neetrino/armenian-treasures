import type { ReactNode } from 'react';
import { HeroPage } from '@/components/sections/HeroPage';
import { Container } from '@/components/layout/Container';
import { AboutSidebarNav } from '@/components/navigation/AboutSidebarNav';
import { getAboutContent } from '@/lib/queries/about';

async function AboutLayout({ children }: { children: ReactNode }) {
  const content = await getAboutContent();
  return (
    <>
      <HeroPage
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-24">
        <AboutSidebarNav />
        <div>{children}</div>
      </Container>
    </>
  );
}

export default AboutLayout;
