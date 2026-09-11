import { parseEnabledLocales } from '@/lib/i18n/locale-config';
import type { Metadata } from 'next';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminPanelCard } from '@/components/admin/AdminPanelCard';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Site settings', robots: { index: false, follow: false } };

async function AdminSettingsPage() {
  const user = await requireAdmin();
  const settings = await prisma.siteSettings.findFirst();
  const initial = {
    foundationName: settings?.foundationName ?? 'Armenian Treasures',
    foundationSubtitle: settings?.foundationSubtitle ?? 'Cultural Heritage Foundation',
    footerDescription:
      settings?.footerDescription ??
      'Digitizing and preserving the architectural, artistic and spiritual heritage of Armenia for future generations.',
    contactEmail: settings?.contactEmail ?? 'info@armeniantreasures.org',
    phone: settings?.phone ?? '+374 10 000 000',
    address: settings?.address ?? 'Yerevan, Armenia',
    copyrightText:
      settings?.copyrightText ?? '© 2026 Armenian Treasures Foundation. All rights reserved.',
    enabledLocales: parseEnabledLocales(settings?.enabledLocales),
  };
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Site settings"
      title="Foundation identity"
      description="Strings shown in the header, footer and metadata of the public site."
    >
      <AdminPanelCard>
        <SiteSettingsForm initial={initial} />
      </AdminPanelCard>
    </AdminPageShell>
  );
}

export default AdminSettingsPage;
