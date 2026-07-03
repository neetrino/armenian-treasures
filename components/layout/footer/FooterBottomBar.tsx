import Link from 'next/link';
import { FOOTER_LEGAL_LINKS } from '@/components/layout/footer/footer-links';
import type { PublicSiteSettingsDTO } from '@/lib/dto';

interface FooterBottomBarProps {
  settings: PublicSiteSettingsDTO;
}

export function FooterBottomBar({ settings }: FooterBottomBarProps) {
  const year = new Date().getFullYear();

  return (
    <div className="site-footer__bottom">
      <p className="site-footer__copy font-display text-[clamp(0.75rem,0.85vw,0.8125rem)] leading-[1.5]">
        {`Copyright © ${year} ${settings.foundationName} | All rights reserved | Created by `}
        <a
          href="https://www.neetrino.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer__credit"
        >
          Neetrino IT Company
        </a>
      </p>

      <div className="site-footer__bottom-meta">
        <p className="site-footer__meta font-display text-[clamp(0.75rem,0.85vw,0.8125rem)] leading-[1.5]">
          {FOOTER_LEGAL_LINKS.map((link, index) => (
            <span key={link.label} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden>·</span> : null}
              <Link href={link.href} className="site-footer__link site-footer__link--inline">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
