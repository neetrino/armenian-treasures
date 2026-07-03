import type { PublicSiteSettingsDTO } from '@/lib/dto';

interface FooterContactsColumnProps {
  settings: PublicSiteSettingsDTO;
}

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export function FooterContactsColumn({ settings }: FooterContactsColumnProps) {
  return (
    <section aria-label="Contact" className="min-w-0">
      <p className="site-footer__column-title">Contact</p>

      <ul className="mt-5 flex flex-col gap-2.5">
        <li>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="site-footer__category-link site-footer__category-link--plain"
          >
            {settings.contactEmail}
          </a>
        </li>
        <li>
          <a
            href={toTelHref(settings.phone)}
            className="site-footer__category-link site-footer__category-link--plain"
          >
            {settings.phone}
          </a>
        </li>
        <li>
          <p className="site-footer__category-link site-footer__category-link--plain site-footer__category-link--static">
            {settings.address}
          </p>
        </li>
      </ul>
    </section>
  );
}
