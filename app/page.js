import Link from "next/link";
import { AREAS } from "@/lib/data";
import { getAllSpots } from "@/lib/store";

const AREA_ICONS = {
  makati: "🏙️",
  bgc: "🌆",
  qc: "🏘️",
  manila: "🏛️",
  pasig: "🌉",
  pasay: "🛍️",
  mandaluyong: "☕",
};

export default async function HomePage() {
  const spots = await getAllSpots();

  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-signboard bg-maroon text-ivory px-6 py-10 sm:px-10 sm:py-14 mb-8">
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-cherry/40 hidden sm:block" />
        <div className="absolute bottom-4 right-16 w-16 h-16 rounded-full bg-gold/30 hidden sm:block" />
        <p className="font-mono text-xs uppercase tracking-widest text-gold mb-3">
          our spots, mapped by area
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-3 max-w-lg">
          Cute spots around Manila, picked by us.
        </h1>
        <p className="text-ivory/75 max-w-md mb-6">
          Pick a city to browse — food, cafes, activities, and more. Every
          spot comes with a map link, how to commute there, and the menu.
        </p>
        <Link
          href={`#areas`}
          className="inline-block pill-chip rounded-pill px-6 py-3 bg-cherry text-ivory font-display font-bold shadow-pop"
        >
          Browse areas ↓
        </Link>
      </section>

      {/* Area grid */}
      <section id="areas">
        <h2 className="font-display text-2xl font-bold text-maroon mb-4">
          Where to?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {AREAS.map((area) => {
            const count = spots.filter((s) => s.area === area.slug).length;
            return (
              <Link
                key={area.slug}
                href={`/${area.slug}`}
                className="card-hover group block rounded-signboard bg-cream border border-maroon/10 p-6 shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{AREA_ICONS[area.slug] || "📍"}</span>
                    <h3 className="font-display text-2xl font-bold text-maroon group-hover:text-cherry transition-colors">
                      {area.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-ink/40 mt-1 whitespace-nowrap">
                    {count} spot{count === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="text-inkmuted text-sm mt-2">{area.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
