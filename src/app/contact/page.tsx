import type { Metadata } from "next";
import { profile } from "@/content/resume";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
  alternates: { canonical: "/contact" },
};

const RESUME_PREFILL =
  "I'd like to request a copy of your résumé.\n\n";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        Contact
      </p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight text-bright">
        Get in touch
      </h1>
      <p className="mt-6 text-pretty text-lg leading-relaxed text-body">
        Opportunities, questions, or a résumé request — this reaches my inbox
        directly, and replies go straight back to you.
      </p>

      <div className="mt-12">
        <ContactForm
          initialMessage={topic === "resume" ? RESUME_PREFILL : ""}
        />
      </div>
    </div>
  );
}
