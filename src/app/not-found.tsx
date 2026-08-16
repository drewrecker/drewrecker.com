import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-32">
      <div
        aria-hidden
        className="grid-field pointer-events-none absolute inset-x-0 -top-16 h-96"
      />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          Error 404
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-bright sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-body">
          That page doesn&apos;t exist. It may have moved when this site left
          Squarespace — the old links should redirect, so if you followed one
          that didn&apos;t, I&apos;d like to know.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-void transition-transform hover:-translate-y-0.5 hover:bg-bright"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-body transition-colors hover:border-accent hover:text-bright"
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
