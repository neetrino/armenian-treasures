export function sameIdSet(expected: string[], orderedIds: string[]): boolean {
  if (expected.length !== orderedIds.length) return false;
  const known = new Set(expected);
  if (known.size !== expected.length) return false;
  return orderedIds.every((id) => known.has(id));
}
