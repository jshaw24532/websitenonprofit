/**
 * Full Neon PostgreSQL connectivity & schema verification.
 * Run: node scripts/verify-neon-connection.mjs
 */
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
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

const url = process.env.DATABASE_URL;
const results = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`  ✓ ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
}

async function main() {
  console.log("=== Neon PostgreSQL Connection Check ===\n");

  if (!url) {
    fail("DATABASE_URL configured", "Missing from .env.local / environment");
    printSummary();
    process.exit(1);
  }
  pass("DATABASE_URL configured", url.replace(/:[^:@]+@/, ":***@"));

  let sql;
  try {
    sql = neon(url);
    const ping = await sql`SELECT NOW() as now, current_database() as db, version() as version`;
    pass("Connection successful", `database: ${ping[0].db}`);
    pass("Server time", String(ping[0].now));
  } catch (err) {
    fail("Connection", err.message);
    printSummary();
    process.exit(1);
  }

  console.log("\n=== Schema Tables ===");
  const requiredTables = [
    "admin_users",
    "donations",
    "email_logs",
    "form_submissions",
  ];

  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `;
  const tableNames = tables.map((t) => t.table_name);

  for (const t of requiredTables) {
    if (tableNames.includes(t)) pass(`Table exists: ${t}`);
    else fail(`Table exists: ${t}`, "MISSING");
  }

  console.log("\n=== Indexes ===");
  const indexes = await sql`
    SELECT indexname FROM pg_indexes
    WHERE schemaname = 'public'
    AND indexname LIKE 'idx_%'
    ORDER BY indexname
  `;
  pass("Indexes found", `${indexes.length} custom indexes`);

  console.log("\n=== Admin User ===");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@on3rdoutreach.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@2026!";
  const admins = await sql`
    SELECT id, email, name, created_at FROM admin_users WHERE email = ${adminEmail} LIMIT 1
  `;
  if (admins.length === 0) {
    fail("Admin user exists", `No user for ${adminEmail}`);
  } else {
    pass("Admin user exists", `${admins[0].email} (id: ${admins[0].id})`);
    const hashRow = await sql`
      SELECT password_hash FROM admin_users WHERE email = ${adminEmail} LIMIT 1
    `;
    const valid = bcrypt.compareSync(adminPassword, hashRow[0].password_hash);
    if (valid) pass("Admin password verifies");
    else fail("Admin password verifies", "ADMIN_PASSWORD does not match stored hash");
  }

  console.log("\n=== Read/Write Test ===");
  const testRef = `CHK-${Date.now()}-VERIFY`;
  try {
    const inserted = await sql`
      INSERT INTO form_submissions (
        reference_id, form_type, name, email, message, details_json
      ) VALUES (
        ${testRef}, 'contact', 'Connection Check', 'verify@internal.local',
        'Automated Neon connectivity test — safe to delete', '{}'
      )
      RETURNING id
    `;
    const id = inserted[0].id;
    pass("INSERT works", `form_submissions id=${id}`);

    const readBack = await sql`
      SELECT reference_id FROM form_submissions WHERE id = ${id} LIMIT 1
    `;
    if (readBack[0]?.reference_id === testRef) pass("SELECT works");
    else fail("SELECT works", "Read back mismatch");

    await sql`DELETE FROM form_submissions WHERE id = ${id}`;
    pass("DELETE works", "test row removed");
  } catch (err) {
    fail("Read/Write test", err.message);
  }

  console.log("\n=== Record Counts ===");
  const counts = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM admin_users) as admins,
      (SELECT COUNT(*)::int FROM donations) as donations,
      (SELECT COUNT(*)::int FROM email_logs) as emails,
      (SELECT COUNT(*)::int FROM form_submissions) as forms
  `;
  const c = counts[0];
  pass("admin_users", `${c.admins} row(s)`);
  pass("donations", `${c.donations} row(s)`);
  pass("email_logs", `${c.emails} row(s)`);
  pass("form_submissions", `${c.forms} row(s)`);

  console.log("\n=== Foreign Key (email_logs → donations) ===");
  try {
    await sql`
      INSERT INTO email_logs (donation_id, email_type, recipient, subject, status)
      VALUES (999999999, 'thank_you', 'test@test.com', 'test', 'test')
    `;
    fail("Foreign key enforced", "Should have rejected invalid donation_id");
  } catch {
    pass("Foreign key enforced", "invalid donation_id rejected");
  }

  printSummary();
}

function printSummary() {
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n=== RESULT: ${passed} passed, ${failed} failed ===`);
  if (failed > 0) process.exit(1);
  console.log("Neon database is fully connected and operational.\n");
}

main().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
