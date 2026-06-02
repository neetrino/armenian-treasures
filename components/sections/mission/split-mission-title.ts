export function splitMissionTitle(title: string): { line1: string; line2: string } {
  const marker = 'memory,';
  const idx = title.toLowerCase().indexOf(marker);
  if (idx < 0) {
    return { line1: title, line2: '' };
  }
  return {
    line1: title.slice(0, idx).trim(),
    line2: title.slice(idx).trim(),
  };
}
