/**
 * Normalizes Arabic text by removing diacritics (harakat), tatweel,
 * and normalizing common letter variations (alef, taa marbuta, yaa).
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Remove diacritics / harakat and tatweel
    .replace(/[\u064B-\u0652\u0640]/g, '')
    // Normalize Alef forms (أ, إ, آ -> ا)
    .replace(/[\u0622\u0623\u0625]/g, '\u0627')
    // Normalize Taa Marbuta (ة -> ه)
    .replace(/\u0629/g, '\u0647')
    // Normalize Alif Maqsura (ى -> ي)
    .replace(/\u0649/g, '\u064A')
    .trim();
}

/**
 * Checks if a search query matches target text in either Arabic or English.
 */
export function matchesQuery(query: string, ...targets: string[]): boolean {
  const normQuery = normalizeArabic(query);
  if (!normQuery) return true;
  return targets.some((t) => normalizeArabic(t).includes(normQuery));
}
