# Working in this repo

Conventions for drewrecker.com. See [README.md](README.md) for the full
architecture and [MIGRATION.md](MIGRATION.md) for the DNS cutover.

## Branch and PR — never commit to main

All changes go on a branch and reach `main` through a pull request.
**Do not commit or push directly to `main`.**

```bash
git checkout -b <type>/<short-slug>   # off an up-to-date main
# ...work, commit...
git push -u origin <branch>
gh pr create
```

Vercel builds a preview deployment per branch, so verify there before merging.
Only `main` deploys to production. After a merge, pull `main` and delete the
branch locally and on the remote.

This holds even for small or obviously-correct changes. The repo is public and
the site is a professional shopfront; the review gate is the point.

## The public site stays less specific than the resume

**This is the most important rule here.** Drew works technical program
management on cleared defense programs. Do not add to the site:

- Clearance level or special-access references — the site says
  "Active DoD Clearance — details available on request" and nothing more
- Program designations or nicknames
- Team sizes, campaign counts, schedule tempo
- Specific aircraft platforms tied to cross-domain or accreditation work
- His phone number

A resume is a directed disclosure to a named recruiter. This site is an
undirected, permanently indexed broadcast. No single item above is a
disclosure; a page assembling all of them is a targeting profile.

When updating from a newer resume, describe what the work **is**, not what it
is **called**. The same rationale is at the top of `src/content/resume.ts`.

## Content lives in two places

| What | Where |
| --- | --- |
| Everything on the homepage | `src/content/resume.ts` |
| Blog posts | `src/content/posts/*.mdx` (auto-discovered, no index) |

Post images go in `public/blog/`. `<Figure>` and `<Callout>` are available in
MDX without importing.

## Do not "fix" these — they are deliberate

| Thing | Why it looks wrong but isn't |
| --- | --- |
| ESLint pinned to 9 | `eslint-plugin-react` calls `context.getFilename()`, removed in ESLint 10. Lint crashes on 10. |
| TypeScript on 6, not 7 | `typescript-eslint` peer range is `>=4.8.4 <6.1.0`. TS 7 hard-fails lint. |
| `@types/node` on 24, not 26 | Matched to the Node 24 runtime on purpose. |
| `'unsafe-inline'` in `script-src` | Next emits inline hydration scripts; removing it forces every page out of static generation. |
| HSTS without `preload` | Preload-list removal takes months. Not warranted pre-cutover. |
| No `openGraph.images` on blog posts | An explicit value overrides the generated per-post OG card. |

## Before opening a PR

```bash
npm run build && npm run lint && npx tsc --noEmit
```

Verify rendered output rather than assuming — the preview deployment exists for
this.
