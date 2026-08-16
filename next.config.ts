import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      // Squarespace URLs that are already indexed and linked from elsewhere.
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/blog/2019/10/3/how-sears-killed-the-mall",
        destination: "/blog/how-sears-killed-the-mall",
        permanent: true,
      },
      // Squarespace category/tag archives — fold them into the blog index.
      { source: "/blog/category/:slug", destination: "/blog", permanent: true },
      { source: "/blog/tag/:slug", destination: "/blog", permanent: true },
    ];
  },
};

export default createMDX({
  options: {
    // Tables, strikethrough, autolinks. Turbopack needs the plugin named as a
    // string — it serializes MDX options across the Rust boundary.
    remarkPlugins: [["remark-gfm", {}]],
  },
})(nextConfig);
