import { notFound } from "next/navigation";
import Link from "next/link";
import { areaBySlug, categoryBySlug } from "@/lib/data";
import { getSpotById } from "@/lib/store";

export default async function SpotDetailPage({ params }) {
  const spot = await getSpotById(params.id);

  if (!spot || spot.area !== params.area || spot.status !== "published") {
    notFound();
  }

  const area = areaBySlug(spot.area);
  const category = categoryBySlug(spot.category);

  return (
    <div>
      <Link
        href={`/${spot.area}`}
        className="font-mono text-xs text-inkmuted hover:text-cherry"
      >
        ← back to {area?.name}
      </Link>

      <div className="mt-3 rounded-signboard overflow-hidden bg-cream border border-mauve/20 shadow-card">
        {spot.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-64 sm:h-80 object-cover"
          />
        ) : (
          <div className="w-full h-64 sm:h-80 bg-blush flex items-center justify-center text-inkmuted font-mono text-sm">
            no photo yet
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-inkmuted mb-1">
                {category?.icon} {category?.name} · {area?.name}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-maroon leading-tight">
                {spot.name}
              </h1>
              {spot.address && (
                <p className="text-inkmuted text-sm mt-1">{spot.address}</p>
              )}
            </div>
            {spot.priceRange && (
              <span className="font-mono text-sm text-cherry font-bold whitespace-nowrap">
                {spot.priceRange}
              </span>
            )}
          </div>

          {spot.description && (
            <p className="text-ink mt-4 leading-relaxed">{spot.description}</p>
          )}

          {spot.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {spot.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-pill bg-blushdeep text-inkmuted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-6">
            {spot.mapsLink && (
              
                href={spot.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-pill bg-cherry text-ivory font-display font-bold shadow-pop hover:brightness-105 transition"
              >
                Open in Maps
              </a>
            )}
            {spot.menuLink && (
              
                href={spot.menuLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-pill bg-blushdeep text-maroon font-semibold hover:brightness-95 transition"
              >
                View menu
              </a>
            )}
          </div>

          {spot.commute && (
            <div className="mt-6 bg-blush rounded-signboard p-4">
              <p className="font-display font-bold text-maroon text-sm mb-1">
                How to get there
              </p>
              <p className="text-inkmuted text-sm leading-relaxed">{spot.commute}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}