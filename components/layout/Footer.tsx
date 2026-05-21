import Link from 'next/link';
import { Container } from './Container';
import { Logo } from '@/components/brand/Logo';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getSiteSettings } from '@/lib/queries/settings';

const FOOTER_LINKS_ABOUT = [
  { href: '/about/mission', label: 'Mission' },
  { href: '/about/team', label: 'Team' },
  { href: '/about/career', label: 'Career' },
];

const FOOTER_LINKS_EXPLORE = [
  { href: '/culture', label: 'Culture Portal' },
  { href: '/projects', label: 'Projects' },
  { href: '/map', label: 'Interactive map' },
  { href: '/donators', label: 'Donators' },
];

const FOOTER_LINKS_SUPPORT = [
  { href: '/partnership', label: 'Partnership' },
  { href: '/culture/submit', label: 'Submit a project' },
  { href: '/contacts', label: 'Contact us' },
];

export async function Footer() {
  const settings = await getSiteSettings();
  return (
    <footer className="bg-brand-gradient pt-16 text-parchment-200">
      <Container>
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2 flex flex-col gap-5 max-w-md">
            <Logo
              variant="on-dark"
              title={settings.foundationName}
              subtitle={settings.foundationSubtitle}
            />
            <p className="text-sm leading-relaxed text-parchment-200/90">
              {settings.footerDescription}
            </p>
            <ul className="mt-2 flex flex-col gap-2 text-sm text-parchment-200/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" aria-hidden />
                {settings.address}
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5" aria-hidden />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-parchment-50">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5" aria-hidden />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-parchment-50">
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>
          <FooterColumn title="About" links={FOOTER_LINKS_ABOUT} />
          <FooterColumn title="Explore" links={FOOTER_LINKS_EXPLORE} />
          <FooterColumn title="Support" links={FOOTER_LINKS_SUPPORT} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-parchment-200/70 sm:flex-row sm:items-center">
          <p>{settings.copyrightText}</p>
          <p className="flex items-center gap-2">
            <span>Crafted in Yerevan with archival care.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: { href: string; label: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-eyebrow text-bronze-400">{title}</p>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-parchment-200/90 hover:text-parchment-50">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
