import Link from 'next/link';
import { HOME_PARTNERSHIP_SECTION } from '@/lib/constants/home-partnership-section';

export function PartnershipApplyCta() {
  return (
    <div className="partnership-apply-cta">
      <Link href={HOME_PARTNERSHIP_SECTION.ctaUrl} className="partnership-apply-cta__link">
        {HOME_PARTNERSHIP_SECTION.ctaLabel}
      </Link>
    </div>
  );
}
