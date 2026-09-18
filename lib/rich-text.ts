const TAG_REGEX = /<\/?[^>]+>/g;

export function looksLikeHtml(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(value);
}

export function stripRichText(value: string): string {
  return value.replace(TAG_REGEX, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripUnsafeBlocks(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<(iframe|object|embed|meta|link)[^>]*>/gi, '');
}

function sanitizeInlineStyle(styleValue: string): string | null {
  const alignMatch = /text-align\s*:\s*(left|center|right|justify)\b/i.exec(styleValue);
  if (!alignMatch?.[1]) return null;
  return `text-align: ${alignMatch[1].toLowerCase()}`;
}

function stripUnsafeAttributes(html: string): string {
  return html
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(href|src)\s*=\s*(['"])javascript:[\s\S]*?\2/gi, ' $1="#"')
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, (_match, quoted: string) => {
      const raw = quoted.slice(1, -1);
      const safe = sanitizeInlineStyle(raw);
      return safe ? ` style="${safe}"` : '';
    });
}

export function toSafeRichTextHtml(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (!looksLikeHtml(trimmed)) {
    return escapeHtml(trimmed).replaceAll('\n', '<br />');
  }
  return stripUnsafeAttributes(stripUnsafeBlocks(trimmed));
}
