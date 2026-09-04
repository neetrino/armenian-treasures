/** Armenian Unicode block (including punctuation used in titles). */
const ARMENIAN_SCRIPT_RE = /[\u0530-\u058F]/;

export function containsArmenianScript(value: string): boolean {
  return ARMENIAN_SCRIPT_RE.test(value);
}
