import Link from "next/link";
import { AREAS } from "@/lib/data";
import { getAllSpots } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const spots = await getAllSpots();

  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-signboard bg-maroon text-ivory px-6 py-12 sm:px-10 sm:py-16 mb-10">
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-cherry/40 hidden sm:block" />
        <div className="absolute bottom-4 right-16 w-16 h-16 rounded-full bg-gold/40 hidden sm:block" />
        <p className="font-mono text-xs uppercase tracking-widest text-gold mb-3">
          our spots, mapped by area
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-[1.05] mb-4 max-w-lg">
          Cute spots around Manila, picked by us.
        </h1>
        <p className="text-ivory max-w-md mb-7 text-base sm:text-lg">
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
                className="card-hover group relative block rounded-signboard overflow-hidden border border-mauve/20 shadow-card"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(76,61,116,0.95), rgba(139,111,184,0.85))",
                }}
              >
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-2xl font-bold text-ivory">
                      {area.name}
                    </h3>
                    <span className="font-mono text-xs text-ivory/80 mt-1 whitespace-nowrap">
                      {count} spot{count === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}