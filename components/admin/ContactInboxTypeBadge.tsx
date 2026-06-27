import { Badge } from '@/components/ui/Badge';
import {
  CONTACT_MESSAGE_KIND_LABELS,
  getContactMessageKind,
  type ContactMessageKind,
} from '@/lib/inbox/contact-message-kind';

interface ContactInboxTypeBadgeProps {
  name: string;
  message: string;
}

const TONE_BY_KIND: Record<ContactMessageKind, 'bronze' | 'pomegranate'> = {
  contact: 'pomegranate',
  newsletter: 'bronze',
};

export function ContactInboxTypeBadge({ name, message }: ContactInboxTypeBadgeProps) {
  const kind = getContactMessageKind({ name, message });
  return <Badge tone={TONE_BY_KIND[kind]}>{CONTACT_MESSAGE_KIND_LABELS[kind]}</Badge>;
}
