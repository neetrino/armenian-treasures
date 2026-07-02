import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import '@/components/khndzoresk/khndzoresk.css';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import './contact-page.css';
import { ContactForm } from '@/components/forms/ContactForm';
import { KhndzoreskParticles } from '@/components/khndzoresk/KhndzoreskParticles';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeroImageOverlay } from '@/components/sections/hero/HeroImageOverlay';
import { getSiteSettings } from '@/lib/queries/settings';
import { getContactsPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export const metadata = buildPublicPageMetadata({
  title: 'Contact us',
  description: 'Write to the Armenian Treasures foundation — partnerships, press, research and more.',
  pathname: '/contacts',
});

async function ContactsPage() {
  const [settings, pageContent] = await Promise.all([getSiteSettings(), getContactsPageContent()]);
  const heroImage = resolvePageHeroImageUrl(pageContent.heroImage);
  return (
    <div className="khndzoresk-page">
      <KhndzoreskParticles />

      <div className="hero cultural-portal-hero">
        {heroImage ? <HeroImageOverlay imageUrl={heroImage} className="hero-img-overlay" /> : null}
        <div className="hero-bg" />
        <div className="hero-grain" />
        <svg className="corner-ornament" viewBox="0 0 48 48" fill="none" aria-hidden>
          <path d="M48 0 Q40 0 40 8 L40 40 Q40 48 32 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M44 4 Q38 4 38 10 L38 38 Q38 44 32 44" stroke="currentColor" strokeWidth=".6" fill="none" opacity=".5" />
        </svg>
        <div className="hero-content">
          <p className="hero-eyebrow reveal">CONTACT</p>
          <h1 className="reveal">
            WRITE TO THE
            <span>FOUNDATION</span>
          </h1>
          <p className="hero-sub reveal">
            Reach us for partnerships, press requests, research collaboration, or volunteer opportunities.
          </p>
          <div className="hero-btns reveal">
            <a href="#contact-form" className="btn-gold">
              Open Contact Form
            </a>
            <Link href="/about/mission" className="btn-teal">
              About The Mission
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </div>

      <KhndzoreskDivider />

      <section id="contact-form" className="contact-wrap">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.7fr] lg:gap-10">
          <aside className="contact-direct-card p-6 text-sm text-surface-muted lg:p-9">
            <p className="contact-direct-eyebrow">
              Direct lines
            </p>
            <h2 className="contact-direct-title">
              {settings.foundationName}
            </h2>
            <p className="contact-direct-subtitle">
              {settings.foundationSubtitle}
            </p>
            <ul className="contact-direct-list">
              <li className="contact-direct-item">
                <MapPin size={16} className="contact-direct-icon" aria-hidden />
                {settings.address}
              </li>
              <li className="contact-direct-item">
                <Mail size={16} className="contact-direct-icon" aria-hidden />
                <a className="transition-colors hover:text-heritage-gold" href={`mailto:${settings.contactEmail}`}>
                  {settings.contactEmail}
                </a>
              </li>
              <li className="contact-direct-item">
                <Phone size={16} className="contact-direct-icon" aria-hidden />
                <a className="transition-colors hover:text-heritage-gold" href={`tel:${settings.phone.replace(/\s+/g, '')}`}>
                  {settings.phone}
                </a>
              </li>
            </ul>
          </aside>

          <div className="contact-form-shell">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactsPage;
