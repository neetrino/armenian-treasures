export type MutablePageContent = Record<string, unknown>;

export function asMutableContent(value: unknown): MutablePageContent {
  return value as MutablePageContent;
}

export function patchContent(
  prev: MutablePageContent,
  patch: MutablePageContent,
): MutablePageContent {
  return { ...prev, ...patch };
}

export function patchNestedContent(
  prev: MutablePageContent,
  key: string,
  patch: MutablePageContent,
): MutablePageContent {
  const current = prev[key];
  const base =
    typeof current === 'object' && current !== null && !Array.isArray(current)
      ? (current as MutablePageContent)
      : {};
  return { ...prev, [key]: { ...base, ...patch } };
}

export function readRecord(value: unknown): MutablePageContent {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value as MutablePageContent;
  }
  return {};
}

export function readArray<T = MutablePageContent>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}
