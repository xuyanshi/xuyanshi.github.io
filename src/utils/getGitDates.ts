import { execSync } from "node:child_process";

/**
 * Get the first commit date (creation) and last commit date (modification)
 * for a given file from git history.
 */
export function getGitDates(filePath: string | undefined) {
  if (!filePath) return { pubDatetime: undefined, modDatetime: undefined };
  let pubDatetime: Date | undefined;
  let modDatetime: Date | undefined;

  try {
    // First commit date (creation)
    const first = execSync(
      `git log --diff-filter=A --format="%aI" -- "${filePath}"`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
    )
      .trim()
      .split("\n")
      .filter(Boolean)
      .pop();

    if (first) {
      pubDatetime = new Date(first);
    }
  } catch {
    // file not tracked by git yet
  }

  try {
    // Latest commit date (modification)
    const last = execSync(`git log -1 --format="%aI" -- "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();

    if (last) {
      modDatetime = new Date(last);
    }
  } catch {
    // ignore
  }

  return { pubDatetime, modDatetime };
}
