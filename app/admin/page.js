"use client";

import { useEffect, useState } from "react";
import { AREAS, areaBySlug, categoryBySlug } from "@/lib/data";
import AdminSpotForm from "@/components/AdminSpotForm";

export default function AdminPage() {
  const [authed, setAuthed] = useState(null); // null = loading
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSpot, setEditingSpot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterArea, setFilterArea] = useState("all");
  const [tab, setTab] = useState("published"); // published | pending

  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authed));
  }, []);

  useEffect(() => {
    if (authed) refreshSpots();
  }, [authed]);

  async function refreshSpots() {
    setLoading(true);
    const res = await fetch("/api/spots?all=1");
    const data = await res.json();
    setSpots(data.spots || []);
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      const d = await res.json();
      setLoginError(d.error || "Login failed");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
  }

  async function handleAdd(payload) {
    const res = await fetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setShowForm(false);
      refreshSpots();
    }
  }

  async function handleUpdate(payload) {
    const res = await fetch(`/api/spots/${editingSpot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setEditingSpot(null);
      refreshSpots();
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this spot?")) return;
    await fetch(`/api/spots/${id}`, { method: "DELETE" });
    refreshSpots();
  }

  async function handleApprove(id) {
    await fetch(`/api/spots/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
    refreshSpots();
  }

  async function handleReject(id) {
    if (!confirm("Reject and delete this suggestion?")) return;
    await fetch(`/api/spots/${id}`, { method: "DELETE" });
    refreshSpots();
  }

  if (authed === null) {
    return <p className="text-inkmuted">Loading...</p>;
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-10 bg-cream border border-maroon/10 rounded-signboard p-6 shadow-card">
        <h1 className="font-display text-3xl font-bold text-maroon mb-4">Admin login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-signboard bg-blush border border-maroon/10 px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-cherry/40"
            autoFocus
          />
          {loginError && <p className="text-cherry text-sm">{loginError}</p>}
          <button
            type="submit"
            className="px-4 py-2.5 rounded-pill bg-cherry text-ivory font-display font-bold shadow-pop hover:brightness-105 transition"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  const pendingSpots = spots.filter((s) => s.status === "pending");
  const publishedSpots = spots.filter((s) => (s.status || "published") === "published");
  const visibleSpots =
    filterArea === "all" ? publishedSpots : publishedSpots.filter((s) => s.area === filterArea);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-maroon">Manage spots</h1>
        <button
          onClick={handleLogout}
          className="font-mono text-xs text-inkmuted hover:text-cherry"
        >
          log out
        </button>
      </div>

      {/* Published / Pending tabs */}
      <div className="flex gap-2 mb-6">
        <button
          data-active={tab === "published"}
          onClick={() => setTab("published")}
          className="pill-chip rounded-pill px-4 py-2 font-display font-semibold text-sm bg-blushdeep text-maroon"
        >
          Published ({publishedSpots.length})
        </button>
        <button
          data-active={tab === "pending"}
          onClick={() => setTab("pending")}
          className="pill-chip rounded-pill px-4 py-2 font-display font-semibold text-sm bg-blushdeep text-maroon"
        >
          Pending review {pendingSpots.length > 0 ? `(${pendingSpots.length})` : ""}
        </button>
      </div>

      {tab === "pending" && (
        <div className="mb-8">
          {loading ? (
            <p className="text-inkmuted">Loading...</p>
          ) : pendingSpots.length === 0 ? (
            <p className="text-inkmuted">
              No pending suggestions. Share{" "}
              <span className="font-mono text-xs">/submit</span> with your
              friends so they can send spots in.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {pendingSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="bg-cream border border-mauve/20 rounded-signboard px-4 py-3 shadow-card"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <p className="font-display font-bold text-maroon truncate">
                        {spot.name}
                      </p>
                      <p className="font-mono text-xs text-inkmuted">
                        {areaBySlug(spot.area)?.name} · {categoryBySlug(spot.category)?.name}
                      </p>
                      {spot.description && (
                        <p className="text-inkmuted text-sm mt-1">{spot.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(spot.id)}
                        className="px-3 py-1.5 rounded-pill bg-cherry text-ivory text-sm font-semibold hover:brightness-105 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(spot.id)}
                        className="px-3 py-1.5 rounded-pill bg-blushdeep text-maroon text-sm font-semibold hover:brightness-95 transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "published" && (
        <>
          {!showForm && !editingSpot && (
            <button
              onClick={() => setShowForm(true)}
              className="mb-6 px-5 py-2.5 rounded-pill bg-cherry text-ivory font-display font-bold shadow-pop hover:brightness-105 transition"
            >
              + Add a spot
            </button>
          )}

          {showForm && (
            <div className="mb-8">
              <AdminSpotForm
                onSubmit={handleAdd}
                onCancel={() => setShowForm(false)}
                submitLabel="Add spot"
              />
            </div>
          )}

          {editingSpot && (
            <div className="mb-8">
              <AdminSpotForm
                initial={editingSpot}
                onSubmit={handleUpdate}
                onCancel={() => setEditingSpot(null)}
                submitLabel="Save changes"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              data-active={filterArea === "all"}
              onClick={() => setFilterArea("all")}
              className="pill-chip rounded-pill px-3 py-1.5 font-mono text-xs text-inkmuted bg-blushdeep"
            >
              all areas
            </button>
            {AREAS.map((a) => (
              <button
                key={a.slug}
                data-active={filterArea === a.slug}
                onClick={() => setFilterArea(a.slug)}
                className="pill-chip rounded-pill px-3 py-1.5 font-mono text-xs text-inkmuted bg-blushdeep"
              >
                {a.name}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-inkmuted">Loading spots...</p>
          ) : visibleSpots.length === 0 ? (
            <p className="text-inkmuted">No spots yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {visibleSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="flex items-center justify-between gap-3 bg-cream border border-maroon/10 rounded-signboard px-4 py-3 shadow-card"
                >
                  <div className="min-w-0">
                    <p className="font-display font-bold text-maroon truncate">
                      {spot.name}
                    </p>
                    <p className="font-mono text-xs text-inkmuted">
                      {areaBySlug(spot.area)?.name} · {categoryBySlug(spot.category)?.name}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingSpot(spot);
                        setShowForm(false);
                      }}
                      className="px-3 py-1.5 rounded-pill bg-blushdeep text-maroon text-sm font-semibold hover:brightness-95 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(spot.id)}
                      className="px-3 py-1.5 rounded-pill bg-cherry/10 text-cherry text-sm font-semibold hover:bg-cherry/20 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}