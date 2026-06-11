import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export type DonationStatus = "pending" | "confirmed" | "failed";
export type DonationType = "cash" | "crypto" | "stock" | "daf";
export type EmailType =
  | "thank_you"
  | "receipt"
  | "confirmation"
  | "reminder";

export interface DonationRow {
  id: number;
  reference_id: string;
  type: DonationType;
  status: DonationStatus;
  org_slug: string;
  org_name: string;
  amount: number;
  currency: string;
  frequency: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  details_json: string;
  card_last4: string | null;
  card_brand: string | null;
  card_exp_month: string | null;
  card_exp_year: string | null;
  cardholder_name: string | null;
  ip_address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  confirmed_at: string | null;
}

export interface EmailLogRow {
  id: number;
  donation_id: number;
  email_type: EmailType;
  recipient: string;
  subject: string;
  status: string;
  sent_at: string;
}

export type FormType = "contact" | "consortium" | "volunteer";

export interface FormSubmissionRow {
  id: number;
  reference_id: string;
  form_type: FormType;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string | null;
  details_json: string;
  ip_address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
  latitude: number | null;
  longitude: number | null;
  admin_notified: boolean;
  user_notified: boolean;
  created_at: string;
}

let sqlClient: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

function getSqlClient(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon PostgreSQL connection string to .env.local"
    );
  }
  if (!sqlClient) {
    sqlClient = neon(url);
  }
  return sqlClient;
}

async function initSchema() {
  const sql = getSqlClient();

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

  await seedAdmin(sql);
}

async function seedAdmin(sql: NeonQueryFunction<false, false>) {
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
  }
}

export async function getDb(): Promise<NeonQueryFunction<false, false>> {
  if (!schemaReady) {
    schemaReady = initSchema();
  }
  await schemaReady;
  return getSqlClient();
}

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function toNullableIso(value: unknown): string | null {
  if (value == null) return null;
  return toIso(value);
}

export function mapDonationRow(row: Record<string, unknown>): DonationRow {
  return {
    id: Number(row.id),
    reference_id: String(row.reference_id),
    type: row.type as DonationType,
    status: row.status as DonationStatus,
    org_slug: String(row.org_slug),
    org_name: String(row.org_name),
    amount: Number(row.amount),
    currency: String(row.currency),
    frequency: row.frequency != null ? String(row.frequency) : null,
    first_name: String(row.first_name),
    last_name: String(row.last_name),
    email: String(row.email),
    phone: row.phone != null ? String(row.phone) : null,
    message: row.message != null ? String(row.message) : null,
    details_json: String(row.details_json),
    card_last4: row.card_last4 != null ? String(row.card_last4) : null,
    card_brand: row.card_brand != null ? String(row.card_brand) : null,
    card_exp_month:
      row.card_exp_month != null ? String(row.card_exp_month) : null,
    card_exp_year: row.card_exp_year != null ? String(row.card_exp_year) : null,
    cardholder_name:
      row.cardholder_name != null ? String(row.cardholder_name) : null,
    ip_address: row.ip_address != null ? String(row.ip_address) : null,
    city: row.city != null ? String(row.city) : null,
    region: row.region != null ? String(row.region) : null,
    country: row.country != null ? String(row.country) : null,
    country_code:
      row.country_code != null ? String(row.country_code) : null,
    latitude: row.latitude != null ? Number(row.latitude) : null,
    longitude: row.longitude != null ? Number(row.longitude) : null,
    created_at: toIso(row.created_at),
    confirmed_at: toNullableIso(row.confirmed_at),
  };
}

export function mapFormSubmissionRow(
  row: Record<string, unknown>
): FormSubmissionRow {
  return {
    id: Number(row.id),
    reference_id: String(row.reference_id),
    form_type: row.form_type as FormType,
    name: String(row.name),
    email: String(row.email),
    phone: row.phone != null ? String(row.phone) : null,
    subject: row.subject != null ? String(row.subject) : null,
    message: row.message != null ? String(row.message) : null,
    details_json: String(row.details_json),
    ip_address: row.ip_address != null ? String(row.ip_address) : null,
    city: row.city != null ? String(row.city) : null,
    region: row.region != null ? String(row.region) : null,
    country: row.country != null ? String(row.country) : null,
    country_code:
      row.country_code != null ? String(row.country_code) : null,
    latitude: row.latitude != null ? Number(row.latitude) : null,
    longitude: row.longitude != null ? Number(row.longitude) : null,
    admin_notified: Boolean(row.admin_notified),
    user_notified: Boolean(row.user_notified),
    created_at: toIso(row.created_at),
  };
}

export function mapEmailLogRow(row: Record<string, unknown>): EmailLogRow {
  return {
    id: Number(row.id),
    donation_id: Number(row.donation_id),
    email_type: row.email_type as EmailType,
    recipient: String(row.recipient),
    subject: String(row.subject),
    status: String(row.status),
    sent_at: toIso(row.sent_at),
  };
}

export function parseDetails(row: DonationRow): Record<string, unknown> {
  try {
    return JSON.parse(row.details_json) as Record<string, unknown>;
  } catch {
    return {};
  }
}
