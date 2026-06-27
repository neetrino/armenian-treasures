import { describe, expect, it } from 'vitest';
import {
  getContactMessageKind,
  NEWSLETTER_CONTACT_MESSAGE_PREFIX,
  NEWSLETTER_CONTACT_NAME,
} from '@/lib/inbox/contact-message-kind';

describe('getContactMessageKind', () => {
  it('detects newsletter signups by stored name', () => {
    expect(
      getContactMessageKind({
        name: NEWSLETTER_CONTACT_NAME,
        message: `${NEWSLETTER_CONTACT_MESSAGE_PREFIX} from homepage.`,
      }),
    ).toBe('newsletter');
  });

  it('detects newsletter signups by message prefix', () => {
    expect(
      getContactMessageKind({
        name: 'Legacy Newsletter',
        message: `${NEWSLETTER_CONTACT_MESSAGE_PREFIX} from donation page.`,
      }),
    ).toBe('newsletter');
  });

  it('classifies contact form messages', () => {
    expect(
      getContactMessageKind({
        name: 'Ani Karapetyan',
        message: 'Hello, I would like to partner with the foundation.',
      }),
    ).toBe('contact');
  });
});
