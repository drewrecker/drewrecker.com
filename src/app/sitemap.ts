import type { MetadataRoute } from "next";
import { profile } from "@/content/resume";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [
    { url: profile.site, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.site}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${profile.site}/contact`, changeFrequency: "yearly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${profile.site}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
  ];
}
