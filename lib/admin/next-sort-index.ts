export function nextSortIndex(currentMax: number | null | undefined): number {
  return (currentMax ?? -1) + 1;
}
