import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on cybersecurity, retail, and technology by Drew Recker.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        Writing
      </p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight text-bright">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-12 text-body">No posts yet.</p>
      ) : (
        <ul className="mt-14 space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="reveal">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-6 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/60"
              >
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt=""
                    width={260}
                    height={180}
                    className="hidden aspect-4/3 w-32 shrink-0 rounded-lg object-cover sm:block"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-mute">
                    <time dateTime={post.date}>{post.displayDate}</time>
                    {post.tags.map((t) => (
                      <span key={t} className="text-accent">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-2 text-xl font-medium text-bright transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
