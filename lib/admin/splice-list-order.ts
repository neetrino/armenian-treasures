export function spliceListOrder(currentIds: string[], orderedSubset: string[]): string[] | null {
  if (orderedSubset.length === 0) return null;
  const known = new Set(currentIds);
  const subset = new Set(orderedSubset);
  if (subset.size !== orderedSubset.length || orderedSubset.some((id) => !known.has(id))) {
    return null;
  }

  const slots: number[] = [];
  currentIds.forEach((id, index) => {
    if (subset.has(id)) slots.push(index);
  });
  if (slots.length !== orderedSubset.length) return null;

  const next = [...currentIds];
  for (let index = 0; index < slots.length; index += 1) {
    const slot = slots[index];
    const id = orderedSubset[index];
    if (slot === undefined || !id) return null;
    next[slot] = id;
  }
  return next;
}
