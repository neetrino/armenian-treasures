'use client';

import { useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'failed';

const COPY_LABEL: Record<CopyStatus, string> = {
  idle: 'Copy emails for outreach',
  copied: 'Emails copied',
  failed: 'Copy failed',
};

export function MemberOutreachCopy({ emails }: { emails: readonly string[] }) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  if (emails.length === 0) return null;

  async function copyEmails() {
    try {
      await navigator.clipboard.writeText(emails.join(', '));
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }

  const countLabel =
    emails.length === 1
      ? '1 registered member has not donated yet.'
      : `${emails.length} registered members have not donated yet.`;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200/70 bg-white/95 px-4 py-3 shadow-card">
      <p className="text-sm text-ink-soft">{countLabel}</p>
      <button
        type="button"
        onClick={() => void copyEmails()}
        className="h-10 rounded-xl border border-stone-300/80 bg-white px-4 text-sm font-medium text-ink transition hover:border-bronze-300 hover:text-bronze-900"
      >
        {COPY_LABEL[status]}
      </button>
    </div>
  );
}
