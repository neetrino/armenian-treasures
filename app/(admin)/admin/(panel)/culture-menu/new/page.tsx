import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

async function NewCultureMenuItemPage() {
  await requireAdmin();
  redirect('/admin/culture-menu');
}

export default NewCultureMenuItemPage;
