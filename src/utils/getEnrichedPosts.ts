import { getCollection, type CollectionEntry } from "astro:content";
import { getGitDates } from "./getGitDates";

type PostFilter = (entry: CollectionEntry<"posts">) => boolean;

type EnrichedPost = Omit<CollectionEntry<"posts">, "data"> & {
  data: Omit<
    CollectionEntry<"posts">["data"],
    "pubDatetime" | "modDatetime" | "description"
  > & {
    pubDatetime: Date;
    modDatetime: Date | null;
    description: string;
  };
};

function extractDescription(body: string, title: string): string {
  const lines = body.split("\n");
  const parts: string[] = [];
  let inCode = false;

  for (const line of lines) {
    const stripped = line.trim();
    if (stripped.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode || !stripped) continue;
    if (stripped.startsWith("#")) break;
    if (stripped.startsWith("![") || stripped.startsWith("<")) continue;
    if (stripped.startsWith(">")) continue;

    const clean = stripped
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .replace(/<[^>]+>/g, "");
    parts.push(clean);

    if (parts.join(" ").length > 150) break;
  }

  const desc = parts.join(" ").trim();
  if (!desc) return title;
  return desc.length > 160 ? desc.substring(0, 157) + "..." : desc;
}

/**
 * Load all posts and enrich metadata from git history and content
 * when fields are missing in frontmatter.
 */
export async function getEnrichedPosts(
  filter?: PostFilter
): Promise<EnrichedPost[]> {
  const posts = await getCollection("posts", filter);

  return posts.map(post => {
    const needsDates = !post.data.pubDatetime || !post.data.modDatetime;
    const needsDescription = !post.data.description;

    if (needsDates || needsDescription) {
      const gitDates = getGitDates(post.filePath);
      const description = needsDescription
        ? extractDescription(post.body ?? "", post.data.title)
        : post.data.description;

      return {
        ...post,
        data: {
          ...post.data,
          pubDatetime:
            post.data.pubDatetime ?? gitDates.pubDatetime ?? new Date(0),
          modDatetime: post.data.modDatetime ?? gitDates.modDatetime ?? null,
          description,
        },
      } as EnrichedPost;
    }
    return post as EnrichedPost;
  });
}
