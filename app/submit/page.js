"use client";

import { useState } from "react";
import AdminSpotForm from "@/components/AdminSpotForm";

export default function SubmitPage() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(payload) {
    setError("");
    const res = await fetch("/api/spots/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setDone(true);
    } else {
      const d = await res.json();
      setError(d.error || "Something went wrong, try again.");
    }
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center bg-cream border border-mauve/20 rounded-signboard p-8 shadow-card">
        <p className="text-4xl mb-3">💌</p>
        <h1 className="font-display text-2xl font-bold text-maroon mb-2">
          Thank you!
        </h1>
        <p className="text-inkmuted">
          Your spot has been sent in and will show up on the site once it's
          reviewed.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-5 px-5 py-2.5 rounded-pill bg-cherry text-ivory font-display font-bold shadow-pop hover:brightness-105 transition"
        >
          Suggest another
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-maroon mb-2">
        Suggest a spot
      </h1>
      <p className="text-inkmuted mb-6 max-w-lg">
        Found a cute place we should add? Fill this in — it'll get reviewed
        before it shows up on the site.
      </p>
      {error && <p className="text-cherry mb-4">{error}</p>}
      <AdminSpotForm onSubmit={handleSubmit} submitLabel="Send it in" />
    </div>
  );
}