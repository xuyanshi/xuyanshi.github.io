import { getCollection, type CollectionEntry } from "astro:content";
import { getGitDates } from "./getGitDates";

type PostFilter = (entry: CollectionEntry<"posts">) => boolean;

type EnrichedPost = Omit<CollectionEntry<"posts">, "data"> & {
  data: Omit<
    CollectionEntry<"posts">["data"],
    "pubDatetime" | "modDatetime"
  > & {
    pubDatetime: Date;
    modDatetime: Date | null;
  };
};

/**
 * Load all posts and enrich pubDatetime/modDatetime from git history
 * when they are missing in frontmatter.
 *
 * After enrichment, pubDatetime is always a Date and modDatetime is Date | null.
 */
export async function getEnrichedPosts(
  filter?: PostFilter
): Promise<EnrichedPost[]> {
  const posts = await getCollection("posts", filter);

  return posts.map(post => {
    if (!post.data.pubDatetime || !post.data.modDatetime) {
      const gitDates = getGitDates(post.filePath);

      return {
        ...post,
        data: {
          ...post.data,
          pubDatetime:
            post.data.pubDatetime ?? gitDates.pubDatetime ?? new Date(0),
          modDatetime: post.data.modDatetime ?? gitDates.modDatetime ?? null,
        },
      } as EnrichedPost;
    }
    return post as EnrichedPost;
  });
}
