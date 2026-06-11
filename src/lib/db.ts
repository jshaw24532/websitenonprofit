import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "donations.db");

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

let db: Database.Database | null = null;

function initSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference_id TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      org_slug TEXT NOT NULL,
      org_name TEXT NOT NULL,
      amount REAL NOT NULL DEFAULT 0,
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
      latitude REAL,
      longitude REAL,
      created_at TEXT DEFAULT (datetime('now')),
      confirmed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      donation_id INTEGER NOT NULL,
      email_type TEXT NOT NULL,
      recipient TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      sent_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (donation_id) REFERENCES donations(id)
    );

    CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
    CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at);
    CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(email);
    CREATE INDEX IF NOT EXISTS idx_donations_country ON donations(country);

    CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      latitude REAL,
      longitude REAL,
      admin_notified INTEGER NOT NULL DEFAULT 0,
      user_notified INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_forms_type ON form_submissions(form_type);
    CREATE INDEX IF NOT EXISTS idx_forms_created ON form_submissions(created_at);
  `);
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
  admin_notified: number;
  user_notified: number;
  created_at: string;
}

function seedAdmin(database: Database.Database) {
  const email = process.env.ADMIN_EMAIL || "admin@on3rdoutreach.org";
  const password = process.env.ADMIN_PASSWORD || "Admin@2026!";
  const existing = database
    .prepare("SELECT id FROM admin_users WHERE email = ?")
    .get(email);
  if (!existing) {
    const hash = bcrypt.hashSync(password, 10);
    database
      .prepare(
        "INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)"
      )
      .run(email, hash, "Portal Administrator");
  }
}

export function getDb(): Database.Database {
  if (db) return db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  initSchema(db);
  seedAdmin(db);
  return db;
}

export function parseDetails(row: DonationRow): Record<string, unknown> {
  try {
    return JSON.parse(row.details_json) as Record<string, unknown>;
  } catch {
    return {};
  }
}
