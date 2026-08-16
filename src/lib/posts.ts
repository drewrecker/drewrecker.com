import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type PostMeta = {
  title: string;
  date: string; // ISO
  description: string;
  tags: string[];
  cover?: string;
  /** Original Squarespace path, preserved so old links keep resolving. */
  legacyPath?: string;
};

export type Post = PostMeta & {
  slug: string;
  displayDate: string;
};

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

/** Add a post by dropping an .mdx file in src/content/posts — no index to update. */
export function getSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

type PostModule = { metadata: PostMeta; default: ComponentType };

export async function loadPost(slug: string): Promise<PostModule | null> {
  if (!getSlugs().includes(slug)) return null;
  return (await import(`../content/posts/${slug}.mdx`)) as PostModule;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    getSlugs().map(async (slug) => {
      const mod = await loadPost(slug);
      if (!mod) return null;
      return { ...mod.metadata, slug, displayDate: formatDate(mod.metadata.date) };
    }),
  );

  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
