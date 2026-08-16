import Image from "next/image";
import Link from "next/link";
import { Section, TimelineItem } from "@/components/section";
import {
  competitions,
  conferences,
  credentials,
  education,
  experience,
  profile,
  skills,
  summary,
  volunteer,
} from "@/content/resume";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="relative">
        <div
          aria-hidden
          className="grid-field pointer-events-none absolute inset-x-0 -top-16 h-[32rem]"
        />
        <div className="relative grid gap-12 py-20 md:grid-cols-[1fr_auto] md:items-center md:py-28">
          <div className="rise">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Cybersecurity · Program Management
            </p>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-bright sm:text-6xl md:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-body">
              {profile.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-void transition-transform hover:-translate-y-0.5 hover:bg-bright"
              >
                Get in touch
              </a>
              <Link
                href="/blog"
                className="rounded-full border border-line px-6 py-3 font-mono text-sm text-body transition-colors hover:border-accent hover:text-bright"
              >
                Read the blog
              </Link>
            </div>
          </div>
          <div className="rise relative mx-auto w-48 shrink-0 sm:w-56 md:w-64">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full bg-accent/15 blur-2xl"
            />
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={512}
              height={512}
              priority
              className="relative aspect-square rounded-full border border-line object-cover"
            />
          </div>
        </div>
      </section>

      <Section id="about" index="01" title="Profile">
        <div className="grid gap-6 text-[15px] leading-relaxed md:grid-cols-2">
          {summary.map((p) => (
            <p key={p.slice(0, 40)} className="text-pretty">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section id="experience" index="02" title="Experience">
        <ul>
          {experience.map((r) => (
            <TimelineItem
              key={`${r.title}-${r.start}`}
              title={r.title}
              org={r.org}
              meta={`${r.start} — ${r.end}`}
              current={r.current}
            />
          ))}
        </ul>
      </Section>

      <Section id="credentials" index="03" title="Certifications & Clearance">
        <div className="grid gap-4 sm:grid-cols-3">
          {credentials.map((c) => (
            <div
              key={c.name}
              className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <h3 className="text-sm font-medium text-bright">{c.name}</h3>
              <p className="mt-2 font-mono text-xs text-mute">{c.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="education" index="04" title="Education">
        <ul>
          {education.map((e) => (
            <TimelineItem
              key={e.degree}
              title={e.degree}
              org={e.org}
              meta={e.span}
            >
              {e.notes && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {e.notes.map((n) => (
                    <li
                      key={n}
                      className="rounded border border-line px-2 py-1 font-mono text-xs text-mute"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </TimelineItem>
          ))}
        </ul>
      </Section>

      <Section id="skills" index="05" title="Skills & Tools">
        <ul className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <li
              key={s}
              className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-sm text-body transition-colors hover:border-accent hover:text-accent"
            >
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="volunteer" index="06" title="Volunteer Experience">
        <ul>
          {volunteer.map((v) => (
            <TimelineItem
              key={`${v.role}-${v.org}`}
              title={v.role}
              org={v.org}
              meta={v.when}
            />
          ))}
        </ul>
      </Section>

      <Section id="conferences" index="07" title="Conferences">
        <div className="grid gap-x-8 gap-y-px sm:grid-cols-2">
          {conferences.map((c, i) => (
            <div
              key={`${c.name}-${c.year}-${i}`}
              className="flex items-baseline justify-between gap-4 border-b border-line/60 py-3.5"
            >
              <div>
                <span className="text-sm text-bright">{c.name}</span>
                <span className="ml-2 text-xs text-mute">{c.location}</span>
              </div>
              <span className="font-mono text-xs text-accent">{c.year}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="competitions" index="08" title="Competitions">
        <ul className="grid gap-3 sm:grid-cols-2">
          {competitions.map((c) => (
            <li key={c} className="flex items-start gap-3 text-sm text-body">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {posts.length > 0 && (
        <Section id="writing" index="09" title="Writing">
          <ul className="space-y-px">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-line/60 py-5 transition-colors hover:border-accent/60"
                >
                  <span className="text-base text-bright transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-mute">
                    {p.displayDate}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
