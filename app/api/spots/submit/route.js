import { NextResponse } from "next/server";
import { addSpot } from "@/lib/store";
import { AREAS, CATEGORIES, areaBySlug, categoryBySlug } from "@/lib/data";

// Public endpoint — no password required. Anyone can suggest a spot, but
// it's saved with status "pending" and stays invisible on the public site
// until an admin approves it from /admin.
export async function POST(request) {
  const body = await request.json();

  if (!body.name || !body.area || !body.category) {
    return NextResponse.json(
      { error: "name, area, and category are required" },
      { status: 400 }
    );
  }

  if (!AREAS.some((a) => a.slug === body.area)) {
    return NextResponse.json({ error: "Invalid area" }, { status: 400 });
  }
  if (!CATEGORIES.some((c) => c.slug === body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const spot = await addSpot({
    area: body.area,
    category: body.category,
    tags: Array.isArray(body.tags) ? body.tags : [],
    name: body.name,
    description: body.description || "",
    address: body.address || "",
    image: body.image || "",
    mapsLink: body.mapsLink || "",
    commute: body.commute || "",
    menuLink: body.menuLink || "",
    priceRange: body.priceRange || "",
    priceMin: typeof body.priceMin === "number" ? body.priceMin : null,
    status: "pending",
  });

  await notifyDiscord(spot).catch((err) =>
    console.error("Discord notification failed:", err)
  );

  return NextResponse.json({ spot }, { status: 201 });
}

async function notifyDiscord(spot) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("DISCORD_WEBHOOK_URL not set, skipping notification");
    return;
  }

  const area = areaBySlug(spot.area)?.name || spot.area;
  const category = categoryBySlug(spot.category)?.name || spot.category;

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `💌 New spot suggested: **${spot.name}** (${area} · ${category})${
        spot.description ? `\n> ${spot.description}` : ""
      }\nReview it at your site's \`/admin\` → Pending review.`,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord webhook returned ${res.status}: ${text}`);
  }
}