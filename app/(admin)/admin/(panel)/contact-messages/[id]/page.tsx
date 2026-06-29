import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, User } from 'lucide-react';
import { AdminPageShell } from '@/components/admin/AdminPageShell';
import { AdminBackLink } from '@/components/admin/AdminBackLink';
import { AdminDetailCard } from '@/components/admin/AdminDetailCard';
import { AdminStagger } from '@/components/admin/AdminStagger';
import { ContactInboxTypeBadge } from '@/components/admin/ContactInboxTypeBadge';
import { ContactStatusSelect } from '@/components/admin/ContactStatusSelect';
import { AdminNoteField } from '@/components/admin/AdminNoteField';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import {
  deleteContactMessageAction,
  updateContactNoteAction,
} from '@/app/(admin)/admin/(panel)/contact-messages/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { getContactMessageKind } from '@/lib/inbox/contact-message-kind';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Inbox entry', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function AdminContactMessageDetailPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const message = await prisma.contactMessage.findUnique({ where: { id: params.id } });
  if (!message) notFound();

  const kind = getContactMessageKind(message);
  const isNewsletter = kind === 'newsletter';

  return (
    <AdminPageShell
      user={user}
      topbarTitle={isNewsletter ? 'Newsletter signup' : 'Contact message'}
      title={isNewsletter ? message.email : message.name}
      description={
        isNewsletter
          ? 'Newsletter signup — stored in inbox only; not synced to an email provider yet.'
          : message.email
      }
      beforeHeader={<AdminBackLink href="/admin/contact-messages" label="Back to public inbox" />}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <ContactInboxTypeBadge name={message.name} message={message.message} />
          <ContactStatusSelect id={message.id} value={message.status} />
          <DeleteActionButton
            action={deleteContactMessageAction}
            id={message.id}
            confirmText="Delete this inbox entry permanently?"
          />
        </div>
      }
    >
      <AdminStagger className="grid gap-6 lg:grid-cols-3">
        <AdminDetailCard className="lg:col-span-2" title={isNewsletter ? 'Signup details' : 'Message'}>
          {isNewsletter ? (
            <div className="space-y-3 text-sm text-ink-soft">
              <p>
                <span className="font-medium text-ink">Email:</span>{' '}
                <Link href={`mailto:${message.email}`} className="hover:text-pomegranate">
                  {message.email}
                </Link>
              </p>
              <p className="text-xs text-ink-muted">{message.message}</p>
            </div>
          ) : (
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">{message.message}</p>
          )}
        </AdminDetailCard>

        <aside className="flex flex-col gap-4">
          <AdminDetailCard title={isNewsletter ? 'Subscriber' : 'Sender'}>
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              {!isNewsletter ? (
                <li className="flex items-center gap-2">
                  <User size={14} aria-hidden /> {message.name}
                </li>
              ) : null}
              <li className="flex items-center gap-2">
                <Mail size={14} aria-hidden />
                <Link href={`mailto:${message.email}`} className="hover:text-pomegranate">
                  {message.email}
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Received {message.createdAt.toLocaleString()}
            </p>
          </AdminDetailCard>

          <AdminDetailCard title="Internal note">
            <AdminNoteField
              id={message.id}
              initialValue={message.adminNote ?? ''}
              action={updateContactNoteAction}
            />
          </AdminDetailCard>
        </aside>
      </AdminStagger>
    </AdminPageShell>
  );
}

export default AdminContactMessageDetailPage;
