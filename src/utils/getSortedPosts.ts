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
    // Primary: pubDatetime descending (newest creation date first)
    const pubA = Math.floor(new Date(a.data.pubDatetime ?? 0).getTime() / 1000);
    const pubB = Math.floor(new Date(b.data.pubDatetime ?? 0).getTime() / 1000);
    if (pubA !== pubB) return pubB - pubA;

    // Secondary: modDatetime descending (most recently modified first)
    const modA = Math.floor(new Date(a.data.modDatetime ?? 0).getTime() / 1000);
    const modB = Math.floor(new Date(b.data.modDatetime ?? 0).getTime() / 1000);
    return modB - modA;
  });
}
