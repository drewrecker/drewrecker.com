# drewrecker.com

Personal site for Drew Recker — technical program management, mission systems,
and flight test. Rebuilt from a Squarespace site as a static Next.js app on
Vercel.

**Live (Vercel):** https://drewreckercom.vercel.app
**Custom domain:** not yet cut over — `drewrecker.com` still serves Squarespace.
See [MIGRATION.md](MIGRATION.md).

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.3.1 (App Router, Turbopack) |
| UI | React 19.2.8 |
| Styling | Tailwind CSS 4 + `@tailwindcss/typography` |
| Content | TypeScript module (resume) + MDX (blog) |
| Language | TypeScript 6.0.3 |
| Runtime | Node 24 LTS |
| Hosting | Vercel — account `drewrecker`, project `drewrecker.com` |

Everything is prerendered. There is no database, no CMS, and no client-side
data fetching.

## Local development

```bash
npm install
```

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run lint`, `npx tsc --noEmit`.

---

## Editing content

### The resume

Everything on the homepage renders from **[`src/content/resume.ts`](src/content/resume.ts)** —
profile, experience, credentials, education, capabilities, service, and
competitions. Edit that one file; there is no layout to touch.

> [!IMPORTANT]
> **The public site is deliberately less specific than the PDF resume.**
>
> A resume is a directed disclosure to a named recruiter. This site is an
> undirected broadcast to anyone, permanently, including scrapers. The
> following are intentionally **kept off the site** and must stay off:
>
> - Clearance level and any special-access references — the site says
>   "Active DoD Clearance — details available on request" and nothing more
> - Program designations and nicknames
> - Team sizes, campaign counts, schedule tempo
> - Specific aircraft platforms tied to cross-domain or accreditation work
> - Phone number
>
> No single item above is a disclosure. A public page assembling all of them
> is a targeting profile. The detailed resume goes out by email on request.
>
> This rationale is repeated at the top of `resume.ts` so it survives contact
> with a future edit.

### Blog posts

MDX files in `src/content/posts/`. Drop in a new `.mdx` file and it is picked
up automatically — there is no index to update. Each post begins with an
exported `metadata` object:

```mdx
export const metadata = {
  title: "Post title",
  date: "2026-08-16",
  description: "One or two sentences, used for previews and social cards.",
  tags: ["security"],
  cover: "/blog/some-image.webp",
};

Body copy starts here.
```

Two components are available inside posts without importing them:

| Component | Purpose |
| --- | --- |
| `<Figure src alt caption priority />` | Optimized image with a caption |
| `<Callout>…</Callout>` | Bordered aside (used for the disclaimer) |

Post images go in `public/blog/`. Standard Markdown works, including GFM
tables (via `remark-gfm`).

---

## Architecture

```
src/
  app/
    page.tsx                        homepage — renders from resume.ts
    layout.tsx                      shell, metadata, header/footer, analytics
    not-found.tsx                   custom 404
    globals.css                     theme tokens, motion, print styles
    icon.tsx                        favicon, generated at build
    opengraph-image.tsx             homepage social card, generated
    robots.ts / sitemap.ts          generated from content
    rss.xml/route.ts                RSS feed
    blog/
      page.tsx                      post index
      [slug]/page.tsx               post renderer
      [slug]/opengraph-image.tsx    per-post social card, generated
  components/section.tsx            Section + TimelineItem primitives
  content/
    resume.ts                       ← all resume content
    posts/*.mdx                     ← all blog posts
  lib/
    posts.ts                        post discovery + metadata loading
    person-schema.ts                schema.org Person, built from resume.ts
  mdx-components.tsx                Figure, Callout, table styling
```

### Conventions worth knowing

- **Scroll reveals use native CSS** `animation-timeline: view()` — no
  JavaScript, no animation library. Browsers without support (currently
  Firefox) render the finished state rather than nothing. All motion is gated
  behind `prefers-reduced-motion`.
- **Structured data is derived, not duplicated.** `person-schema.ts` builds
  the schema.org `Person` from `resume.ts`, so the two cannot drift.
- **Blog OG cards are generated per post** by `blog/[slug]/opengraph-image.tsx`.
  Do not set `openGraph.images` in `generateMetadata` — an explicit value there
  overrides the file convention.
- **Print styles matter.** Recruiters print or save-as-PDF; `@media print` in
  `globals.css` strips chrome, inverts the dark theme, and spells out link
  destinations.

---

## Preserved URLs

Every URL from the old Squarespace sitemap permanently redirects, so existing
links and search results keep working. Defined in [`next.config.ts`](next.config.ts):

| Old | New |
| --- | --- |
| `/home` | `/` |
| `/blog/2019/10/3/how-sears-killed-the-mall` | `/blog/how-sears-killed-the-mall` |
| `/blog/tag/:slug` | `/blog` |
| `/blog/category/:slug` | `/blog` |

## Security posture

Set in `next.config.ts` and `public/.well-known/security.txt`:

- **CSP**, HSTS (`max-age=63072000; includeSubDomains`), `nosniff`,
  `X-Frame-Options: DENY`, `frame-ancestors 'none'`, Referrer-Policy,
  Permissions-Policy
- **RFC 9116 `security.txt`** with a disclosure contact

Two deliberate choices:

- `script-src` keeps `'unsafe-inline'` because Next emits inline hydration
  scripts. Removing it requires per-request nonces via middleware, which forces
  every page out of static generation. Bad trade for a fully prerendered site.
- HSTS ships **without `preload`**. Preload-list removal takes months; that
  commitment isn't warranted before the domain has even cut over.

CSP relaxes in development only (React needs `eval`, analytics loads a debug
script cross-origin). Production is strict.

## Deployment

Pushes to `main` deploy automatically via the Vercel GitHub integration.
Manual deploy:

```bash
vercel deploy --prod
```

---

## Known constraints

These are current ecosystem limits, not oversights. Re-check periodically.

| Item | State | Why |
| --- | --- | --- |
| ESLint | Pinned to 9 | `eslint-plugin-react` (transitive via `eslint-config-next`) calls `context.getFilename()`, removed in ESLint 10. Lint crashes on 10. |
| TypeScript | 6.0.3, not 7 | `typescript-eslint` peer range is `>=4.8.4 <6.1.0`. TS 7 hard-fails lint; support tracked in [typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940). |
| `@types/node` | 24, not 26 | Deliberately matched to the Node 24 runtime. Types for 26 would describe APIs the runtime lacks. |
| Speed Insights | Not enabled | Hobby plan allows one project at a time; the slot is used by `deletable-website`. |

`npm audit`: 0 vulnerabilities.

---

## Outstanding work

Ordered by dependency. Full DNS detail in [MIGRATION.md](MIGRATION.md).

### Blocking the domain cutover

- [ ] **Release the domains from the `drtechventures` Vercel account.** The old
      project still claims `drewrecker.com` and `www.drewrecker.com`, which
      blocks this project from adding them (`domain_not_owned`, 403). In the
      `drtechventures` dashboard: project `drewrecker-com` → Settings →
      Domains → remove both, then delete the project.
- [ ] **Add both domains** to the `drewrecker.com` project once released.
- [ ] **Cut DNS over** — change the apex `A` record to `76.76.21.21` and the
      `www` CNAME to `cname.vercel-dns.com`. ⚠️ **Do not move nameservers**;
      see the email warning in [MIGRATION.md](MIGRATION.md).
- [ ] **Verify email still works** — `dig +short MX drewrecker.com` must still
      return iCloud, and send a test message to `drew@drewrecker.com`.
- [ ] **Cancel the Squarespace website plan** — only after the cutover is
      verified, and only the *website plan*. The domain registration is a
      separate product at the same vendor; cancelling it would lose the domain.

### Features

- [ ] **Contact form.** Currently the site uses `mailto:` links, which silently
      fail for visitors using browser webmail with no registered mail handler —
      an invisible loss of inbound contact. Plan: provision Resend via the
      Vercel Marketplace, add a `/contact` route posting to a Function, with a
      honeypot and rate limiting. **Blocked:** Resend requires accepting its
      marketplace terms in a browser, and the earlier link was scoped to the
      old Vercel account, so it must be redone.
- [ ] **Speed Insights**, if the Hobby single-project slot is freed or the
      account moves to Pro.

### Content decisions for Drew

- [ ] **Replace the hero photo.** It is a cropped promo shot; a proper headshot
      would suit the current positioning better.
- [ ] **Verify the three "closed Sears store" photo captions.** The original
      Squarespace captions distinguished Hurst, TX from Paradise Valley, AZ;
      the file-to-caption mapping in the migrated post is inference.
- [ ] **Decide on dropped sections.** The Conferences list (10 entries,
      2014–2020) and the Desert Springs Bible Church volunteer entry were
      removed as dated. Each is a one-line restore in `resume.ts`.
- [ ] **Teaching Assistant role** is currently omitted; restore if wanted.
