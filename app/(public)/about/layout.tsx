import type { ReactNode } from 'react';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import './about-page.css';
import { AboutSidebarNav } from '@/components/navigation/AboutSidebarNav';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { getAboutContent } from '@/lib/queries/about';

async function AboutLayout({ children }: { children: ReactNode }) {
  const content = await getAboutContent();
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />

      <div className="hero cultural-portal-hero about-portal-hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
          <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
        </svg>
        <div className="hero-content">
          <p className="hero-eyebrow reveal">{content.heroEyebrow}</p>
          <h1 className="reveal">
            {content.heroTitle}
            <span>ABOUT US</span>
          </h1>
          <p className="hero-sub reveal">{content.heroDescription}</p>
          <div className="hero-btns reveal">
            <a href="#about-main" className="btn-gold">
              Explore Sections
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>

      <KhndzoreskDivider />

      <section
        id="about-main"
        className="relative z-[1] mx-auto w-full max-w-[1200px] px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20"
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
          <AboutSidebarNav />
          <div className="mx-auto mt-8 w-full max-w-[1000px]">{children}</div>
        </div>
      </section>
    </div>
  );
}

export default AboutLayout;
