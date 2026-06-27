export const NEWSLETTER_CONTACT_NAME = 'Newsletter';
export const NEWSLETTER_CONTACT_MESSAGE_PREFIX = 'Newsletter subscription request';

export type ContactMessageKind = 'contact' | 'newsletter';

export function getContactMessageKind(message: {
  name: string;
  message: string;
}): ContactMessageKind {
  if (message.name === NEWSLETTER_CONTACT_NAME) return 'newsletter';
  if (message.message.startsWith(NEWSLETTER_CONTACT_MESSAGE_PREFIX)) return 'newsletter';
  return 'contact';
}

export const CONTACT_MESSAGE_KIND_LABELS: Record<ContactMessageKind, string> = {
  contact: 'Contact form',
  newsletter: 'Newsletter signup',
};
