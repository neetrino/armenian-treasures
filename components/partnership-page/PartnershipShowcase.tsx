import Image from 'next/image';
import Link from 'next/link';
import type { PartnerLogo } from '@/lib/constants/partnership-page';
import { hasPartnershipCategories } from '@/lib/landing/landing-section-utils';
import { getPartnershipPageContent } from '@/lib/queries/page-content';
import { resolvePublicAssetUrl } from '@/lib/assets/resolve-public-url';

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function PartnerShortcard({
  name,
  sector,
  href,
  logo,
}: {
  name: string;
  sector: string;
  href: string;
  logo: PartnerLogo;
}) {
  return (
    <Link href={href} className="partner-shortcard reveal">
      <div className="partner-shortcard__media">
        {logo.type === 'image' ? (
          <Image
            src={resolvePublicAssetUrl(logo.src)}
            alt={logo.alt}
            width={160}
            height={160}
            className="partner-shortcard__img"
          />
        ) : (
          <div className="partner-shortcard__placeholder">
            <PlaceholderIcon />
            <span>{logo.label}</span>
          </div>
        )}
      </div>
      <div className="partner-shortcard__body">
        <p className="partner-shortcard__sector">{sector}</p>
        <h3 className="partner-shortcard__name">{name}</h3>
      </div>
    </Link>
  );
}

export async function PartnershipShowcase() {
  const { categories } = await getPartnershipPageContent();

  if (!hasPartnershipCategories(categories)) {
    return null;
  }

  const partners = categories.flatMap((category) => category.partners);

  return (
    <div className="partners-outer" id="partners">
      <div className="partners-cosmetic-bg" aria-hidden />
      <div className="partners-inner">
        <div className="partners-header">
          <div className="sec-label" style={{ textAlign: 'center' }}>
            Institutional Alliance
          </div>
          <div className="sec-title" style={{ textAlign: 'center' }}>
            Our Partners
          </div>
          <p className="sec-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
            Partner shortcards in a consistent layout — logos and names only.
          </p>
        </div>
        <div className="partner-shortcard-grid">
          {partners.map((partner) => (
            <PartnerShortcard
              key={`${partner.name}-${partner.sector}`}
              name={partner.name}
              sector={partner.sector}
              href={partner.href}
              logo={partner.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
