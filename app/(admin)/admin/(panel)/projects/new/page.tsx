import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

async function NewProjectPage() {
  await requireAdmin();
  redirect('/admin/projects');
}

export default NewProjectPage;
