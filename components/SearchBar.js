"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { areaBySlug, categoryBySlug } from "@/lib/data";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [allSpots, setAllSpots] = useState(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/spots")
      .then((r) => r.json())
      .then((d) => setAllSpots(d.spots || []));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results =
    query.trim().length > 0 && allSpots
      ? allSpots
          .filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 8)
      : [];

  function goToSpot(spot) {
    setOpen(false);
    setQuery("");
    router.push(`/${spot.area}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (results.length > 0) goToSpot(results[0]);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-cream rounded-pill border border-mauve/30 overflow-hidden"
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder="Search a spot..."
          className="flex-1 bg-transparent px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="px-4 py-2 bg-cherry text-ivory text-sm font-semibold hover:brightness-105 transition"
        >
          🔍
        </button>
      </form>

      {open && query.trim().length > 0 && (
        <div className="absolute mt-2 w-full bg-cream border border-mauve/20 rounded-signboard shadow-card overflow-hidden z-20">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-inkmuted">No spots found.</p>
          ) : (
            results.map((spot) => (
              <button
                key={spot.id}
                onClick={() => goToSpot(spot)}
                className="w-full text-left px-4 py-2.5 hover:bg-blushdeep transition flex items-center justify-between gap-2"
              >
                <span className="font-display font-semibold text-maroon text-sm truncate">
                  {spot.name}
                </span>
                <span className="font-mono text-[10px] text-ink/40 whitespace-nowrap">
                  {areaBySlug(spot.area)?.name} · {categoryBySlug(spot.category)?.name}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
