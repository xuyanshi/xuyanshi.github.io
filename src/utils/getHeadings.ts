/**
 * Extract headings from markdown body for Table of Contents.
 */
export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export function getHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  const lines = body.split("\n");
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].replace(/\*\*|__|[_`~\[\]()]/g, "").trim();
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      headings.push({ depth, slug, text });
    }
  }

  return headings;
}
