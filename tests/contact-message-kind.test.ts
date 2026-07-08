import { describe, expect, it } from 'vitest';
import { getContactMessageKind } from '@/lib/inbox/contact-message-kind';

describe('getContactMessageKind', () => {
  it('classifies all inbox entries as contact form messages', () => {
    expect(
      getContactMessageKind({
        name: 'Jane Doe',
        message: 'Hello from the contact form.',
      }),
    ).toBe('contact');
  });
});
