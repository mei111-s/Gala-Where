// Add or edit areas here any time — no database migration needed.
export const AREAS = [
  { slug: "makati", name: "Makati", blurb: "⋆˚꩜｡" },
  { slug: "bgc", name: "Taguig", blurb: "⋆˚꩜｡" },
  { slug: "qc", name: "Quezon City", blurb: "⋆˚꩜｡" },
  { slug: "manila", name: "Manila", blurb: "⋆˚꩜｡" },
  { slug: "pasig", name: "Pasig", blurb: "⋆˚꩜｡" },
  { slug: "pasay", name: "Pasay", blurb: "⋆˚꩜｡" },
  { slug: "mandaluyong", name: "Mandaluyong", blurb: "⋆˚꩜｡" },
  { slug: "antipolo", name: "Antipolo", blurb: "⋆˚꩜｡" },
];

// Add or edit categories here — icons are just emoji, swap freely.
export const CATEGORIES = [
  { slug: "food", name: "Food", icon: "🍽️" },
  { slug: "cafes", name: "Cafes", icon: "☕" },
  { slug: "activities", name: "Activities", icon: "🎨" },
  { slug: "bars", name: "Bars & Nightlife", icon: "🍸" },
  { slug: "outdoors", name: "Parks & Outdoors", icon: "🌳" },
  { slug: "culture", name: "Museums & Culture", icon: "🖼️" },
];

export function areaBySlug(slug) {
  return AREAS.find((a) => a.slug === slug);
}

export function categoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}