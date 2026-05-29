---
title: "Migrating My Blog from Jekyll to Astro Paper"
slug: "migrating-my-blog"
featured: true
draft: false
tags: [blog]
description: "博客技术栈迁移到了Astro Paper"
---

Today I migrated my personal blog from Jekyll to Astro Paper.

The original site was built on the traditional Ruby/Jekyll ecosystem and hosted on GitHub Pages. While the setup worked reliably for years, maintaining the toolchain gradually became frustrating — especially on modern macOS environments with Apple Silicon and newer Ruby versions.

Over time I ran into multiple issues including:

- Bundler dependency conflicts
- Native gem compilation problems
- `eventmachine` installation failures
- Ruby version incompatibilities
- Increasing maintenance overhead for a relatively simple static blog

Instead of continuing to patch the old stack, I decided to move to a more modern static-site workflow.

After evaluating several options including Next.js, Nextra, and Hugo, I eventually chose Astro Paper because it offers:

- excellent Markdown/MDX support
- extremely fast builds
- minimal JavaScript by default
- clean developer experience
- low maintenance overhead
- easy deployment to GitHub Pages

The new site is now powered by:

- Astro
- Astro Paper
- TypeScript
- pnpm
- GitHub Actions
- GitHub Pages

The migration process was surprisingly smooth once the deployment pipeline was configured correctly.

One interesting issue I encountered was that GitHub Pages automatically triggered its legacy Jekyll-based `pages-build-deployment` workflow in parallel with my Astro deployment workflow. Switching the repository's Pages source from “Deploy from branch” to “GitHub Actions” resolved the conflict.

Overall, the new stack feels dramatically more modern, lightweight, and maintainable than the previous Ruby/Jekyll setup.

I should probably have done this earlier.
