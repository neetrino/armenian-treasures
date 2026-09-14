import { Mail, MapPin, Phone } from 'lucide-react';
import '@/components/cultural-portal-page/cultural-portal-page.css';
import './contact-page.css';
import { ContactForm } from '@/components/forms/ContactForm';
import { KhndzoreskDivider } from '@/components/khndzoresk/KhndzoreskDivider';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { LandingHero } from '@/components/landing/LandingHero';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { getSiteSettings } from '@/lib/queries/settings';
import { getContactsPageContent } from '@/lib/queries/page-content';
import { resolvePageHeroImageUrl } from '@/lib/page-content-images';
import { buildPublicPageMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentSiteLocale();
  return buildPublicPageMetadata({
    title: uiMessage(locale, 'contactMetaTitle'),
    description: uiMessage(locale, 'contactMetaDescription'),
    pathname: '/contacts',
  });
}

async function ContactsPage() {
  const [settings, pageContent, locale] = await Promise.all([
    getSiteSettings(),
    getContactsPageContent(),
    getCurrentSiteLocale(),
  ]);
  const heroImage = resolvePageHeroImageUrl(pageContent.heroImage);

  return (
    <HeritageLandingShell>
      <LandingHero
        locale={locale}
        eyebrow={uiMessage(locale, 'contactEyebrow')}
        title={uiMessage(locale, 'writeToThe')}
        accent={uiMessage(locale, 'foundation')}
        subtitle={uiMessage(locale, 'contactSubtitle')}
        heroImage={heroImage}
        ctas={[
          { label: uiMessage(locale, 'openContactForm'), href: '#contact-form', variant: 'gold' },
          { label: uiMessage(locale, 'aboutTheMission'), href: '/about/mission', variant: 'teal' },
        ]}
      />

      <KhndzoreskDivider />

      <section id="contact-form" className="contact-wrap">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.7fr] lg:gap-10">
          <aside className="contact-direct-card p-6 text-sm text-surface-muted lg:p-9">
            <p className="contact-direct-eyebrow">{uiMessage(locale, 'directLines')}</p>
            <h2 className="contact-direct-title">{uiMessage(locale, 'foundationBrandName')}</h2>
            <p className="contact-direct-subtitle">{uiMessage(locale, 'foundationBrandSubtitle')}</p>
            <ul className="contact-direct-list">
              <li className="contact-direct-item">
                <MapPin size={16} className="contact-direct-icon" aria-hidden />
                {uiMessage(locale, 'contactCityCountry')}
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
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </HeritageLandingShell>
  );
}

export default ContactsPage;
