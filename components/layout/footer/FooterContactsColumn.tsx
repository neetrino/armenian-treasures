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
      <p className="font-cinzel text-[10px] font-extrabold uppercase tracking-[0.34em] text-heritage-teal">
        Contact
      </p>

      <ul className="mt-5 flex flex-col gap-3">
        <li>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="font-display text-[clamp(0.875rem,0.95vw,0.9375rem)] leading-[1.4] text-surface-body transition-colors duration-[240ms] hover:text-surface-text"
          >
            {settings.contactEmail}
          </a>
        </li>
        <li>
          <a
            href={toTelHref(settings.phone)}
            className="font-display text-[clamp(0.875rem,0.95vw,0.9375rem)] leading-[1.4] text-surface-body transition-colors duration-[240ms] hover:text-surface-text"
          >
            {settings.phone}
          </a>
        </li>
        <li>
          <p className="font-display text-[clamp(0.875rem,0.95vw,0.9375rem)] leading-[1.4] text-surface-body">
            {settings.address}
          </p>
        </li>
      </ul>
    </section>
  );
}
