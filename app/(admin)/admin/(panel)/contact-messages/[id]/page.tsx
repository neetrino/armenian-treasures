import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronLeft, Mail, User } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/AdminTopbar';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContactStatusSelect } from '@/components/admin/ContactStatusSelect';
import { AdminNoteField } from '@/components/admin/AdminNoteField';
import { DeleteActionButton } from '@/components/admin/DeleteActionButton';
import {
  deleteContactMessageAction,
  updateContactNoteAction,
} from '@/app/(admin)/admin/(panel)/contact-messages/actions';
import { requireAdmin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Message', robots: { index: false, follow: false } };

interface PageProps { params: Promise<{ id: string }> }

async function AdminContactMessageDetailPage(props: PageProps) {
  const params = await props.params;
  const user = await requireAdmin();
  const message = await prisma.contactMessage.findUnique({ where: { id: params.id } });
  if (!message) notFound();
  return (
    <>
      <AdminTopbar title="Contact message" user={user} />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <Link
          href="/admin/contact-messages"
          className="inline-flex w-fit items-center gap-1 text-xs text-ink-muted hover:text-pomegranate"
        >
          <ChevronLeft size={14} aria-hidden /> Back to inbox
        </Link>
        <AdminPageHeader
          title={message.name}
          description={message.email}
          actions={
            <div className="flex items-center gap-2">
              <ContactStatusSelect id={message.id} value={message.status} />
              <DeleteActionButton
                action={deleteContactMessageAction}
                id={message.id}
                confirmText="Delete this message permanently?"
              />
            </div>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="lg:col-span-2 rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
            <h3 className="font-display text-xl text-ink">Message</h3>
            <p className="mt-4 whitespace-pre-line text-sm text-ink-soft">{message.message}</p>
          </article>
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-ink">Sender</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <User size={14} aria-hidden /> {message.name}
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} aria-hidden />
                  <a href={`mailto:${message.email}`} className="hover:text-pomegranate">
                    {message.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs text-ink-muted">
                Received {message.createdAt.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl text-ink">Internal note</h3>
              <div className="mt-4">
                <AdminNoteField
                  id={message.id}
                  initialValue={message.adminNote ?? ''}
                  action={updateContactNoteAction}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default AdminContactMessageDetailPage;
