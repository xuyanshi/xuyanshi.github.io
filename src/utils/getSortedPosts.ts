import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";

/**
 * Returns posts that are eligible to be shown to users, sorted by “last updated”
 * descending (uses `modDatetime` when present, otherwise `pubDatetime`).
 *
 * Note: filtering respects drafts and scheduled posts via `postFilter()`.
 */
export function getSortedPosts(posts: CollectionEntry<"posts">[]) {
  return posts.filter(postFilter).sort((a, b) => {
    const dateA = new Date(a.data.modDatetime ?? a.data.pubDatetime ?? 0);
    const dateB = new Date(b.data.modDatetime ?? b.data.pubDatetime ?? 0);
    return (
      Math.floor(dateB.getTime() / 1000) - Math.floor(dateA.getTime() / 1000)
    );
  });
}
