const HTML_ESCAPE_RE = /[<>&"'`]/g;
const HTML_ESCAPE_MAP: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;',
};

export function escapeHtml(value: string): string {
  return value.replace(HTML_ESCAPE_RE, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/\s{3,}/g, '\n\n').trim();
}

export function sanitizeUserText(value: string | undefined | null): string {
  if (!value) return '';
  return stripHtml(escapeHtml(value));
}
