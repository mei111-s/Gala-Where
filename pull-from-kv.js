// One-time script to pull the live spots data OUT of Vercel KV (Upstash)
// and save it locally as a timestamped backup file.
// Usage: KV_REST_API_URL=... KV_REST_API_TOKEN=... node pull-from-kv.js

const fs = require("fs");

async function main() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.error("Set KV_REST_API_URL and KV_REST_API_TOKEN env vars first.");
    process.exit(1);
  }

  const res = await fetch(`${url}/get/spots`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  if (!data.result) {
    console.error("No 'spots' key found in KV, or it's empty. Response:", data);
    process.exit(1);
  }

  // Upstash's raw REST API returns the stored value as a string,
  // so parse it back into an actual array.
  const spots =
    typeof data.result === "string" ? JSON.parse(data.result) : data.result;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = `data/spots-backup-${timestamp}.json`;

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(spots, null, 2));

  console.log(`Pulled ${spots.length} spots from KV.`);
  console.log(`Saved to ${outPath}`);
  console.log(
    `(Your existing data/spots.json was left untouched — rename this file to replace it if you want to.)`
  );
}

main();