// One-time script to push data/spots.json into Vercel KV.
// Usage: KV_REST_API_URL=... KV_REST_API_TOKEN=... node seed-to-kv.js
const fs = require("fs");

async function main() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.error("Set KV_REST_API_URL and KV_REST_API_TOKEN env vars first.");
    process.exit(1);
  }
  const spots = JSON.parse(fs.readFileSync("data/spots.json", "utf-8"));

  const res = await fetch(`${url}/set/spots`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spots),
  });

  const result = await res.json();
  console.log("Seeded", spots.length, "spots. KV response:", result);
}

main();