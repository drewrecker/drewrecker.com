import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * `script-src` carries 'unsafe-inline' because Next.js emits inline bootstrap
 * and hydration scripts. Removing it requires per-request nonces via
 * middleware, which forces every page out of static generation — a bad trade
 * for a site that is entirely prerendered. Everything else is locked down:
 * no framing, no plugins, no arbitrary form targets, no base-tag hijacking.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // Dev only: React's development build needs eval() for its debugging
  // features, and @vercel/analytics loads a debug script from its own host.
  // Production serves analytics same-origin from /_vercel/insights.
  `script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""
  }`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Dev only: the HMR websocket.
  `connect-src 'self'${isDev ? " ws: https://va.vercel-scripts.com" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // No `preload` directive: preload-list removal takes months, and the site
  // does not yet need that commitment. max-age alone is still strong.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
