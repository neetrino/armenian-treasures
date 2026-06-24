import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

async function NewCareerPage() {
  await requireAdmin();
  redirect('/admin/careers');
}

export default NewCareerPage;
