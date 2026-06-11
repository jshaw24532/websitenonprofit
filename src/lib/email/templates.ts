import { siteConfig } from "@/lib/config";
import { formatCurrency } from "@/lib/utils";

interface DonationEmailData {
  donorName: string;
  amount: number;
  orgName: string;
  referenceId: string;
  type: string;
}

function layout(content: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${siteConfig.shortName}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,25,41,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#0a1929 0%,#1e3a5f 100%);padding:28px 32px;">
              <p style="margin:0;color:#d4a843;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${siteConfig.shortName}</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">${siteConfig.consortiumShort}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#1e3a5f;font-size:15px;line-height:1.7;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e8edf2;">
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">
                ${siteConfig.name}<br/>
                ${siteConfig.address}<br/>
                <a href="mailto:${siteConfig.email}" style="color:#1e3a5f;">${siteConfig.email}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function thankYouEmail(data: DonationEmailData) {
  const content = `
    <p style="margin:0 0 16px;">Dear ${data.donorName},</p>
    <p style="margin:0 0 16px;">Thank you for your generous ${formatCurrency(data.amount)} contribution to <strong>${data.orgName}</strong>. Your support strengthens civic infrastructure and community outreach programs nationwide.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;margin:24px 0;">
      <tr><td style="padding:16px;">
        <p style="margin:0 0 8px;font-size:13px;color:#64748b;">Reference ID</p>
        <p style="margin:0;font-weight:700;color:#0a1929;">${data.referenceId}</p>
      </td></tr>
    </table>
    <p style="margin:0 0 16px;"><strong>What happens next:</strong> Our team is reviewing your submission. You will receive a separate confirmation email once we verify that your donation has been received and processed.</p>
    <p style="margin:0;">With gratitude,<br/><strong>The ${siteConfig.shortName} Team</strong></p>
  `;
  return {
    subject: `Thank you for your donation — ${data.referenceId}`,
    html: layout(content, "Thank you for your generous donation."),
  };
}

export function receiptEmail(data: DonationEmailData) {
  const content = `
    <p style="margin:0 0 16px;">Dear ${data.donorName},</p>
    <p style="margin:0 0 16px;">Please find your official donation receipt below for tax and record-keeping purposes.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;margin:24px 0;">
      <tr><td style="padding:12px 16px;background:#f8fafc;font-weight:700;border-bottom:1px solid #e2e8f0;">Donation Receipt</td></tr>
      <tr><td style="padding:12px 16px;"><strong>Organization:</strong> ${data.orgName}</td></tr>
      <tr><td style="padding:12px 16px;"><strong>Amount:</strong> ${formatCurrency(data.amount)}</td></tr>
      <tr><td style="padding:12px 16px;"><strong>Method:</strong> ${data.type}</td></tr>
      <tr><td style="padding:12px 16px;"><strong>Reference:</strong> ${data.referenceId}</td></tr>
      <tr><td style="padding:12px 16px;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</td></tr>
    </table>
    <p style="margin:0;font-size:13px;color:#64748b;">No goods or services were provided in exchange for this contribution. Please retain this receipt for your records.</p>
  `;
  return {
    subject: `Donation Receipt — ${data.referenceId}`,
    html: layout(content, "Your official donation receipt."),
  };
}

export function confirmationEmail(data: DonationEmailData) {
  const content = `
    <p style="margin:0 0 16px;">Dear ${data.donorName},</p>
    <p style="margin:0 0 16px;">We are pleased to confirm that your <strong>${formatCurrency(data.amount)}</strong> donation to <strong>${data.orgName}</strong> has been received and recorded in our system.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;margin:24px 0;">
      <tr><td style="padding:16px;color:#065f46;">
        <strong>Status: Confirmed &amp; Received</strong><br/>
        Reference: ${data.referenceId}
      </td></tr>
    </table>
    <p style="margin:0 0 16px;">Your contribution is now being applied toward programs that advance municipal transparency, civic technology, and community outreach.</p>
    <p style="margin:0;">Thank you for partnering with us.<br/><strong>Donations Administration</strong></p>
  `;
  return {
    subject: `Donation Confirmed — ${data.referenceId}`,
    html: layout(content, "Your donation has been confirmed as received."),
  };
}

export function reminderEmail(data: DonationEmailData & { lastDonationDate?: string }) {
  const content = `
    <p style="margin:0 0 16px;">Dear ${data.donorName},</p>
    <p style="margin:0 0 16px;">We hope this message finds you well. As a valued supporter of <strong>${data.orgName}</strong>, we wanted to reach out and share the continued impact your past generosity has made possible.</p>
    ${data.lastDonationDate ? `<p style="margin:0 0 16px;">Your last recorded gift was on <strong>${data.lastDonationDate}</strong>. Every contribution — large or small — directly fuels outreach trucks, workforce programs, and civic innovation initiatives.</p>` : ""}
    <p style="margin:0 0 24px;">If you would like to make another gift, you can donate securely online at any time.</p>
    <p style="margin:0 0 24px;text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:1324"}/donate" style="display:inline-block;background:#d4a843;color:#0a1929;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;">Donate Again</a>
    </p>
    <p style="margin:0;">With appreciation,<br/><strong>The ${siteConfig.shortName} Team</strong></p>
  `;
  return {
    subject: `Continue making an impact — ${siteConfig.shortName}`,
    html: layout(content, "Your support continues to make a difference."),
  };
}
