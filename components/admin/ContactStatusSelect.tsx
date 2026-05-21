'use client';

import { StatusSelect } from './StatusSelect';
import { updateContactStatusAction } from '@/app/(admin)/admin/(panel)/contact-messages/actions';

const OPTIONS = [
  { value: 'NEW' as const, label: 'New' },
  { value: 'READ' as const, label: 'Read' },
  { value: 'REPLIED' as const, label: 'Replied' },
  { value: 'ARCHIVED' as const, label: 'Archived' },
];

type Status = (typeof OPTIONS)[number]['value'];

interface ContactStatusSelectProps {
  id: string;
  value: Status;
}

export function ContactStatusSelect({ id, value }: ContactStatusSelectProps) {
  return (
    <StatusSelect
      value={value}
      options={OPTIONS}
      onChange={async (next) => {
        await updateContactStatusAction(id, next);
      }}
    />
  );
}
