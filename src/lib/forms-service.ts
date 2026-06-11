import {
  getDb,
  mapFormSubmissionRow,
  type FormType,
  type FormSubmissionRow,
} from "./db";
import { lookupIp, getClientIp } from "./geoip";
import { sendEmail } from "./email/sender";
import {
  formAdminNotificationEmail,
  formAutoReplyEmail,
} from "./email/form-templates";
import { siteConfig } from "./config";

export interface FormSubmitInput {
  formType: FormType;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  details?: Record<string, string | undefined>;
}

const consortiumInbox =
  process.env.CONSORTIUM_INBOX || siteConfig.consortiumEmail;
const adminInbox: Record<FormType, string> = {
  contact: siteConfig.email,
  consortium: consortiumInbox,
  volunteer: siteConfig.email,
};

const formLabels: Record<FormType, string> = {
  contact: "General Contact",
  consortium: "Consortium Inquiry",
  volunteer: "Volunteer Application",
};

export async function submitForm(input: FormSubmitInput, request: Request) {
  const sql = await getDb();
  const referenceId = `FRM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const ip = getClientIp(request);
  const geo = await lookupIp(ip);

  const inserted = await sql`
    INSERT INTO form_submissions (
      reference_id, form_type, name, email, phone, subject, message, details_json,
      ip_address, city, region, country, country_code, latitude, longitude
    ) VALUES (
      ${referenceId}, ${input.formType}, ${input.name}, ${input.email}, ${input.phone || null},
      ${input.subject || null}, ${input.message}, ${JSON.stringify(input.details || {})},
      ${ip}, ${geo.city}, ${geo.region}, ${geo.country}, ${geo.countryCode}, ${geo.latitude}, ${geo.longitude}
    )
    RETURNING id
  `;

  const submissionId = Number(inserted[0].id);
  const label = formLabels[input.formType];

  const adminEmail = formAdminNotificationEmail({
    referenceId,
    formLabel: label,
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    details: input.details,
    location: [geo.city, geo.region, geo.country].filter(Boolean).join(", "),
    ip,
  });

  let adminTo = adminInbox[input.formType];
  let adminStatus = await sendEmail({
    to: adminTo,
    subject: adminEmail.subject,
    html: adminEmail.html,
  });

  if (
    adminStatus !== "sent" &&
    input.formType === "consortium" &&
    adminTo !== siteConfig.email
  ) {
    adminTo = siteConfig.email;
    adminStatus = await sendEmail({
      to: adminTo,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });
  }

  const autoReply = formAutoReplyEmail({
    name: input.name,
    formLabel: label,
    referenceId,
  });

  const userStatus = await sendEmail({
    to: input.email,
    subject: autoReply.subject,
    html: autoReply.html,
  });

  await sql`
    UPDATE form_submissions
    SET admin_notified = ${adminStatus === "sent"},
        user_notified = ${userStatus === "sent"}
    WHERE id = ${submissionId}
  `;

  return { referenceId, submissionId };
}

export async function listFormSubmissions(
  formType?: FormType
): Promise<FormSubmissionRow[]> {
  const sql = await getDb();
  const rows = formType
    ? await sql`
        SELECT * FROM form_submissions
        WHERE form_type = ${formType}
        ORDER BY created_at DESC
        LIMIT 200
      `
    : await sql`
        SELECT * FROM form_submissions
        ORDER BY created_at DESC
        LIMIT 200
      `;

  return rows.map((row) =>
    mapFormSubmissionRow(row as Record<string, unknown>)
  );
}

export async function getFormSubmission(
  id: number
): Promise<FormSubmissionRow | undefined> {
  const sql = await getDb();
  const rows = await sql`
    SELECT * FROM form_submissions WHERE id = ${id} LIMIT 1
  `;
  const row = rows[0];
  return row
    ? mapFormSubmissionRow(row as Record<string, unknown>)
    : undefined;
}

export function parseFormDetails(row: FormSubmissionRow): Record<string, unknown> {
  try {
    return JSON.parse(row.details_json) as Record<string, unknown>;
  } catch {
    return {};
  }
}
