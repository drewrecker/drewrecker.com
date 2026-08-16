import { profile } from "@/content/resume";
import { getPosts } from "@/lib/posts";

const escape = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${profile.site}/blog/${p.slug}</link>
      <guid isPermaLink="true">${profile.site}/blog/${p.slug}</guid>
      <description>${escape(p.description)}</description>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(profile.name)}</title>
    <link>${profile.site}</link>
    <description>${escape(profile.tagline)}</description>
    <language>en-us</language>
    <atom:link href="${profile.site}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
