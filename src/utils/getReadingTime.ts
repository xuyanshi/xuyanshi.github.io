/**
 * Estimate reading time for markdown content.
 * Based on ~200 words per minute for English, ~300 characters per minute for CJK.
 */
export function getReadingTime(body: string): number {
  if (!body) return 1;

  // Strip markdown syntax, code blocks, HTML tags
  const clean = body
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]+\)/g, "$1") // links -> text
    .replace(/<[^>]+>/g, "") // HTML tags
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/[*_~>|-]/g, "") // markdown chars
    .trim();

  // Count CJK characters
  const cjkChars = (clean.match(/[一-鿿぀-ゟ゠-ヿ]/g) || []).length;
  // Count non-CJK words
  const nonCjk = clean.replace(/[一-鿿぀-ゟ゠-ヿ]/g, " ");
  const words = nonCjk.split(/\s+/).filter(Boolean).length;

  // CJK: ~300 chars/min, English: ~200 words/min
  const cjkMinutes = cjkChars / 300;
  const enMinutes = words / 200;

  return Math.max(1, Math.ceil(cjkMinutes + enMinutes));
}
