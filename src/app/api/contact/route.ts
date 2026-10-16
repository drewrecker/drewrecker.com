import { profile } from "@/content/resume";

/**
 * Contact form endpoint. Sends via Resend's REST API — no SDK, since this is
 * one POST and the dependency would earn nothing.
 *
 * The only recipient is Drew himself, so no verified sending domain is needed:
 * Resend's free tier permits sending to the account holder's own address. The
 * visitor's address goes in reply_to, so replying reaches them directly.
 */

const MAX = { name: 100, email: 200, message: 5000 } as const;

/**
 * ponytail: spam control is a honeypot plus a minimum fill time. Both are
 * stateless, which is what lets this stay a static site with one function.
 * Ceiling: a targeted script that waits and skips the honeypot gets through.
 * Upgrade path is a real rate limiter keyed on IP (Upstash Redis via the
 * Vercel Marketplace) or Vercel BotID, neither of which is worth it until
 * abuse actually shows up.
 */
const MIN_FILL_MS = 3_000;

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — real users never see this field
  startedAt?: unknown;
};

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

// Deliberately permissive: the goal is catching typos, not enforcing RFC 5322.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("contact: RESEND_API_KEY is not set");
    return Response.json(
      { error: "Contact is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot tripped, or submitted implausibly fast. Report success so a bot
  // learns nothing from the response, but send nothing.
  const startedAt = Number(body.startedAt);
  const tooFast =
    Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (str(body.company) !== "" || tooFast) {
    return Response.json({ ok: true });
  }

  const name = str(body.name).slice(0, MAX.name);
  const email = str(body.email).slice(0, MAX.email);
  const message = str(body.message).slice(0, MAX.message);

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }
  if (!looksLikeEmail(email)) {
    return Response.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "drewrecker.com <onboarding@resend.dev>",
      to: [profile.email],
      reply_to: email,
      subject: `Contact form — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html:
        `<p><strong>${escapeHtml(name)}</strong> ` +
        `&lt;${escapeHtml(email)}&gt;</p>` +
        `<pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>`,
    }),
  });

  if (!res.ok) {
    // Log the provider's reason; never surface it to the client.
    console.error("contact: resend failed", res.status, await res.text());
    return Response.json(
      { error: "Could not send that message. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
