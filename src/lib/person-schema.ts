import { education, profile, socials } from "@/content/resume";

/**
 * schema.org Person for the homepage. This is what lets search engines connect
 * drewrecker.com to the name "Drew Recker" and fold the scattered profiles in
 * `sameAs` into a single identity rather than treating them as unrelated pages.
 *
 * Built from the resume module so it cannot drift from the rendered page.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.site,
    image: `${profile.site}${profile.photo}`,
    email: `mailto:${profile.email}`,
    jobTitle: "Technical Program Manager",
    description: profile.tagline,
    worksFor: {
      "@type": "Organization",
      name: "Lockheed Martin Skunk Works",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fort Worth",
      addressRegion: "TX",
      addressCountry: "US",
    },
    alumniOf: education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.org,
    })),
    knowsAbout: [
      "Technical Program Management",
      "Flight Test",
      "Mission Systems Integration",
      "Cybersecurity Architecture",
      "Cross Domain Solutions",
      "Risk Management Framework",
      "Open Mission Systems",
      "DevSecOps",
    ],
    sameAs: socials.map((s) => s.href),
  };
}
