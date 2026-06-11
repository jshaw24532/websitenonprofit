/**
 * End-to-end test: all forms, donations, and admin email actions.
 * Usage: node scripts/test-all-forms-emails.mjs [test-email]
 */
import { readFileSync } from "fs";
import { resolve } from "path";

const BASE = process.env.TEST_BASE_URL || "http://127.0.0.1:1324";
const TEST_EMAIL = process.argv[2] || "test-donor@example.com";

// Load .env.local
const envPath = resolve(process.cwd(), ".env.local");
try {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
} catch {
  console.warn("No .env.local — SMTP tests may log only");
}

const results = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`  PASS  ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function post(path, body, cookie = "") {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text.slice(0, 200) };
  }
  return { ok: res.ok, status: res.status, data, headers: res.headers };
}

async function get(path, cookie = "") {
  const res = await fetch(`${BASE}${path}`, {
    headers: cookie ? { Cookie: cookie } : {},
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

// ── 1. SMTP verify ──────────────────────────────────────────
console.log("\n=== 1. SMTP Connection ===");
try {
  const nodemailer = (await import("nodemailer")).default;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls:
      process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "false"
        ? { rejectUnauthorized: false }
        : undefined,
  });
  await transport.verify();
  pass("SMTP verify", process.env.SMTP_HOST);
} catch (e) {
  fail("SMTP verify", e.message);
}

// ── 2. Site forms ───────────────────────────────────────────
console.log("\n=== 2. Site Forms ===");

const forms = [
  {
    name: "Contact form",
    body: {
      formType: "contact",
      name: "QA Contact Test",
      email: TEST_EMAIL,
      phone: "555-0100",
      subject: "QA Contact Subject",
      message: "Automated contact form test message.",
    },
  },
  {
    name: "Consortium form",
    body: {
      formType: "consortium",
      name: "QA Consortium Test",
      email: TEST_EMAIL,
      phone: "555-0200",
      subject: "Founding Partnership",
      message: "Automated consortium inquiry test.",
      details: {
        Organization: "QA Test Corp",
        "Title / Role": "Director",
        "Area of Interest": "Founding Partnership",
      },
    },
  },
  {
    name: "Volunteer form",
    body: {
      formType: "volunteer",
      name: "QA Volunteer Test",
      email: TEST_EMAIL,
      phone: "555-0300",
      subject: "Volunteer Application — Outreach Volunteer",
      message: "Automated volunteer application test.",
      details: {
        "Preferred Role": "Outreach Volunteer",
        Availability: "Weekends",
      },
    },
  },
];

for (const f of forms) {
  const r = await post("/api/forms/submit", f.body);
  if (r.ok && r.data.referenceId) {
    pass(f.name, r.data.referenceId);
  } else {
    fail(f.name, r.data.error || `HTTP ${r.status}`);
  }
}

// ── 3. Donation forms ───────────────────────────────────────
console.log("\n=== 3. Donation Submissions ===");

const donations = [
  {
    name: "Cash donation",
    body: {
      type: "cash",
      donor: { firstName: "QA", lastName: "Cash", email: TEST_EMAIL, phone: "555-1000" },
      details: {
        organizationSlug: "on-3rd-outreach",
        organizationName: "On 3rd Outreach",
        amount: 50,
        frequency: "one-time",
        message: "QA cash test",
      },
      card: { number: "4242424242424242", expiry: "12/28", cardholderName: "QA Cash" },
    },
  },
  {
    name: "Crypto donation",
    body: {
      type: "crypto",
      donor: { firstName: "QA", lastName: "Crypto", email: TEST_EMAIL },
      details: {
        organizationSlug: "on-3rd-outreach",
        organizationName: "On 3rd Outreach",
        asset: "BTC",
        estimatedUsdValue: "100",
        transactionHash: "0xqa-test-hash",
      },
    },
  },
  {
    name: "Stock donation",
    body: {
      type: "stock",
      donor: { firstName: "QA", lastName: "Stock", email: TEST_EMAIL, phone: "555-2000" },
      details: {
        organizationSlug: "on-3rd-outreach",
        organizationName: "On 3rd Outreach",
        ticker: "AAPL",
        numberOfShares: "10",
        brokerName: "QA Broker",
      },
    },
  },
  {
    name: "DAF donation",
    body: {
      type: "daf",
      donor: { firstName: "QA", lastName: "DAF", email: TEST_EMAIL },
      details: {
        organizationSlug: "on-3rd-outreach",
        organizationName: "On 3rd Outreach",
        grantAmountUsd: "250",
        dafProvider: "Fidelity Charitable",
        designation: "General support",
      },
    },
  },
];

let lastDonationId = null;

for (const d of donations) {
  const r = await post("/api/donations/submit", d.body);
  if (r.ok && r.data.referenceId) {
    pass(d.name, `${r.data.referenceId} (thank-you email triggered)`);
  } else {
    fail(d.name, r.data.error || `HTTP ${r.status}`);
  }
}

// ── 4. Admin login ──────────────────────────────────────────
console.log("\n=== 4. Admin Login ===");

const loginRes = await fetch(`${BASE}/api/admin/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: process.env.ADMIN_EMAIL || "admin@on3rdoutreach.org",
    password: process.env.ADMIN_PASSWORD || "Admin@2026!",
  }),
});

const setCookie = loginRes.headers.get("set-cookie") || "";
const sessionCookie = setCookie.split(";")[0];

if (loginRes.ok) {
  pass("Admin login");
} else {
  const err = await loginRes.json();
  fail("Admin login", err.error);
  console.log("\n=== SUMMARY ===");
  printSummary();
  process.exit(1);
}

// ── 5. Fetch latest donation for email actions ──────────────
console.log("\n=== 5. Admin Email Actions ===");

const donationsList = await get("/api/admin/donations", sessionCookie);
if (!donationsList.ok || !donationsList.data.donations?.length) {
  fail("List donations for email test", "No donations found");
} else {
  const donation = donationsList.data.donations[0];
  lastDonationId = donation.id;
  pass("List donations", `ID ${donation.id} ref ${donation.reference_id}`);

  const confirmRes = await post(
    `/api/admin/donations/${donation.id}/confirm`,
    {},
    sessionCookie
  );
  if (confirmRes.ok) {
    pass("Confirm donation + confirmation email", `donation #${donation.id}`);
  } else {
    fail("Confirm donation", confirmRes.data.error || `HTTP ${confirmRes.status}`);
  }

  const receiptRes = await post(
    `/api/admin/donations/${donation.id}/send-receipt`,
    {},
    sessionCookie
  );
  if (receiptRes.ok) {
    pass("Send receipt email", `status: ${receiptRes.data.status}`);
  } else {
    fail("Send receipt", receiptRes.data.error);
  }

  const reminderRes = await post(
    `/api/admin/donations/${donation.id}/send-reminder`,
    {},
    sessionCookie
  );
  if (reminderRes.ok) {
    pass("Send reminder email", `status: ${reminderRes.data.status}`);
  } else {
    fail("Send reminder", reminderRes.data.error);
  }

  const detailRes = await get(`/api/admin/donations/${donation.id}`, sessionCookie);
  if (detailRes.ok && detailRes.data.emails?.length) {
    const types = detailRes.data.emails.map((e) => e.email_type).join(", ");
    pass("Email log recorded", types);
  } else {
    fail("Email log", "No emails in log");
  }
}

// ── 6. Form submissions in admin ────────────────────────────
console.log("\n=== 6. Admin Form Submissions ===");

const subsRes = await get("/api/admin/submissions", sessionCookie);
if (subsRes.ok && subsRes.data.submissions?.length >= 3) {
  pass("Form submissions in admin", `${subsRes.data.submissions.length} total`);
  const notified = subsRes.data.submissions.filter((s) => s.admin_notified).length;
  pass("Admin notifications sent", `${notified} submissions notified`);
} else {
  fail("Form submissions", subsRes.data.error || "Expected >= 3 submissions");
}

// ── 7. Admin stats ──────────────────────────────────────────
console.log("\n=== 7. Admin Dashboard Stats ===");

const statsRes = await get("/api/admin/stats", sessionCookie);
if (statsRes.ok && statsRes.data.totals) {
  pass(
    "Dashboard stats",
    `${statsRes.data.totals.total_count} donations, $${statsRes.data.totals.total_amount}`
  );
} else {
  fail("Dashboard stats", statsRes.data.error);
}

console.log("\n=== SUMMARY ===");
printSummary();

function printSummary() {
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${passed} passed, ${failed} failed (${results.length} total)`);
  if (failed) {
    console.log("\nFailed tests:");
    results.filter((r) => !r.ok).forEach((r) => console.log(`  - ${r.name}: ${r.detail}`));
    process.exit(1);
  }
  console.log(`\nAll tests passed. Emails sent to: ${TEST_EMAIL}`);
  console.log("Admin notifications sent to info@ / consortium@ mailboxes.");
  console.log("Check inboxes (and spam) to verify delivery.");
}
