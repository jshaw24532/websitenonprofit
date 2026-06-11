import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
try {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
} catch {
  console.error("No .env.local found");
  process.exit(1);
}

const port = parseInt(process.env.SMTP_PORT || "587", 10);
const rejectUnauthorized =
  process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: process.env.SMTP_SECURE === "true" || port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: rejectUnauthorized ? undefined : { rejectUnauthorized: false },
});

try {
  await transport.verify();
  console.log("SMTP connection OK:", process.env.SMTP_HOST);
} catch (err) {
  console.error("SMTP failed:", err.message);
  process.exit(1);
}
