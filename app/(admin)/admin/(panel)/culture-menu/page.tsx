import type { Metadata } from 'next';
import { CultureMenuPageContent } from '@/components/admin/CultureMenuPageContent';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Culture menu',
  robots: { index: false, follow: false },
};

async function AdminCultureMenuPage() {
  const user = await requireAdmin();
  return <CultureMenuPageContent user={user} />;
}

export default AdminCultureMenuPage;
