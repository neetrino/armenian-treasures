import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { HeroPage } from '@/components/sections/HeroPage';
import { ContactForm } from '@/components/forms/ContactForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { getSiteSettings } from '@/lib/queries/settings';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Write to the Armenian Treasures foundation — partnerships, press, research and more.',
};

async function ContactsPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <HeroPage
        eyebrow="Contact"
        title="Write to the foundation."
        description="Use the form for partnerships, press, research enquiries or to volunteer. A human reads every message."
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_2fr] lg:py-24">
        <aside className="rounded-2xl border border-dashed border-stone-200 bg-parchment-50 p-6 text-sm text-ink-soft lg:p-8">
          <Eyebrow>Direct lines</Eyebrow>
          <h2 className="mt-3 font-display text-2xl text-ink">{settings.foundationName}</h2>
          <p className="mt-2 text-xs uppercase tracking-eyebrow text-bronze-700">
            {settings.foundationSubtitle}
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-ink-soft">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5" aria-hidden />
              {settings.address}
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5" aria-hidden />
              <a className="hover:text-pomegranate" href={`mailto:${settings.contactEmail}`}>
                {settings.contactEmail}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5" aria-hidden />
              <a className="hover:text-pomegranate" href={`tel:${settings.phone.replace(/\s+/g, '')}`}>
                {settings.phone}
              </a>
            </li>
          </ul>
        </aside>
        <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card lg:p-10">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}

export default ContactsPage;
