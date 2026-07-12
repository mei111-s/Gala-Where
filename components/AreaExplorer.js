"use client";

import { useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/data";
import SpotCard from "@/components/SpotCard";

export default function AreaExplorer({ spots }) {
  const categoriesWithSpots = useMemo(() => {
    const slugsPresent = new Set(spots.map((s) => s.category));
    return CATEGORIES.filter((c) => slugsPresent.has(c.slug));
  }, [spots]);

  const [activeCategory, setActiveCategory] = useState(
    categoriesWithSpots[0]?.slug || null
  );
  const [activeTag, setActiveTag] = useState(null);

  const spotsInCategory = useMemo(
    () => spots.filter((s) => s.category === activeCategory),
    [spots, activeCategory]
  );

  const availableTags = useMemo(() => {
    const set = new Set();
    spotsInCategory.forEach((s) => (s.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [spotsInCategory]);

  const visibleSpots = useMemo(() => {
    if (!activeTag) return spotsInCategory;
    return spotsInCategory.filter((s) => (s.tags || []).includes(activeTag));
  }, [spotsInCategory, activeTag]);

  if (spots.length === 0) {
    return (
      <p className="text-inkmuted mt-6">
        No spots here yet — add some from{" "}
        <a href="/admin" className="text-cherry underline">
          /admin
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categoriesWithSpots.map((cat) => (
          <button
            key={cat.slug}
            data-active={activeCategory === cat.slug}
            onClick={() => {
              setActiveCategory(cat.slug);
              setActiveTag(null);
            }}
            className="pill-chip rounded-pill px-4 py-2 font-display font-semibold text-sm bg-cream border border-maroon/10 text-maroon"
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            data-active={activeTag === null}
            onClick={() => setActiveTag(null)}
            className="pill-chip rounded-pill px-3 py-1 font-mono text-[11px] uppercase text-inkmuted bg-blushdeep"
          >
            all
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              data-active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
              className="pill-chip rounded-pill px-3 py-1 font-mono text-[11px] uppercase text-inkmuted bg-blushdeep"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Spot grid */}
      {visibleSpots.length === 0 ? (
        <p className="text-inkmuted">No spots match that filter yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  );
}
