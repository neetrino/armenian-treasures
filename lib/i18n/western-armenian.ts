const CONSONANTS = new Set(
  'բգդզթժլխծկհձղճմնշչպջռսվտրցփքԲԳԴԶԹԺԼԽԾԿՀՁՂՃՄՆՇՉՊՋՌՍՎՏՐՑՓՔ',
);

const YU_TO_IW: Record<string, string> = {
  'յու': 'իւ',
  'Յու': 'Իւ',
  'ՅՈՒ': 'ԻՒ',
};

const YA_TO_EA: Record<string, string> = {
  'յա': 'եա',
  'Յա': 'Եա',
  'ՅԱ': 'ԵԱ',
};

const YO_TO_EO: Record<string, string> = {
  'յո': 'եօ',
  'Յո': 'Եօ',
  'ՅՈ': 'ԵՕ',
};

const WORD_FIXES: ReadonlyArray<readonly [string, string]> = [
  ['Հուշ', 'Յուշ'],
  ['հուշ', 'յուշ'],
  ['Հոյս', 'Յոյս'],
  ['հոյս', 'յոյս'],
  ['Նվիր', 'Նուիր'],
  ['նվիր', 'նուիր'],
];

function reverseReformPairs(text: string): string {
  let out = '';
  for (let index = 0; index < text.length; index += 1) {
    const previous = index > 0 ? text[index - 1] ?? '' : '';
    const three = text.slice(index, index + 3);
    const two = text.slice(index, index + 2);
    const yu = CONSONANTS.has(previous) ? YU_TO_IW[three] : undefined;
    if (yu) {
      out += yu;
      index += 2;
      continue;
    }
    const pair = CONSONANTS.has(previous) ? YA_TO_EA[two] ?? YO_TO_EO[two] : undefined;
    if (pair) {
      out += pair;
      index += 1;
      continue;
    }
    out += text[index] ?? '';
  }
  return out;
}

/** Reformed Eastern spelling to classical Western spelling. Latin and other scripts stay put. */
export function toClassicalArmenian(text: string): string {
  if (!/[\u0530-\u058F]/.test(text) && !text.includes('և')) return text;
  const prepared = text
    .replaceAll('և', 'եւ')
    .replaceAll('ՈՒՅ', 'ՈՅ')
    .replaceAll('ույ', 'ոյ')
    .replaceAll('Ույ', 'Ոյ');
  let classical = reverseReformPairs(prepared);
  for (const [from, to] of WORD_FIXES) classical = classical.replaceAll(from, to);
  return classical;
}
