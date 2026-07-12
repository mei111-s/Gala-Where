import { Baloo_2, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AREAS } from "@/lib/data";
import SearchBar from "@/components/SearchBar";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Liyag | Manila Date & Friend Spots",
  description: "Our little map of cute date and hangout spots around Manila.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="font-body text-ink">
        <header className="bg-sandlight border-b border-mauve/20 sticky top-0 z-30">
          <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
            <Link href="/" className="font-display text-2xl font-extrabold text-maroon tracking-tight shrink-0">
              Liyag
            </Link>
            <div className="flex-1 flex justify-center min-w-[180px]">
              <SearchBar />
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/about"
                className="hidden sm:inline font-mono text-xs text-inkmuted hover:text-cherry transition-colors"
              >
                about
              </Link>
              <Link
                href="/submit"
                className="hidden sm:inline font-mono text-xs text-inkmuted hover:text-cherry transition-colors"
              >
                suggest a spot
              </Link>
              <Link
                href="/admin"
                className="pill-chip rounded-pill px-4 py-2 bg-cherry text-ivory font-display font-bold text-sm shadow-pop"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Area quick-nav strip */}
          <nav className="bg-maroon">
            <div className="max-w-5xl mx-auto px-5 py-2.5 flex items-center gap-5 overflow-x-auto">
              {AREAS.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${area.slug}`}
                  className="text-ivory/85 hover:text-ivory font-display font-semibold text-sm whitespace-nowrap transition-colors"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-5 py-8">{children}</main>

        <footer className="mt-10">
          <div className="bg-maroon text-ivory text-center py-4 font-display font-bold">
            Liyag — our little map of Manila, made with love
          </div>
        </footer>
      </body>
    </html>
  );
}