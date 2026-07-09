const TAG_REGEX = /<\/?[^>]+>/g;

const SECTION_TITLE =
  /(?:[\p{Lu}][\p{L}'-]+)(?:\s+(?:[\p{Lu}][\p{L}'-]+|and|of|the|in|for|to|&|\/)){0,6}/u;

const SECTION_HEADER =
  /(?:^|\s+)((?:[\p{Lu}][\p{L}'-]+(?:\s+(?:[\p{Lu}][\p{L}'-]+|and|of|the|in|for|to|&|\/)){0,6})):\s/gu;

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

function stripUnsafeAttributes(html: string): string {
  return html
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(href|src)\s*=\s*(['"])javascript:[\s\S]*?\2/gi, ' $1="#"');
}

function splitIntoParagraphs(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (trimmed.length <= 380) return [trimmed];

  const sentences = trimmed.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) ?? [trimmed];
  const paragraphs: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if (current.length + sentence.length > 300 && current.length > 0) {
      paragraphs.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }

  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs;
}

function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll('\n', '<br />')}</p>`)
    .join('');
}

function getSectionTitleStart(match: RegExpExecArray): number {
  const full = match[0];
  const title = match[1];
  if (title === undefined) return match.index ?? 0;
  const leadingWhitespace = full.length - title.length - 2;
  return (match.index ?? 0) + Math.max(0, leadingWhitespace);
}

function isSectionHeaderBoundary(text: string, titleStart: number): boolean {
  if (titleStart === 0) return true;

  const prefix = text.slice(0, titleStart).trimEnd();
  if (/[.!?]$/.test(prefix)) return true;

  if (text[titleStart - 1] !== ' ') return false;

  const previousWord = prefix.match(/([\p{Lu}][\p{L}'-]+)\s*$/u)?.[1];
  if (previousWord && SECTION_TITLE.test(`${previousWord} ${text.slice(titleStart).split(':')[0]}`)) {
    return false;
  }

  return true;
}

function findNextSectionStart(text: string): number {
  SECTION_HEADER.lastIndex = 0;

  let match = SECTION_HEADER.exec(text);
  while (match) {
    const titleStart = getSectionTitleStart(match);
    if (isSectionHeaderBoundary(text, titleStart)) return titleStart;
    match = SECTION_HEADER.exec(text);
  }

  return -1;
}

function sectionBlock(title: string, body: string): string {
  return `<section class="blog-detail-prose__block"><h2 class="blog-detail-prose__heading">${escapeHtml(title.trim())}</h2>${paragraphsToHtml(splitIntoParagraphs(body))}</section>`;
}

function plainTextToBlogHtml(content: string): string {
  let remaining = content.trim();
  const blocks: string[] = [];

  while (remaining.length > 0) {
    const sectionStart = findNextSectionStart(remaining);
    if (sectionStart === -1) {
      blocks.push(
        paragraphsToHtml(
          remaining
            .split(/\n{2,}/)
            .map((part) => part.trim())
            .filter(Boolean),
        ),
      );
      break;
    }

    if (sectionStart > 0) {
      blocks.push(
        paragraphsToHtml(
          remaining
            .slice(0, sectionStart)
            .split(/\n{2,}/)
            .map((part) => part.trim())
            .filter(Boolean),
        ),
      );
      remaining = remaining.slice(sectionStart).trimStart();
      continue;
    }

    const headerMatch = new RegExp(`^(${SECTION_TITLE.source}):\\s*(.*)$`, 'su').exec(remaining);
    if (!headerMatch) {
      blocks.push(`<p>${escapeHtml(remaining).replaceAll('\n', '<br />')}</p>`);
      break;
    }

    const [, title, rest = ''] = headerMatch;
    if (!title) {
      blocks.push(`<p>${escapeHtml(remaining).replaceAll('\n', '<br />')}</p>`);
      break;
    }

    const nextSectionStart = findNextSectionStart(rest);
    const body = nextSectionStart >= 0 ? rest.slice(0, nextSectionStart).trim() : rest.trim();
    blocks.push(sectionBlock(title, body));
    remaining = nextSectionStart >= 0 ? rest.slice(nextSectionStart).trimStart() : '';
  }

  return blocks.filter(Boolean).join('\n');
}

function enhanceBlogHtml(html: string): string {
  return html
    .replace(/<h2(?![^>]*class=)([^>]*)>/gi, '<h2 class="blog-detail-prose__heading"$1>')
    .replace(/<h3(?![^>]*class=)([^>]*)>/gi, '<h3 class="blog-detail-prose__subheading"$1>');
}

export function stripBlogHtml(content: string): string {
  return content.replace(TAG_REGEX, ' ');
}

export function toBlogRenderHtml(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) return '';

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    const withoutBlocks = stripUnsafeBlocks(trimmed);
    return enhanceBlogHtml(stripUnsafeAttributes(withoutBlocks));
  }

  return plainTextToBlogHtml(trimmed);
}
