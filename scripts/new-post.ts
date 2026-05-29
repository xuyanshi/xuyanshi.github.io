#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Create a new blog post with correct frontmatter.
 *
 * Usage:
 *   pnpm new "My Post Title"
 *   pnpm new "My Post Title" --tags "algorithm,leetcode"
 *   pnpm new "我的文章" --lang zh
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help") {
  console.log(`
Usage: pnpm new "Post Title" [options]

Options:
  --tags "tag1,tag2"   Comma-separated tags (default: others)
  --featured           Mark as featured post
  --draft              Create as draft

Examples:
  pnpm new "Quick Sort Explained"
  pnpm new "LeetCode 47. Permutations II" --tags "leetcode,backtracking"
  pnpm new "Draft Post" --draft
`);
  process.exit(0);
}

// Parse arguments
const title = args[0];
const tagsIdx = args.indexOf("--tags");
const tags =
  tagsIdx !== -1 && args[tagsIdx + 1]
    ? args[tagsIdx + 1].split(",").map((t: string) => t.trim())
    : ["others"];
const featured = args.includes("--featured");
const draft = args.includes("--draft");

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^\w\s-]/g, "") // remove special chars
  .replace(/\s+/g, "-") // spaces to hyphens
  .replace(/-+/g, "-") // collapse multiple hyphens
  .replace(/^-|-$/g, ""); // trim leading/trailing hyphens

// Generate filename with date prefix
const now = new Date();
const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
const filename = `${dateStr}-${slug}.md`;

// Determine year folder
const year = dateStr.split("-")[0];
const postsDir = join(
  import.meta.dirname ?? process.cwd(),
  "..",
  "src",
  "content",
  "posts",
  `_${year}`
);

// Create year directory if it doesn't exist
if (!existsSync(postsDir)) {
  mkdirSync(postsDir, { recursive: true });
}

const filePath = join(postsDir, filename);

// Check if file already exists
if (existsSync(filePath)) {
  console.error(`❌ File already exists: ${filename}`);
  process.exit(1);
}

// Generate frontmatter
const pubDatetime = `${dateStr}T${now.toTimeString().split(" ")[0]}+08:00`;
const frontmatter = [
  "---",
  `pubDatetime: ${pubDatetime}`,
  `title: "${title}"`,
  `slug: "${slug}"`,
  `featured: ${featured}`,
  `draft: ${draft}`,
  `tags: [${tags.join(", ")}]`,
  `# description: ""  # optional, auto-generated from first paragraph if omitted`,
  "---",
  "",
  `Write your content here...`,
  "",
].join("\n");

writeFileSync(filePath, frontmatter, "utf-8");

console.log(`✅ Created: src/content/posts/_${year}/${filename}`);
console.log(`   Title:    ${title}`);
console.log(`   Tags:     ${tags.join(", ")}`);
console.log(`   Featured: ${featured}`);
console.log(`   Draft:    ${draft}`);
