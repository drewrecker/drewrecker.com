# drewrecker.com

Personal site for Drew Recker — cybersecurity and technical program management.
Migrated off Squarespace to Next.js on Vercel.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Content | TypeScript module (resume) + MDX (blog) |
| Hosting | Vercel |

## Local development

```bash
npm install
npm run dev
```

## Editing content

**The resume** lives entirely in [`src/content/resume.ts`](src/content/resume.ts).
Every section on the homepage — experience, education, skills, conferences,
volunteering, competitions — renders from that one file. Edit it and the page
follows; there is no layout to touch.

**Blog posts** are MDX files in `src/content/posts/`. Drop in a new `.mdx` file
and it is picked up automatically — no index to update. Each post starts with an
exported `metadata` object:

```mdx
export const metadata = {
  title: "Post title",
  date: "2026-08-16",
  description: "One or two sentences used for previews and social cards.",
  tags: ["security"],
  cover: "/blog/some-image.webp",
};

Body copy starts here.
```

Two components are available inside posts without importing them:

- `<Figure src="…" alt="…" caption="…" />` — an optimized image with a caption
- `<Callout>…</Callout>` — a bordered aside, used for the disclaimer

Images go in `public/blog/`. Standard Markdown works too, including GFM tables.

## Preserved URLs

Old Squarespace paths permanently redirect, so existing links and search results
keep working. These are defined in [`next.config.ts`](next.config.ts):

| Old | New |
| --- | --- |
| `/home` | `/` |
| `/blog/2019/10/3/how-sears-killed-the-mall` | `/blog/how-sears-killed-the-mall` |
| `/blog/tag/:slug` | `/blog` |
| `/blog/category/:slug` | `/blog` |

## Notes

- Scroll reveals use native CSS `animation-timeline: view()` — no JavaScript and
  no animation library. Browsers without support (currently Firefox) render the
  finished state rather than nothing.
- All motion is gated behind `prefers-reduced-motion`.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` are generated from the content.
- Social card and favicon are generated at build time from `next/og`.
