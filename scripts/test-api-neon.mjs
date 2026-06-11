/**
 * Test Next.js API routes that use Neon (local or production).
 * Usage: node scripts/test-api-neon.mjs [base-url]
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const BASE = process.argv[2] || "http://127.0.0.1:1324";
const adminEmail = process.env.ADMIN_EMAIL || "admin@on3rdoutreach.org";
const adminPassword = process.env.ADMIN_PASSWORD || "Admin@2026!";

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text.slice(0, 300) };
  }
  return { status: res.status, data };
}

console.log(`Testing API at ${BASE}\n`);

const login = await post("/api/admin/login", {
  email: adminEmail,
  password: adminPassword,
});
console.log(
  login.status === 200 ? "✓" : "✗",
  `Admin login: HTTP ${login.status}`,
  JSON.stringify(login.data)
);

const form = await post("/api/forms/submit", {
  formType: "contact",
  name: "API Neon Verify",
  email: "api-neon-verify@example.com",
  subject: "Connection test",
  message: "Automated Neon connectivity test",
});
console.log(
  form.status === 200 ? "✓" : "✗",
  `Form submit: HTTP ${form.status}`,
  JSON.stringify(form.data)
);

if (form.status === 200 && form.data.referenceId) {
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);
  const row = await sql`
    SELECT reference_id, name FROM form_submissions
    WHERE reference_id = ${form.data.referenceId} LIMIT 1
  `;
  if (row.length) {
    console.log("✓ Record saved in Neon:", row[0].reference_id);
    await sql`DELETE FROM form_submissions WHERE reference_id = ${form.data.referenceId}`;
    console.log("✓ Test record cleaned up");
  } else {
    console.log("✗ Record NOT found in Neon after API submit");
  }
}

process.exit(login.status === 200 && form.status === 200 ? 0 : 1);
