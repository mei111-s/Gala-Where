"use client";

import { useState } from "react";

export default function SpotCard({ spot }) {
  const [showCommute, setShowCommute] = useState(false);

  return (
    <div className="card-hover rounded-signboard overflow-hidden bg-cream border border-maroon/10 shadow-card flex flex-col">
      {spot.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-44 bg-blush flex items-center justify-center text-ink/30 font-mono text-xs">
          no photo yet
        </div>
      )}

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-lg text-maroon leading-tight">
              {spot.name}
            </h3>
            {spot.priceRange && (
              <span className="font-mono text-xs text-cherry font-bold whitespace-nowrap mt-1">
                {spot.priceRange}
              </span>
            )}
          </div>
          {spot.description && (
            <p className="text-inkmuted text-sm mt-1">{spot.description}</p>
          )}
        </div>

        {spot.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {spot.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded-pill bg-blushdeep text-inkmuted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2 flex flex-wrap gap-2 text-sm">
          {spot.mapsLink && (
            <a
              href={spot.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-pill bg-cherry text-ivory font-semibold hover:brightness-105 transition shadow-pop"
            >
              Maps
            </a>
          )}
          {spot.commute && (
            <button
              onClick={() => setShowCommute((v) => !v)}
              className="px-3 py-1.5 rounded-pill bg-blushdeep text-maroon font-semibold hover:brightness-95 transition"
            >
              Commute
            </button>
          )}
          {spot.menuLink && (
            <a
              href={spot.menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-pill bg-blushdeep text-maroon font-semibold hover:brightness-95 transition"
            >
              Menu
            </a>
          )}
        </div>

        {showCommute && spot.commute && (
          <p className="text-inkmuted text-xs bg-blush rounded-signboard p-3 leading-relaxed">
            {spot.commute}
          </p>
        )}
      </div>
    </div>
  );
}
