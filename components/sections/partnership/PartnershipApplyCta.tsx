import Link from 'next/link';

interface PartnershipApplyCtaProps {
  ctaLabel: string;
  ctaUrl: string;
}

export function PartnershipApplyCta({ ctaLabel, ctaUrl }: PartnershipApplyCtaProps) {
  return (
    <div className="partnership-apply-cta">
      <Link href={ctaUrl} className="partnership-apply-cta__link">
        {ctaLabel}
      </Link>
    </div>
  );
}
