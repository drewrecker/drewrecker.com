# Squarespace → Vercel migration

The DNS cutover runbook. For the full task checklist, see
[README.md](README.md#outstanding-work).

## Done

- Site rebuilt as Next.js, deployed to Vercel under the personal `drewrecker`
  account, project `drewrecker.com`
- All resume content migrated, then rewritten from the August 2026 resume and
  held deliberately less specific than the PDF
- Blog post "How Sears Killed the Mall" migrated in full — all 12 photos, the
  Kenmore supplier table, every reference link
- Images pulled off the Squarespace CDN into `public/` (they are WebP, despite
  the `.jpg` names Squarespace served them under)
- Permanent redirects for every URL in the old Squarespace sitemap
- GitHub connected — pushes to `main` deploy automatically

## Not done

1. **Release both domains from the `drtechventures` account** (see below), then
   add them to the `drewrecker.com` project
2. **DNS cutover** (below) — **DNS has not been changed; the live site is still
   Squarespace**
3. **Cancel the Squarespace website plan** — only after the cutover is verified

## ⚠️ Read before touching DNS: your email runs on this domain

`drew@drewrecker.com` is hosted on **iCloud Mail**, and its records live in the
same DNS zone as the website. Breaking them breaks your email.

Current email records — **all of these must survive the cutover**:

| Type | Name | Value |
| --- | --- | --- |
| MX | `@` | `10 mx01.mail.icloud.com` |
| MX | `@` | `10 mx02.mail.icloud.com` |
| TXT | `@` | `v=spf1 include:icloud.com ~all` |
| TXT | `@` | `apple-domain=TgJuNimRccmM91v2` |
| CNAME | `sig1._domainkey` | `sig1.dkim.drewrecker.com.at.icloudmailadmin.com` |

**This is why we do not move nameservers.** Vercel offers two options; take the
first one:

- ✅ **Change only the A record.** Nameservers stay at Google Domains, so every
  email record above is left completely untouched. Lowest risk.
- ❌ **Move nameservers to Vercel.** This abandons the existing zone — you would
  have to hand-recreate all five email records, and any mistake silently drops
  mail. Not worth it.

## DNS cutover

The domain is registered at **Squarespace Domains II LLC**, with DNS served by
Google Domains nameservers (`ns-cloud-d{1..4}.googledomains.com`). You manage
these records in the Squarespace domain dashboard.

### Current records (website only)

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145` |
| CNAME | `www` | `ext-sq.squarespace.com` |

### Change to

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Delete all four Squarespace A records and replace them with the single Vercel A
record. Repoint the `www` CNAME. **Change nothing else.**

### Verify

Lower the TTL a day beforehand if you want a faster rollback. After the change:

```bash
vercel domains inspect drewrecker.com
```

```bash
dig +short A drewrecker.com && dig +short MX drewrecker.com
```

The A record should be `76.76.21.21` and the MX records must still show
`mx01/mx02.mail.icloud.com`. Vercel issues the TLS certificate automatically
once it sees the A record; this usually takes a few minutes.

Then send yourself a test email at `drew@drewrecker.com` before cancelling
anything at Squarespace.

### Rollback

Put the four original Squarespace A records back and restore the `www` CNAME to
`ext-sq.squarespace.com`. As long as the Squarespace plan is still active, the
old site returns once DNS propagates — which is exactly why you cancel the plan
last, not first.

## Vercel account

The site lives under the personal Vercel account **`drewrecker`**
(`drewreckers-projects`), project **`drewrecker.com`** — alongside
`drewrecker.dev` and `reckergroupllc`.

It was briefly built under the `drtechventures` account by mistake. That project
and its domain claims must be removed there; see "Outstanding" below.

GitHub is connected: pushes to `main` on `drewrecker/drewrecker.com` deploy
automatically. Manual deploys still work with:

```bash
vercel deploy --prod
```

## Outstanding cleanup on the drtechventures account

`drewrecker.com` and `www.drewrecker.com` are still claimed by the old project,
which blocks the personal account from adding them (`domain_not_owned`, 403).
From the `drtechventures` Vercel dashboard:

1. Project `drewrecker-com` → Settings → Domains → remove both
   `drewrecker.com` and `www.drewrecker.com`
2. Delete the `drewrecker-com` project

This is safe at any time: DNS still points at Squarespace, so nothing live
depends on those claims. Once removed, add them to the personal project.
