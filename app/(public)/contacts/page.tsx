import { Mail, MapPin, Phone } from 'lucide-react';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import './contact-page.css';
import { ContactForm } from '@/components/forms/ContactForm';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
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
    <HeritageLandingShell>
      <LandingHero
        eyebrow="CONTACT"
        title="WRITE TO THE"
        accent="FOUNDATION"
        subtitle="Reach us for partnerships, press requests, research collaboration, or volunteer opportunities."
        heroImage={heroImage}
        ctas={[
          { label: 'Open Contact Form', href: '#contact-form', variant: 'gold' },
          { label: 'About The Mission', href: '/about/mission', variant: 'teal' },
        ]}
      />

      <KhndzoreskDivider />

      <section id="contact-form" className="contact-wrap">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.7fr] lg:gap-10">
          <aside className="contact-direct-card p-6 text-sm text-surface-muted lg:p-9">
            <p className="contact-direct-eyebrow">Direct lines</p>
            <h2 className="contact-direct-title">{settings.foundationName}</h2>
            <p className="contact-direct-subtitle">{settings.foundationSubtitle}</p>
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
    </HeritageLandingShell>
  );
}

export default ContactsPage;
