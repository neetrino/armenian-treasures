import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

async function NewCultureItemPage() {
  await requireAdmin();
  redirect('/admin/culture-items');
}

export default NewCultureItemPage;
