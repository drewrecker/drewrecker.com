import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ReactNode } from "react";

function Figure({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="not-prose my-10">
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={900}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full rounded-lg border border-line object-cover"
      />
      {caption && (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-mute">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-lg border border-line bg-surface p-5 text-sm leading-relaxed text-mute [&_strong]:text-body">
      {children}
    </aside>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Figure,
    Callout,
    // Tables can be wider than the column; let them scroll rather than
    // pushing the page into horizontal overflow.
    table: (props) => (
      <div className="not-prose my-8 overflow-x-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-line bg-surface px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-accent"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-line/50 px-4 py-3 text-body" {...props} />
    ),
    ...components,
  };
}
