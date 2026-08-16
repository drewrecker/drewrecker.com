import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { profile, socials } from "@/content/resume";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name} — Technical Program Management`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    url: "/",
  },
  other: { "theme-color": "#08090b" },
  twitter: { card: "summary_large_image", creator: "@drewwrecker" },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-void/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-bright transition-colors hover:text-accent"
        >
          <span className="text-accent">~/</span>
          drewrecker
        </Link>
        <div className="flex items-center gap-7 font-mono text-sm text-mute">
          <Link href="/#experience" className="transition-colors hover:text-bright">
            Resume
          </Link>
          <Link href="/blog" className="transition-colors hover:text-bright">
            Blog
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="hidden text-accent transition-colors hover:text-bright sm:inline"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-line/60">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <a
          href={`mailto:${profile.email}`}
          className="link-sweep font-mono text-lg text-bright"
        >
          {profile.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm text-mute">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {s.name}
            </a>
          ))}
        </div>
        <p className="mt-10 font-mono text-xs text-mute/70">
          © {profile.name} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
