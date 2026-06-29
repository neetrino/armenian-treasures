import { describe, expect, it } from 'vitest';
import {
  FAST_SUBMIT_ERROR_MESSAGE,
  getFormRenderedAt,
  isFormSubmittedTooFast,
  MIN_FORM_SUBMIT_MS,
} from '@/lib/forms/bot-guard';

describe('bot-guard', () => {
  it('detects submissions faster than MIN_FORM_SUBMIT_MS', () => {
    const now = 10_000;
    expect(isFormSubmittedTooFast(now - 500, now)).toBe(true);
    expect(isFormSubmittedTooFast(now - MIN_FORM_SUBMIT_MS, now)).toBe(false);
    expect(isFormSubmittedTooFast(0, now)).toBe(false);
  });

  it('reads renderedAt from form data', () => {
    const formData = new FormData();
    formData.set('renderedAt', '12345');
    expect(getFormRenderedAt(formData)).toBe(12345);
  });

  it('exposes a user-visible fast-submit message', () => {
    expect(FAST_SUBMIT_ERROR_MESSAGE.length).toBeGreaterThan(10);
  });
});
