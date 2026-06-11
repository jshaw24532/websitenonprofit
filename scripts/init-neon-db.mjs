/**
 * Initialize Neon PostgreSQL schema (tables, indexes, default admin user).
 * Run: npm run db:init
 * Requires DATABASE_URL in .env.local or environment.
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
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  console.log("Connecting to Neon PostgreSQL...");

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS donations (
      id SERIAL PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      org_slug TEXT NOT NULL,
      org_name TEXT NOT NULL,
      amount DOUBLE PRECISION NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'USD',
      frequency TEXT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      details_json TEXT NOT NULL DEFAULT '{}',
      card_last4 TEXT,
      card_brand TEXT,
      card_exp_month TEXT,
      card_exp_year TEXT,
      cardholder_name TEXT,
      ip_address TEXT,
      city TEXT,
      region TEXT,
      country TEXT,
      country_code TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      confirmed_at TIMESTAMPTZ
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS email_logs (
      id SERIAL PRIMARY KEY,
      donation_id INTEGER NOT NULL REFERENCES donations(id) ON DELETE CASCADE,
      email_type TEXT NOT NULL,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id SERIAL PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      form_type TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT,
      details_json TEXT NOT NULL DEFAULT '{}',
      ip_address TEXT,
      city TEXT,
      region TEXT,
      country TEXT,
      country_code TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      admin_notified BOOLEAN NOT NULL DEFAULT FALSE,
      user_notified BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_donations_country ON donations(country)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_forms_type ON form_submissions(form_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_forms_created ON form_submissions(created_at)`;

  const email = process.env.ADMIN_EMAIL || "admin@on3rdoutreach.org";
  const password = process.env.ADMIN_PASSWORD || "Admin@2026!";
  const existing = await sql`
    SELECT id FROM admin_users WHERE email = ${email} LIMIT 1
  `;

  if (existing.length === 0) {
    const hash = bcrypt.hashSync(password, 10);
    await sql`
      INSERT INTO admin_users (email, password_hash, name)
      VALUES (${email}, ${hash}, ${"Portal Administrator"})
    `;
    console.log(`Seeded admin user: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `;

  console.log("Tables ready:", tables.map((t) => t.table_name).join(", "));
  console.log("Neon database initialized successfully.");
}

main().catch((err) => {
  console.error("Database init failed:", err);
  process.exit(1);
});
