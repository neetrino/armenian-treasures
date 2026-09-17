import Image from 'next/image';
import Link from 'next/link';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';
import type { PublicSiteSettingsDTO } from '@/lib/dto';
import type { SiteLocaleCode } from '@/lib/i18n/locale-config';
import { uiMessage } from '@/lib/i18n/ui-messages';
import { cn } from '@/lib/utils';

const FOOTER_LOGO_SRC = resolvePublicAssetUrl('/images/brand/header-logo.webp');

interface FooterBrandProps {
  settings: PublicSiteSettingsDTO;
  locale?: SiteLocaleCode;
  className?: string;
}

export function FooterBrand({ settings, locale = 'EN', className }: FooterBrandProps) {
  return (
    <div className={cn('flex min-w-0 max-w-[18.75rem] flex-col', className)}>
      <Link
        href="/"
        className="inline-flex w-fit outline-none"
        aria-label={`${settings.foundationName} — ${uiMessage(locale, 'footerHomeAria')}`}
      >
        <Image
          src={FOOTER_LOGO_SRC}
          alt=""
          width={700}
          height={923}
          className="h-auto max-h-[7.5rem] w-auto object-contain sm:max-h-[8.5rem] lg:max-h-[9.5rem]"
        />
      </Link>

      <p className="mt-6 font-display text-[clamp(0.875rem,0.95vw,0.9375rem)] italic leading-[1.55] text-surface-body">
        {settings.footerDescription || uiMessage(locale, 'footerBrandDescription')}
      </p>
    </div>
  );
}
