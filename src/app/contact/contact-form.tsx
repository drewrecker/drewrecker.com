"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-[15px] text-bright " +
  "placeholder:text-mute/80 transition-colors focus:border-accent focus:outline-none";

export function ContactForm({ initialMessage = "" }: { initialMessage?: string }) {
  // Stamped on first render so the server can reject implausibly fast submits.
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
          startedAt,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-accent/40 bg-accent/5 p-8"
      >
        <p className="font-mono text-sm text-accent">Message sent</p>
        <p className="mt-3 text-body">
          Thanks — that reached my inbox. I&apos;ll get back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs text-mute">
            Name
          </label>
          <input id="name" name="name" required maxLength={100} className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-xs text-mute">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs text-mute">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          maxLength={5000}
          defaultValue={initialMessage}
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot. Hidden from people and from screen readers; bots fill it. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-bright">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-accent px-6 py-3 font-mono text-sm text-void transition-transform hover:-translate-y-0.5 hover:bg-bright disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
