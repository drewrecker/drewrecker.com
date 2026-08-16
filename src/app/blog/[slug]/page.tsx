import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getSlugs, loadPost } from "@/lib/posts";
import { profile } from "@/content/resume";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};

  const { title, description, date } = post.metadata;
  // `images` is intentionally omitted: the opengraph-image.tsx in this segment
  // generates a branded card per post, and an explicit value here would win.
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: date,
      url: `/blog/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const { metadata: meta, default: Body } = post;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: meta.title,
            description: meta.description,
            datePublished: meta.date,
            author: { "@type": "Person", name: profile.name, url: profile.site },
          }),
        }}
      />

      <Link
        href="/blog"
        className="font-mono text-xs text-mute transition-colors hover:text-accent"
      >
        ← All posts
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-mute">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.tags.map((t) => (
            <span key={t} className="text-accent">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-bright sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-body">
          {meta.description}
        </p>
        <p className="mt-6 font-mono text-xs text-mute">
          Written by{" "}
          <Link href="/" className="text-accent hover:text-bright">
            {profile.name}
          </Link>
        </p>
      </header>

      <div
        className="prose prose-invert mt-12 max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-bright
          prose-h2:mt-14 prose-h2:border-t prose-h2:border-line prose-h2:pt-10 prose-h2:text-2xl
          prose-p:leading-relaxed prose-p:text-body
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-bright
          prose-blockquote:border-l-accent prose-blockquote:not-italic prose-blockquote:text-mute
          prose-li:text-body prose-li:marker:text-accent"
      >
        <Body />
      </div>
    </article>
  );
}
