import { siteConfig } from "@/lib/config";

function layout(content: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,25,41,0.08);">
        <tr><td style="background:linear-gradient(135deg,#0a1929,#1e3a5f);padding:28px 32px;">
          <p style="margin:0;color:#d4a843;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${siteConfig.shortName}</p>
          <h1 style="margin:8px 0 0;color:#fff;font-size:20px;">Form Submission</h1>
        </td></tr>
        <tr><td style="padding:32px;color:#1e3a5f;font-size:15px;line-height:1.7;">${content}</td></tr>
        <tr><td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e8edf2;">
          <p style="margin:0;font-size:12px;color:#64748b;">${siteConfig.name} · ${siteConfig.email}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formAdminNotificationEmail(data: {
  referenceId: string;
  formLabel: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  details?: Record<string, string | undefined>;
  location?: string;
  ip?: string;
}) {
  const rows: string[] = [
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;width:140px;"><strong>Name</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(data.name)}</td></tr>`,
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><strong>Email</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>`,
  ];
  if (data.phone) rows.push(`<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><strong>Phone</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(data.phone)}</td></tr>`);
  if (data.subject) rows.push(`<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><strong>Subject</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(data.subject)}</td></tr>`);
  if (data.details) {
    for (const [k, v] of Object.entries(data.details)) {
      if (v) rows.push(`<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><strong>${escapeHtml(k)}</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(v)}</td></tr>`);
    }
  }
  if (data.location) rows.push(`<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><strong>Location</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(data.location)}</td></tr>`);
  if (data.ip) rows.push(`<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;"><strong>IP</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-family:monospace;">${escapeHtml(data.ip)}</td></tr>`);

  const content = `
    <p style="margin:0 0 16px;">A new <strong>${escapeHtml(data.formLabel)}</strong> submission was received.</p>
    <p style="margin:0 0 16px;font-family:monospace;font-size:13px;color:#64748b;">Reference: ${escapeHtml(data.referenceId)}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;margin:16px 0;">
      ${rows.join("")}
      <tr><td colspan="2" style="padding:12px 16px;"><strong>Message</strong><br/><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `;

  return {
    subject: `[${data.formLabel}] New submission — ${data.referenceId}`,
    html: layout(content, `New ${data.formLabel} from ${data.name}`),
  };
}

export function formAutoReplyEmail(data: {
  name: string;
  formLabel: string;
  referenceId: string;
}) {
  const content = `
    <p style="margin:0 0 16px;">Dear ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 16px;">Thank you for contacting <strong>${siteConfig.shortName}</strong>. We have received your <strong>${escapeHtml(data.formLabel)}</strong> and a member of our team will respond within 1–3 business days.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;margin:24px 0;">
      <tr><td style="padding:16px;">
        <p style="margin:0 0 8px;font-size:13px;color:#64748b;">Your reference number</p>
        <p style="margin:0;font-weight:700;color:#0a1929;">${escapeHtml(data.referenceId)}</p>
      </td></tr>
    </table>
    <p style="margin:0;">We appreciate your interest in our mission.<br/><strong>The ${siteConfig.shortName} Team</strong></p>
  `;

  return {
    subject: `We received your message — ${data.referenceId}`,
    html: layout(content, "Thank you for contacting us."),
  };
}
