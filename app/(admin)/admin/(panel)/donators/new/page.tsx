import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

async function NewDonatorPage() {
  await requireAdmin();
  redirect('/admin/donators');
}

export default NewDonatorPage;
