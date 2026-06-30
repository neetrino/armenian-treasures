import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Globe, Mail, Phone, User } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { AdminDetailCard } from '@/components/admin/AdminDetailCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { deleteMemberAction } from '@/app/(admin)/admin/(panel)/users/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getCountryLabel } from '@/lib/constants/countries';
import { getAdminMemberDetail } from '@/lib/queries/admin-members';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'User detail', robots: { index: false, follow: false } };

interface PageProps {
  params: Promise<{ id: string }>;
}

const DONATION_STATUS_LABELS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
} as const;

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

async function AdminUserDetailPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const member = await getAdminMemberDetail(params.id);

  if (!member) notFound();

  return (
    <AdminPageShell
      user={user}
      topbarTitle="User detail"
      title={`${member.name} ${member.surname}`}
      description={member.email}
      beforeHeader={<AdminBackLink href="/admin/users" label="All users" />}
      actions={
        <DeleteActionButton
          action={deleteMemberAction}
          id={member.id}
          confirmText={`Delete member “${member.name} ${member.surname}”? This removes their donation history.`}
        />
      }
    >
      <AdminStagger className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AdminDetailCard title="Donation history">
            {member.donations.length === 0 ? (
              <p className="text-sm text-ink-muted">No donations recorded for this member yet.</p>
            ) : (
              <ul className="divide-y divide-stone-100">
                {member.donations.map((donation) => (
                  <li key={donation.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-ink">{donation.label}</p>
                      <p className="mt-1 text-xs text-ink-muted">
                        {donation.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-ink">
                        {formatAmount(donation.amount, donation.currency)}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
                        {DONATION_STATUS_LABELS[donation.status]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </AdminDetailCard>
        </div>

        <aside className="flex flex-col gap-4">
          <AdminDetailCard title="Profile">
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <User size={14} aria-hidden />
                {member.name} {member.surname}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} aria-hidden />
                <Link href={`mailto:${member.email}`} className="hover:text-pomegranate">
                  {member.email}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} aria-hidden />
                <Link href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:text-pomegranate">
                  {member.phone}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} aria-hidden />
                {getCountryLabel(member.country)}
              </li>
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Registered {member.createdAt.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Last updated {member.updatedAt.toLocaleString()}
            </p>
          </AdminDetailCard>
        </aside>
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminUserDetailPage;
