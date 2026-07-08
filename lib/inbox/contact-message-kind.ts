export type ContactMessageKind = 'contact';

export function getContactMessageKind(_message: {
  name: string;
  message: string;
}): ContactMessageKind {
  return 'contact';
}

export const CONTACT_MESSAGE_KIND_LABELS: Record<ContactMessageKind, string> = {
  contact: 'Contact form',
};
