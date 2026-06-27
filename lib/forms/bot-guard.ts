export const MIN_FORM_SUBMIT_MS = 2000;

export const FAST_SUBMIT_ERROR_MESSAGE =
  'That submission was sent too quickly. Please wait a moment and try again.';

export function getFormRenderedAt(formData: FormData): number {
  return Number(formData.get('renderedAt') ?? 0);
}

export function isFormSubmittedTooFast(renderedAt: number, now = Date.now()): boolean {
  return renderedAt > 0 && now - renderedAt < MIN_FORM_SUBMIT_MS;
}
