/**
 * Remove test/dummy donations and form submissions from Neon.
 * Run: node scripts/cleanup-test-data.mjs
 */
import { neon } from "@neondatabase/serverless";
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
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(url);

const testEmailPatterns = ["%example.com%", "%test-donor%", "%test@%"];
const testNamePatterns = ["QA %", "Neon Test%"];

async function main() {
  console.log("Cleaning test/dummy data from Neon...\n");

  const donationsToDelete = await sql`
    SELECT id, reference_id, email, first_name, last_name
    FROM donations
    WHERE email ILIKE ANY(${testEmailPatterns})
       OR first_name ILIKE 'QA'
       OR message ILIKE '%QA %test%'
       OR message ILIKE '%Automated%'
  `;

  if (donationsToDelete.length > 0) {
    const ids = donationsToDelete.map((d) => d.id);
    await sql`DELETE FROM email_logs WHERE donation_id = ANY(${ids})`;
    await sql`DELETE FROM donations WHERE id = ANY(${ids})`;
    console.log(`Deleted ${donationsToDelete.length} test donation(s):`);
    for (const d of donationsToDelete) {
      console.log(`  - ${d.reference_id} (${d.first_name} ${d.last_name} <${d.email}>)`);
    }
  } else {
    console.log("No test donations found.");
  }

  const formsToDelete = await sql`
    SELECT id, reference_id, name, email, form_type
    FROM form_submissions
    WHERE email ILIKE ANY(${testEmailPatterns})
       OR name ILIKE ANY(${testNamePatterns})
       OR message ILIKE '%Automated%'
       OR message ILIKE '%QA %test%'
       OR message ILIKE '%Testing Neon%'
  `;

  if (formsToDelete.length > 0) {
    const ids = formsToDelete.map((f) => f.id);
    await sql`DELETE FROM form_submissions WHERE id = ANY(${ids})`;
    console.log(`\nDeleted ${formsToDelete.length} test form submission(s):`);
    for (const f of formsToDelete) {
      console.log(`  - ${f.reference_id} (${f.form_type}: ${f.name} <${f.email}>)`);
    }
  } else {
    console.log("\nNo test form submissions found.");
  }

  const remaining = await sql`
    SELECT
      (SELECT COUNT(*)::int FROM donations) as donations,
      (SELECT COUNT(*)::int FROM form_submissions) as forms
  `;
  console.log(
    `\nRemaining records: ${remaining[0].donations} donations, ${remaining[0].forms} form submissions.`
  );
  console.log("Cleanup complete.");
}

main().catch((err) => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
