import { Badge } from '@/components/ui/Badge';
import {
  CONTACT_MESSAGE_KIND_LABELS,
  getContactMessageKind,
} from '@/lib/inbox/contact-message-kind';

interface ContactInboxTypeBadgeProps {
  name: string;
  message: string;
}

export function ContactInboxTypeBadge({ name, message }: ContactInboxTypeBadgeProps) {
  const kind = getContactMessageKind({ name, message });
  return <Badge tone="pomegranate">{CONTACT_MESSAGE_KIND_LABELS[kind]}</Badge>;
}
