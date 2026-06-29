export function createPageContentUiId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `pc-${crypto.randomUUID()}`;
  }
  return `pc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
