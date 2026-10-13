const ARMENIAN_TO_LATIN: Record<string, string> = {
  ա: 'a',
  բ: 'b',
  գ: 'g',
  դ: 'd',
  ե: 'e',
  զ: 'z',
  է: 'e',
  ը: 'e',
  թ: 't',
  ժ: 'zh',
  ի: 'i',
  լ: 'l',
  խ: 'kh',
  ծ: 'ts',
  կ: 'k',
  հ: 'h',
  ձ: 'dz',
  ղ: 'gh',
  ճ: 'ch',
  մ: 'm',
  յ: 'y',
  ն: 'n',
  շ: 'sh',
  ո: 'o',
  չ: 'ch',
  պ: 'p',
  ջ: 'j',
  ռ: 'r',
  ս: 's',
  վ: 'v',
  տ: 't',
  ր: 'r',
  ց: 'ts',
  ւ: 'u',
  փ: 'p',
  ք: 'k',
  օ: 'o',
  ֆ: 'f',
};

/** Lowercase text with Armenian letters folded to Latin so a word fragment matches either script. */
export function foldSearchText(value: string): string {
  const prepared = value.trim().toLowerCase().replaceAll('ու', 'u').replaceAll('և', 'ev');
  let folded = '';
  for (const char of prepared) {
    folded += ARMENIAN_TO_LATIN[char] ?? char;
  }
  return folded;
}

export function searchTextMatches(value: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = value.toLowerCase();
  if (haystack.includes(needle)) return true;
  const foldedNeedle = foldSearchText(needle);
  if (!foldedNeedle) return false;
  return foldSearchText(haystack).includes(foldedNeedle);
}
