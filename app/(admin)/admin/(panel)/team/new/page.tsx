import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin';

export const dynamic = 'force-dynamic';

async function NewTeamMemberPage() {
  await requireAdmin();
  redirect('/admin/team');
}

export default NewTeamMemberPage;
