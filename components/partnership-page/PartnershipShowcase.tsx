import Image from 'next/image';
import Link from 'next/link';
import type { PartnerLogo } from '@/lib/constants/partnership-page';
import { hasPartnershipCategories } from '@/lib/landing/landing-section-utils';
import { getPartnershipPageContent } from '@/lib/queries/page-content';

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function PartnerMedallion({ logo }: { logo: PartnerLogo }) {
  return (
    <div className="medallion">
      <div className="medallion-outer">
        <div className="medallion-ring1" />
        <div className="medallion-ring2" />
        <div className="medallion-face">
          {logo.type === 'image' ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={180}
              className={`medallion-img${logo.cover ? ' cover' : ''}`}
            />
          ) : (
            <div className="medallion-placeholder">
              <PlaceholderIcon />
              <span>{logo.label}</span>
            </div>
          )}
        </div>
        <span className="medallion-dot tl" />
        <span className="medallion-dot tr" />
        <span className="medallion-dot bl" />
        <span className="medallion-dot br" />
      </div>
    </div>
  );
}

export async function PartnershipShowcase() {
  const { categories } = await getPartnershipPageContent();

  if (!hasPartnershipCategories(categories)) {
    return null;
  }

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
            These institutions stand with Armenian Treasures in the conviction that civilisation-level culture demands
            civilisation-level stewardship.
          </p>
        </div>
        {categories.map((category) => (
          <div key={category.label} className="partner-category">
            <div className="partner-cat-label">
              <span className="pcat-text">{category.label}</span>
              <span className="pcat-rule" />
            </div>
            <div className={`partner-row ${category.row}`}>
              {category.partners.map((partner) => (
                <Link
                  key={partner.name}
                  href={partner.href}
                  className={`p-card reveal${partner.wide ? ' wide' : ''}${partner.future ? ' future' : ''}`}
                >
                  <PartnerMedallion logo={partner.logo} />
                  <div className="p-body">
                    <div className="p-sector">{partner.sector}</div>
                    <div className="p-name">{partner.name}</div>
                    <div className="p-desc">{partner.desc}</div>
                    <span className="p-arrow">{partner.arrow}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
