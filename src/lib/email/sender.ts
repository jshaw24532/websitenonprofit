import nodemailer from "nodemailer";
import { getDb, type EmailType } from "@/lib/db";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  if (!host) return null;

  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;

  const rejectUnauthorized =
    process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false";

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: rejectUnauthorized ? undefined : { rejectUnauthorized: false },
  });
  return transporter;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  donationId?: number;
  emailType?: EmailType;
}) {
  const from =
    process.env.SMTP_FROM || "donations@on3rdoutreach.org";
  const transport = getTransporter();
  let status = "logged";

  if (transport) {
    try {
      await transport.sendMail({ from, to: options.to, subject: options.subject, html: options.html });
      status = "sent";
    } catch (err) {
      console.error("[email-error]", err);
      status = "failed";
    }
  } else {
    console.info("[email-dev]", options.to, options.subject);
    status = "dev_logged";
  }

  if (options.donationId && options.emailType) {
    const sql = await getDb();
    await sql`
      INSERT INTO email_logs (donation_id, email_type, recipient, subject, status)
      VALUES (${options.donationId}, ${options.emailType}, ${options.to}, ${options.subject}, ${status})
    `;
  }

  return status;
}
