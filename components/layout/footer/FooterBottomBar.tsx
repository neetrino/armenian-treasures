import Link from 'next/link';
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_SITE_DOMAIN,
} from '@/components/layout/footer/footer-links';
import type { PublicSiteSettingsDTO } from '@/lib/dto';

interface FooterBottomBarProps {
  settings: PublicSiteSettingsDTO;
}

export function FooterBottomBar({ settings }: FooterBottomBarProps) {
  const year = new Date().getFullYear();

  return (
    <div className="site-footer__bottom">
      <p className="font-display text-[clamp(0.75rem,0.85vw,0.8125rem)] leading-[1.4] text-surface-body">
        {`Copyright © ${year} ${settings.foundationName} | Բոլոր իրավունքները պաշտպանված են | Ստեղծվել է `}
        <a
          href="https://www.neetrino.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-[240ms] hover:text-surface-text"
        >
          Neetrino IT Company
        </a>{' '}
        կողմից
      </p>

      <div className="site-footer__bottom-meta">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[clamp(0.75rem,0.85vw,0.8125rem)] leading-[1.4] text-surface-body">
          {FOOTER_LEGAL_LINKS.map((link, index) => (
            <span key={link.label} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden>·</span> : null}
              <Link
                href={link.href}
                className="transition-colors duration-[240ms] hover:text-surface-text"
              >
                {link.label}
              </Link>
            </span>
          ))}
          <span aria-hidden>·</span>
          <span>{FOOTER_SITE_DOMAIN}</span>
        </p>
      </div>
    </div>
  );
}
