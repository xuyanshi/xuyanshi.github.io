#!/bin/bash
#
# Automatically set pubDatetime and modDatetime in blog post frontmatter
# based on git commit history.
#
# - pubDatetime:  set to the date of the first commit for the file (only if missing)
# - modDatetime:  set to the date of the most recent commit for the file
#

set -e

# Get files changed in the latest commit
CHANGED_FILES=$(git diff-tree --no-commit-id --name-only -r HEAD -- 'src/content/posts/*.md' 'src/content/posts/*.mdx' || true)

if [ -z "$CHANGED_FILES" ]; then
  exit 0
fi

for FILE in $CHANGED_FILES; do
  # Skip if file doesn't exist (e.g. deleted)
  [ -f "$FILE" ] || continue

  # Get first commit date (creation date)
  FIRST_DATE=$(git log --diff-filter=A --format="%aI" -- "$FILE" 2>/dev/null | tail -1)

  # Get latest commit date (modification date)
  LAST_DATE=$(git log -1 --format="%aI" -- "$FILE" 2>/dev/null)

  # Fallback: if no first date found, use the very first commit of the file
  if [ -z "$FIRST_DATE" ]; then
    FIRST_DATE=$(git log --format="%aI" -- "$FILE" 2>/dev/null | tail -1)
  fi

  [ -z "$FIRST_DATE" ] && continue
  [ -z "$LAST_DATE" ] && continue

  # Check if pubDatetime already exists in frontmatter
  HAS_PUB=$(grep -m1 '^pubDatetime:' "$FILE" 2>/dev/null || true)

  if [ -z "$HAS_PUB" ]; then
    # Add pubDatetime after the first --- line
    sed -i '' "1s/^---$/---\npubDatetime: ${FIRST_DATE}/" "$FILE"
  fi

  # Update modDatetime (add or replace)
  if grep -q '^modDatetime:' "$FILE" 2>/dev/null; then
    sed -i '' "s/^modDatetime:.*/modDatetime: ${LAST_DATE}/" "$FILE"
  else
    # Add modDatetime after pubDatetime line
    sed -i '' "/^pubDatetime:/a\\
modDatetime: ${LAST_DATE}
" "$FILE"
  fi

  # Re-stage the file so the date changes are included in the commit
  git add "$FILE"

  echo "📅 Updated dates for $FILE (created: $FIRST_DATE, modified: $LAST_DATE)"
done
