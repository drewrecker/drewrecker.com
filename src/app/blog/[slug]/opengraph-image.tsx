import { ImageResponse } from "next/og";
import { profile } from "@/content/resume";
import { formatDate, getSlugs, loadPost } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export default async function PostOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  const meta = post?.metadata;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: "72px 80px",
          color: "#f2f5f8",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#4ee2b5",
            }}
          >
            {meta?.tags?.length ? meta.tags.map((t) => `#${t}`).join("  ") : "Writing"}
          </div>
          <div
            style={{
              fontSize: meta && meta.title.length > 38 ? 76 : 92,
              fontWeight: 700,
              marginTop: 26,
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {meta?.title ?? "Drew Recker"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ height: 5, width: 180, background: "#4ee2b5", display: "flex" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 26,
              fontSize: 27,
              color: "#b9c0ca",
            }}
          >
            <span>{profile.name}</span>
            <span>{meta ? formatDate(meta.date) : ""}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
