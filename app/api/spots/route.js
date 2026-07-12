import { NextResponse } from "next/server";
import {
  getAllSpots,
  getAllSpotsIncludingPending,
  getSpotsByArea,
  addSpot,
} from "@/lib/store";
import { isAuthed } from "@/lib/auth";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get("area");
  const includeAll = searchParams.get("all") === "1";

  // Only an authenticated admin can see pending (unapproved) spots.
  if (includeAll && isAuthed()) {
    const spots = await getAllSpotsIncludingPending();
    return NextResponse.json({
      spots: area ? spots.filter((s) => s.area === area) : spots,
    });
  }

  const spots = area ? await getSpotsByArea(area) : await getAllSpots();
  return NextResponse.json({ spots });
}

export async function POST(request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();

  if (!body.name || !body.area || !body.category) {
    return NextResponse.json(
      { error: "name, area, and category are required" },
      { status: 400 }
    );
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
    status: "published",
  });

  return NextResponse.json({ spot }, { status: 201 });
}