import {
  getDb,
  mapDonationRow,
  mapEmailLogRow,
  type DonationRow,
  type DonationStatus,
  type DonationType,
  type EmailLogRow,
} from "./db";
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

export interface DonorSummary {
  email: string;
  first_name: string;
  last_name: string;
  donation_count: number;
  total_amount: number;
  last_donation: string;
  first_donation_id: number;
}

export async function createDonation(
  input: DonationInput,
  request: Request
) {
  const sql = await getDb();
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
  const frequency = input.details.frequency
    ? String(input.details.frequency)
    : null;
  const message = input.details.message ? String(input.details.message) : null;
  const cardholderName =
    input.card?.cardholderName ||
    `${input.donor.firstName} ${input.donor.lastName}`;

  const inserted = await sql`
    INSERT INTO donations (
      reference_id, type, status, org_slug, org_name, amount, currency, frequency,
      first_name, last_name, email, phone, message, details_json,
      card_last4, card_brand, card_exp_month, card_exp_year, cardholder_name,
      ip_address, city, region, country, country_code, latitude, longitude
    ) VALUES (
      ${referenceId}, ${input.type}, 'pending', ${orgSlug}, ${orgName}, ${amount}, 'USD', ${frequency},
      ${input.donor.firstName}, ${input.donor.lastName}, ${input.donor.email}, ${input.donor.phone || null}, ${message}, ${JSON.stringify(input.details)},
      ${cardMeta?.last4 ?? null}, ${cardMeta?.brand ?? null}, ${cardMeta?.expMonth ?? null}, ${cardMeta?.expYear ?? null}, ${cardholderName},
      ${ip}, ${geo.city}, ${geo.region}, ${geo.country}, ${geo.countryCode}, ${geo.latitude}, ${geo.longitude}
    )
    RETURNING id
  `;

  const donationId = Number(inserted[0].id);
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

export async function getDonationById(
  id: number
): Promise<DonationRow | undefined> {
  const sql = await getDb();
  const rows = await sql`SELECT * FROM donations WHERE id = ${id} LIMIT 1`;
  const row = rows[0];
  return row ? mapDonationRow(row as Record<string, unknown>) : undefined;
}

export async function getDonationByRef(
  ref: string
): Promise<DonationRow | undefined> {
  const sql = await getDb();
  const rows = await sql`
    SELECT * FROM donations WHERE reference_id = ${ref} LIMIT 1
  `;
  const row = rows[0];
  return row ? mapDonationRow(row as Record<string, unknown>) : undefined;
}

export async function confirmDonation(id: number) {
  const sql = await getDb();
  const row = await getDonationById(id);
  if (!row) throw new Error("Donation not found");

  await sql`
    UPDATE donations
    SET status = 'confirmed', confirmed_at = NOW()
    WHERE id = ${id}
  `;

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
  const row = await getDonationById(id);
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
  const row = await getDonationById(id);
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

export async function getAdminStats() {
  const sql = await getDb();

  const totalsRows = await sql`
    SELECT
      COUNT(*)::int as total_count,
      COALESCE(SUM(amount), 0)::float as total_amount,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END)::int as pending_count,
      SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END)::int as confirmed_count
    FROM donations
  `;
  const totals = totalsRows[0] as {
    total_count: number;
    total_amount: number;
    pending_count: number;
    confirmed_count: number;
  };

  const monthly = (await sql`
    SELECT to_char(created_at, 'YYYY-MM') as month,
           COUNT(*)::int as count,
           COALESCE(SUM(amount), 0)::float as amount
    FROM donations
    GROUP BY month
    ORDER BY month ASC
  `) as { month: string; count: number; amount: number }[];

  const geographic = (await sql`
    SELECT COALESCE(country, 'Unknown') as country,
           COALESCE(city, 'Unknown') as city,
           COALESCE(region, '') as region,
           COUNT(*)::int as count,
           COALESCE(SUM(amount), 0)::float as amount
    FROM donations
    GROUP BY country, city, region
    ORDER BY count DESC
    LIMIT 50
  `) as {
    country: string;
    city: string;
    region: string;
    count: number;
    amount: number;
  }[];

  const byType = (await sql`
    SELECT type, COUNT(*)::int as count, COALESCE(SUM(amount), 0)::float as amount
    FROM donations
    GROUP BY type
  `) as { type: string; count: number; amount: number }[];

  let peakMonth = monthly[0]?.month ?? null;
  let peakAmount = monthly[0]?.amount ?? 0;
  for (const m of monthly) {
    if (m.amount > peakAmount) {
      peakAmount = m.amount;
      peakMonth = m.month;
    }
  }

  return {
    totals: {
      total_count: Number(totals.total_count),
      total_amount: Number(totals.total_amount),
      pending_count: Number(totals.pending_count),
      confirmed_count: Number(totals.confirmed_count),
    },
    monthly,
    geographic,
    byType,
    peakMonth,
    peakAmount,
  };
}

export async function listDonations(filters?: {
  status?: DonationStatus;
  search?: string;
  limit?: number;
}) {
  const sql = await getDb();
  const limit = filters?.limit ?? 200;

  let rows;
  if (filters?.status && filters?.search) {
    const q = `%${filters.search}%`;
    rows = await sql`
      SELECT * FROM donations
      WHERE status = ${filters.status}
        AND (
          email ILIKE ${q}
          OR first_name ILIKE ${q}
          OR last_name ILIKE ${q}
          OR reference_id ILIKE ${q}
        )
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } else if (filters?.status) {
    rows = await sql`
      SELECT * FROM donations
      WHERE status = ${filters.status}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } else if (filters?.search) {
    const q = `%${filters.search}%`;
    rows = await sql`
      SELECT * FROM donations
      WHERE email ILIKE ${q}
         OR first_name ILIKE ${q}
         OR last_name ILIKE ${q}
         OR reference_id ILIKE ${q}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  } else {
    rows = await sql`
      SELECT * FROM donations
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
  }

  return rows.map((row) =>
    mapDonationRow(row as Record<string, unknown>)
  ) as DonationRow[];
}

export async function getEmailLogs(donationId: number): Promise<EmailLogRow[]> {
  const sql = await getDb();
  const rows = await sql`
    SELECT * FROM email_logs
    WHERE donation_id = ${donationId}
    ORDER BY sent_at DESC
  `;
  return rows.map((row) =>
    mapEmailLogRow(row as Record<string, unknown>)
  );
}

export async function listDonors(): Promise<DonorSummary[]> {
  const sql = await getDb();
  const rows = await sql`
    SELECT email, first_name, last_name,
           COUNT(*)::int as donation_count,
           COALESCE(SUM(amount), 0)::float as total_amount,
           MAX(created_at) as last_donation,
           MIN(id)::int as first_donation_id
    FROM donations
    GROUP BY email, first_name, last_name
    ORDER BY last_donation DESC
  `;

  return rows.map((row) => ({
    email: String(row.email),
    first_name: String(row.first_name),
    last_name: String(row.last_name),
    donation_count: Number(row.donation_count),
    total_amount: Number(row.total_amount),
    last_donation: String(row.last_donation),
    first_donation_id: Number(row.first_donation_id),
  }));
}
