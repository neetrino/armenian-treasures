import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { CulturePortalBackground } from '@/components/sections/culture/CulturePortalBackground';
import { CulturePortalCarousel } from '@/components/sections/culture/CulturePortalCarousel';
import { CulturePortalSectionIntro } from '@/components/sections/culture/CulturePortalSectionIntro';
import { filterCulturePortalCarouselNodes } from '@/lib/culture-menu';
import { getMenuTree } from '@/lib/queries/menu';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Culture Portal',
  description: 'Eleven curated domains of Armenian heritage — architecture, manuscripts, music, food and more.',
};

async function CulturePortalLandingPage() {
  const tree = await getMenuTree();
  const visible = filterCulturePortalCarouselNodes(tree);
  return (
    <>
      <HeroPage
        eyebrow="Culture Portal"
        title="The full archive of Armenian heritage."
        description="From cliff-top monasteries to UNESCO-recognised bread — every curated entry into the Armenian cultural world."
      />
      <section className="relative isolate overflow-hidden pb-20 lg:pb-28">
        <CulturePortalBackground />
        <Container className="relative z-10 max-w-[82.5rem]">
          <CulturePortalSectionIntro
            eyebrow="Explore"
            title={
              <>
                Five curated gateways into{' '}
                <span className="italic text-bronze-600">Armenian culture</span>
              </>
            }
            description="Scroll through the living domains of the archive — legends, museums, people, history and culture."
            showCta={false}
          />
          <CulturePortalCarousel nodes={visible} className="mt-10 sm:mt-12" />
        </Container>
      </section>
    </>
  );
}

export default CulturePortalLandingPage;
