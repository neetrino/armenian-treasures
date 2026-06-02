import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { FooterDivider } from '@/components/layout/footer/FooterDivider';
import type { PublicSiteSettingsDTO } from '@/lib/dto';
import { cn } from '@/lib/utils';

interface FooterBrandProps {
  settings: PublicSiteSettingsDTO;
  className?: string;
}

export function FooterBrand({ settings, className }: FooterBrandProps) {
  return (
    <div className={cn('flex min-w-0 max-w-sm flex-col gap-5', className)}>
      <Logo
        variant="on-dark"
        title={settings.foundationName}
        subtitle={settings.foundationSubtitle}
      />
      <FooterDivider className="max-w-[12rem]" />
      <p className="text-sm leading-relaxed text-parchment-200/88">{settings.footerDescription}</p>
      <ul className="flex flex-col gap-3 text-sm text-parchment-200/82">
        <li className="flex items-start gap-2.5">
          <MapPin size={15} className="mt-0.5 shrink-0 text-bronze-400/85" aria-hidden />
          <span>{settings.address}</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Mail size={15} className="mt-0.5 shrink-0 text-bronze-400/85" aria-hidden />
          <a
            href={`mailto:${settings.contactEmail}`}
            className="transition hover:text-parchment-50"
          >
            {settings.contactEmail}
          </a>
        </li>
        <li className="flex items-start gap-2.5">
          <Phone size={15} className="mt-0.5 shrink-0 text-bronze-400/85" aria-hidden />
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="transition hover:text-parchment-50"
          >
            {settings.phone}
          </a>
        </li>
      </ul>
    </div>
  );
}
