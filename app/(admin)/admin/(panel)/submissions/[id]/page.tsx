import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, Phone, User } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { AdminAlertBanner } from '@/components/admin/AdminAlertBanner';
import { AdminDetailCard } from '@/components/admin/AdminDetailCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { SubmissionStatusSelect } from '@/components/admin/SubmissionStatusSelect';
import { AdminNoteField } from '@/components/admin/AdminNoteField';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import { Badge } from '@/components/ui/Badge';
import {
  deleteSubmissionAction,
  updateSubmissionNoteAction,
} from '@/app/(admin)/admin/(panel)/submissions/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Submission', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function AdminSubmissionDetailPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const submission = await prisma.submission.findUnique({ where: { id: params.id } });
  if (!submission) notFound();
  return (
    <AdminPageShell
      user={user}
      topbarTitle="Submission detail"
      title={submission.title ?? '(no title)'}
      description={submission.type.replace(/_/g, ' ').toLowerCase()}
      beforeHeader={<AdminBackLink href="/admin/submissions" label="Back to inbox" />}
      actions={
        <div className="flex items-center gap-2">
          <SubmissionStatusSelect id={submission.id} value={submission.status} />
          <DeleteActionButton
            action={deleteSubmissionAction}
            id={submission.id}
            confirmText="Delete this submission permanently?"
          />
        </div>
      }
    >
      <AdminAlertBanner title="Approval is for tracking only">
        To publish this content, create the menu item or item manually in Culture Menu / Culture Items.
      </AdminAlertBanner>

      <AdminStagger className="grid gap-6 lg:grid-cols-3">
        <AdminDetailCard
          className="lg:col-span-2"
          title="Description"
          badge={<Badge tone="bronze">{submission.type.replace(/_/g, ' ').toLowerCase()}</Badge>}
        >
          {submission.parentCategoryTitle ? (
            <p className="text-xs text-ink-muted">
              Proposed under <strong>{submission.parentCategoryTitle}</strong>
            </p>
          ) : null}
          {submission.category ? (
            <p className="mt-1 text-xs text-ink-muted">Category: {submission.category}</p>
          ) : null}
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
            {submission.description ?? '(no description provided)'}
          </p>
          {submission.message ? (
            <>
              <h4 className="mt-6 font-display text-lg text-ink">Additional message</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
                {submission.message}
              </p>
            </>
          ) : null}
        </AdminDetailCard>

        <aside className="flex flex-col gap-4">
          <AdminDetailCard title="Submitter">
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <User size={14} aria-hidden /> {submission.submitterName}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} aria-hidden />
                <Link href={`mailto:${submission.submitterEmail}`} className="hover:text-pomegranate">
                  {submission.submitterEmail}
                </Link>
              </li>
              {submission.submitterPhone ? (
                <li className="flex items-center gap-2">
                  <Phone size={14} aria-hidden /> {submission.submitterPhone}
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Received {submission.createdAt.toLocaleString()}
            </p>
          </AdminDetailCard>

          <AdminDetailCard title="Internal note" description="Visible only to admins. Won't notify the submitter.">
            <AdminNoteField
              id={submission.id}
              initialValue={submission.adminNote ?? ''}
              action={updateSubmissionNoteAction}
            />
          </AdminDetailCard>
        </aside>
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminSubmissionDetailPage;
