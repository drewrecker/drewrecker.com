import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reveal scroll-mt-24 border-t border-line/60 py-16">
      <h2 className="mb-10 flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.2em] text-mute">
        <span className="text-accent">{index}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Left-hand rail with a node marker — used by timeline-shaped lists. */
export function TimelineItem({
  title,
  org,
  meta,
  current,
  children,
}: {
  title: string;
  org: string;
  meta: string;
  current?: boolean;
  children?: ReactNode;
}) {
  return (
    <li className="group relative border-l border-line pb-9 pl-7 last:pb-0">
      <span
        className={`absolute -left-[4.5px] top-1.5 size-2 rounded-full transition-colors ${
          current ? "bg-accent" : "bg-line group-hover:bg-accent"
        }`}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium text-bright">{title}</h3>
        <span className="font-mono text-xs text-mute">{meta}</span>
      </div>
      <p className="mt-1 text-sm text-body">{org}</p>
      {children}
    </li>
  );
}
