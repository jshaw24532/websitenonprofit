import { getDb, type DonationRow, type DonationStatus, type DonationType } from "./db";
import { lookupIp, getClientIp } from "./geoip";
import { toSafeCardMeta } from "./card-utils";
import { sendEmail } from "./email/sender";
import {
  thankYouEmail,
  receiptEmail,
  confirmationEmail,
  reminderEmail,
} from "./email/templates";

export interface DonationInput {
  type: DonationType;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  details: Record<string, string | number | boolean | undefined>;
  card?: {
    number: string;
    expiry: string;
    cardholderName?: string;
  };
}

export async function createDonation(
  input: DonationInput,
  request: Request
) {
  const db = getDb();
  const referenceId = `DON-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const ip = getClientIp(request);
  const geo = await lookupIp(ip);

  let cardMeta: ReturnType<typeof toSafeCardMeta> = null;
  if (input.type === "cash" && input.card?.number && input.card?.expiry) {
    cardMeta = toSafeCardMeta(input.card.number, input.card.expiry);
  }

  const amount =
    Number(input.details.amount) ||
    Number(input.details.grantAmountUsd) ||
    Number(input.details.estimatedUsdValue) ||
    0;
  const orgSlug = String(input.details.organizationSlug || "unknown");
  const orgName = String(input.details.organizationName || orgSlug);

  const stmt = db.prepare(`
    INSERT INTO donations (
      reference_id, type, status, org_slug, org_name, amount, currency, frequency,
      first_name, last_name, email, phone, message, details_json,
      card_last4, card_brand, card_exp_month, card_exp_year, cardholder_name,
      ip_address, city, region, country, country_code, latitude, longitude
    ) VALUES (?, ?, 'pending', ?, ?, ?, 'USD', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    referenceId,
    input.type,
    orgSlug,
    orgName,
    amount,
    input.details.frequency ? String(input.details.frequency) : null,
    input.donor.firstName,
    input.donor.lastName,
    input.donor.email,
    input.donor.phone || null,
    input.details.message ? String(input.details.message) : null,
    JSON.stringify(input.details),
    cardMeta?.last4 ?? null,
    cardMeta?.brand ?? null,
    cardMeta?.expMonth ?? null,
    cardMeta?.expYear ?? null,
    input.card?.cardholderName ||
      `${input.donor.firstName} ${input.donor.lastName}`,
    ip,
    geo.city,
    geo.region,
    geo.country,
    geo.countryCode,
    geo.latitude,
    geo.longitude
  );

  const donationId = Number(result.lastInsertRowid);
  const donorName = `${input.donor.firstName} ${input.donor.lastName}`;

  const thankYou = thankYouEmail({
    donorName,
    amount,
    orgName,
    referenceId,
    type: input.type,
  });

  await sendEmail({
    to: input.donor.email,
    subject: thankYou.subject,
    html: thankYou.html,
    donationId,
    emailType: "thank_you",
  });

  return { referenceId, donationId };
}

export function getDonationById(id: number): DonationRow | undefined {
  const db = getDb();
  return db
    .prepare("SELECT * FROM donations WHERE id = ?")
    .get(id) as DonationRow | undefined;
}

export function getDonationByRef(ref: string): DonationRow | undefined {
  const db = getDb();
  return db
    .prepare("SELECT * FROM donations WHERE reference_id = ?")
    .get(ref) as DonationRow | undefined;
}

export async function confirmDonation(id: number) {
  const db = getDb();
  const row = getDonationById(id);
  if (!row) throw new Error("Donation not found");

  db.prepare(
    `UPDATE donations SET status = 'confirmed', confirmed_at = datetime('now') WHERE id = ?`
  ).run(id);

  const donorName = `${row.first_name} ${row.last_name}`;
  const confirmation = confirmationEmail({
    donorName,
    amount: row.amount,
    orgName: row.org_name,
    referenceId: row.reference_id,
    type: row.type,
  });

  await sendEmail({
    to: row.email,
    subject: confirmation.subject,
    html: confirmation.html,
    donationId: id,
    emailType: "confirmation",
  });
}

export async function sendDonationReceipt(id: number) {
  const row = getDonationById(id);
  if (!row) throw new Error("Donation not found");

  const donorName = `${row.first_name} ${row.last_name}`;
  const receipt = receiptEmail({
    donorName,
    amount: row.amount,
    orgName: row.org_name,
    referenceId: row.reference_id,
    type: row.type,
  });

  return sendEmail({
    to: row.email,
    subject: receipt.subject,
    html: receipt.html,
    donationId: id,
    emailType: "receipt",
  });
}

export async function sendDonationReminder(id: number) {
  const row = getDonationById(id);
  if (!row) throw new Error("Donation not found");

  const donorName = `${row.first_name} ${row.last_name}`;
  const reminder = reminderEmail({
    donorName,
    amount: row.amount,
    orgName: row.org_name,
    referenceId: row.reference_id,
    type: row.type,
    lastDonationDate: new Date(row.created_at).toLocaleDateString("en-US", {
      dateStyle: "long",
    }),
  });

  return sendEmail({
    to: row.email,
    subject: reminder.subject,
    html: reminder.html,
    donationId: id,
    emailType: "reminder",
  });
}

export function getAdminStats() {
  const db = getDb();

  const totals = db
    .prepare(
      `SELECT
        COUNT(*) as total_count,
        COALESCE(SUM(amount), 0) as total_amount,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_count
      FROM donations`
    )
    .get() as {
    total_count: number;
    total_amount: number;
    pending_count: number;
    confirmed_count: number;
  };

  const monthly = db
    .prepare(
      `SELECT strftime('%Y-%m', created_at) as month,
              COUNT(*) as count,
              COALESCE(SUM(amount), 0) as amount
       FROM donations
       GROUP BY month
       ORDER BY month ASC`
    )
    .all() as { month: string; count: number; amount: number }[];

  const geographic = db
    .prepare(
      `SELECT COALESCE(country, 'Unknown') as country,
              COALESCE(city, 'Unknown') as city,
              COALESCE(region, '') as region,
              COUNT(*) as count,
              COALESCE(SUM(amount), 0) as amount
       FROM donations
       GROUP BY country, city, region
       ORDER BY count DESC
       LIMIT 50`
    )
    .all() as {
    country: string;
    city: string;
    region: string;
    count: number;
    amount: number;
  }[];

  const byType = db
    .prepare(
      `SELECT type, COUNT(*) as count, COALESCE(SUM(amount), 0) as amount
       FROM donations GROUP BY type`
    )
    .all() as { type: string; count: number; amount: number }[];

  let peakMonth = monthly[0]?.month ?? null;
  let peakAmount = monthly[0]?.amount ?? 0;
  for (const m of monthly) {
    if (m.amount > peakAmount) {
      peakAmount = m.amount;
      peakMonth = m.month;
    }
  }

  return { totals, monthly, geographic, byType, peakMonth, peakAmount };
}

export function listDonations(filters?: {
  status?: DonationStatus;
  search?: string;
  limit?: number;
}) {
  const db = getDb();
  let sql = "SELECT * FROM donations WHERE 1=1";
  const params: (string | number)[] = [];

  if (filters?.status) {
    sql += " AND status = ?";
    params.push(filters.status);
  }
  if (filters?.search) {
    sql += " AND (email LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR reference_id LIKE ?)";
    const q = `%${filters.search}%`;
    params.push(q, q, q, q);
  }
  sql += " ORDER BY created_at DESC LIMIT ?";
  params.push(filters?.limit ?? 200);

  return db.prepare(sql).all(...params) as DonationRow[];
}

export function getEmailLogs(donationId: number) {
  const db = getDb();
  return db
    .prepare("SELECT * FROM email_logs WHERE donation_id = ? ORDER BY sent_at DESC")
    .all(donationId);
}
