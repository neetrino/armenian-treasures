import '@/components/partnership-page/partnership-page.css';

import { PartnershipShowcase } from '@/components/partnership-page/PartnershipShowcase';
import { HeritageLandingShell } from '@/components/landing/HeritageLandingShell';
import { getCurrentSiteLocale } from '@/lib/i18n/active-locale';

export async function PartnershipPage() {
  const locale = await getCurrentSiteLocale();

  return (
    <HeritageLandingShell>
      <PartnershipShowcase locale={locale} />
    </HeritageLandingShell>
  );
}
