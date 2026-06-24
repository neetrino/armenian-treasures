import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft, Info, Mail, Phone, User } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
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
    <>
      <AdminTopbar title="Submission detail" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <Link
          href="/admin/submissions"
          className="inline-flex w-fit items-center gap-1 text-xs text-ink-muted hover:text-pomegranate"
        >
          <ChevronLeft size={14} aria-hidden /> Back to inbox
        </Link>
        <AdminPageHeader
          title={submission.title ?? '(no title)'}
          description={submission.type.replace(/_/g, ' ').toLowerCase()}
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
        />
        <div className="flex items-start gap-3 rounded-2xl border border-pomegranate/20 bg-pomegranate/5 p-4 text-sm text-pomegranate">
          <Info size={18} className="mt-0.5" aria-hidden />
          <p>
            Approval is for tracking only. To publish this content, create the menu item or item
            manually in Culture Menu / Culture Items.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="lg:col-span-2 rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl text-ink">Description</h3>
              <Badge tone="bronze">{submission.type.replace(/_/g, ' ').toLowerCase()}</Badge>
            </div>
            {submission.parentCategoryTitle ? (
              <p className="mt-2 text-xs text-ink-muted">
                Proposed under <strong>{submission.parentCategoryTitle}</strong>
              </p>
            ) : null}
            {submission.category ? (
              <p className="mt-1 text-xs text-ink-muted">Category: {submission.category}</p>
            ) : null}
            <p className="mt-4 whitespace-pre-line text-sm text-ink-soft">
              {submission.description ?? '(no description provided)'}
            </p>
            {submission.message ? (
              <>
                <h4 className="mt-6 font-display text-lg text-ink">Additional message</h4>
                <p className="mt-2 whitespace-pre-line text-sm text-ink-soft">{submission.message}</p>
              </>
            ) : null}
          </article>
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-ink">Submitter</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <User size={14} aria-hidden /> {submission.submitterName}
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} aria-hidden />
                  <a
                    href={`mailto:${submission.submitterEmail}`}
                    className="hover:text-pomegranate"
                  >
                    {submission.submitterEmail}
                  </a>
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
            </div>
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-ink">Internal note</h3>
              <p className="mt-1 text-xs text-ink-muted">
                Visible only to admins. Won&apos;t notify the submitter.
              </p>
              <div className="mt-4">
                <AdminNoteField
                  id={submission.id}
                  initialValue={submission.adminNote ?? ''}
                  action={updateSubmissionNoteAction}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default AdminSubmissionDetailPage;
