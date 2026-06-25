import Link from 'next/link';
import type { CulturalPortalPageContent } from '@/lib/queries/page-content';
import type { PartnershipCategoryIconKey } from '@/lib/constants/home-partnership-section';

function PartnerIcon({ type }: { type: PartnershipCategoryIconKey }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: '0 0 28 28',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.4,
    'aria-hidden': true,
  };

  switch (type) {
    case 'museums':
      return (
        <svg {...props}>
          <path d="M3 25h22M5 25V12" />
          <path d="M23 25V12" />
          <path d="M14 4L3 12h22z" />
          <path d="M9 25V18h4v7M15 25V18h4v7" />
          <circle cx="14" cy="9" r="1.5" />
        </svg>
      );
    case 'universities':
      return (
        <svg {...props}>
          <rect x="2" y="10" width="24" height="16" rx="1" />
          <path d="M9 10V6a5 5 0 0110 0v4" />
          <circle cx="14" cy="18" r="3" />
        </svg>
      );
    case 'unesco':
      return (
        <svg {...props}>
          <circle cx="14" cy="14" r="11" />
          <path d="M3 14h22M14 3v22" />
          <path d="M5.5 7.5c3 2 5 4 8.5 4s5.5-2 8.5-4M5.5 20.5c3-2 5-4 8.5-4s5.5 2 8.5 4" />
        </svg>
      );
    case 'culturalNgos':
      return (
        <svg {...props}>
          <path d="M14 3l2.5 7.5H24l-6 4.5 2.5 7.5L14 18l-6.5 4.5 2.5-7.5-6-4.5h7.5z" />
        </svg>
      );
    case 'mediaPartners':
      return (
        <svg {...props}>
          <rect x="2" y="5" width="24" height="18" rx="2" />
          <path d="M2 10h24" />
          <circle cx="8" cy="16" r="2" />
          <path d="M13 14h8M13 18h5" />
        </svg>
      );
    case 'technology':
      return (
        <svg {...props}>
          <rect x="3" y="8" width="22" height="14" rx="2" />
          <path d="M8 8V6a6 6 0 0112 0v2" />
          <rect x="11" y="14" width="6" height="5" rx="1" />
        </svg>
      );
    case 'governments':
      return (
        <svg {...props}>
          <path d="M14 3l2 6h6l-5 3.5 2 6L14 15l-5 3.5 2-6L6 9h6z" />
          <path d="M7 22h14" />
        </svg>
      );
    case 'becomePartner':
      return (
        <svg {...props}>
          <circle cx="14" cy="14" r="11" />
          <path d="M14 9v10M9 14h10" />
        </svg>
      );
  }
}

type CulturalPortalPartnershipProps = {
  section: CulturalPortalPageContent['HOME_PARTNERSHIP_SECTION'];
  categories: CulturalPortalPageContent['HOME_PARTNERSHIP_CATEGORIES'];
};

export function CulturalPortalPartnership({ section, categories }: CulturalPortalPartnershipProps) {
  return (
    <section id="partners">
      <p className="sec-label">{section.eyebrow}</p>
      <h2 className="sec-title">{section.title}</h2>
      <p className="sec-desc">{section.description}</p>
      <div className="partner-grid">
        {categories.map((category) => {
          const isCta = category.variant === 'cta';
          const className = `partner-card reveal${isCta ? ' partner-cta' : ''}`;

          if (isCta && category.href) {
            return (
              <Link key={category.title} href={category.href} className={className}>
                <PartnerIcon type={category.icon} />
                {category.title}
              </Link>
            );
          }

          return (
            <div key={category.title} className={className}>
              <PartnerIcon type={category.icon} />
              {category.title}
            </div>
          );
        })}
      </div>
      <div className="section-cta">
        <Link href={section.ctaUrl} className="btn-outline">
          {section.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
