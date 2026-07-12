"use client";

import { useState, useEffect } from "react";
import { AREAS, CATEGORIES } from "@/lib/data";

const EMPTY = {
  area: AREAS[0]?.slug || "",
  category: CATEGORIES[0]?.slug || "",
  name: "",
  description: "",
  image: "",
  mapsLink: "",
  commute: "",
  menuLink: "",
  priceRange: "",
  tags: "",
};

export default function AdminSpotForm({ initial, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        ...EMPTY,
        ...initial,
        tags: (initial.tags || []).join(", "),
      });
    } else {
      setForm(EMPTY);
    }
  }, [initial]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    await onSubmit(payload);
    setSaving(false);
  }

  const inputClass =
    "w-full rounded-signboard bg-blush border border-maroon/10 px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-cherry/40";
  const labelClass = "block font-mono text-xs text-inkmuted mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid sm:grid-cols-2 gap-4 bg-cream border border-maroon/10 rounded-signboard p-5 shadow-card"
    >
      <div>
        <label className={labelClass}>Area</label>
        <select
          value={form.area}
          onChange={(e) => update("area", e.target.value)}
          className={inputClass}
        >
          {AREAS.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className={inputClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
          placeholder="e.g. Neko Cafe"
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Short description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="What makes it worth going?"
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>Image URL</label>
        <input
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          className={inputClass}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className={labelClass}>Google Maps link</label>
        <input
          value={form.mapsLink}
          onChange={(e) => update("mapsLink", e.target.value)}
          className={inputClass}
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div>
        <label className={labelClass}>Menu link (optional)</label>
        <input
          value={form.menuLink}
          onChange={(e) => update("menuLink", e.target.value)}
          className={inputClass}
          placeholder="https://..."
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>How to get there by commute</label>
        <textarea
          value={form.commute}
          onChange={(e) => update("commute", e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="e.g. Ride any Ayala-bound jeep, get off at..."
        />
      </div>

      <div>
        <label className={labelClass}>Price range (optional)</label>
        <input
          value={form.priceRange}
          onChange={(e) => update("priceRange", e.target.value)}
          className={inputClass}
          placeholder="₱ / ₱₱ / ₱₱₱"
        />
      </div>

      <div>
        <label className={labelClass}>Tags (comma separated)</label>
        <input
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          className={inputClass}
          placeholder="budget, japanese, cat cafe"
        />
      </div>

      <div className="sm:col-span-2 flex gap-2 mt-1">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-pill bg-cherry text-ivory font-display font-bold shadow-pop hover:brightness-105 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-pill bg-blushdeep text-maroon font-semibold hover:brightness-95 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
