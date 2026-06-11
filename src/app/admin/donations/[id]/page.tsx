import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import {
  getDonationById,
  getEmailLogs,
} from "@/lib/donations-service";
import { parseDetails, type EmailLogRow } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import DonationActions from "@/components/admin/DonationActions";
import { ArrowLeft, CreditCard, MapPin, Shield } from "lucide-react";

export default async function AdminDonationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const donation = getDonationById(parseInt(id, 10));
  if (!donation) notFound();

  const details = parseDetails(donation);
  const emails = getEmailLogs(donation.id) as EmailLogRow[];

  return (
    <div className="space-y-6">
      <Link
        href="/admin/donations"
        className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to donations
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">
            {donation.reference_id}
          </h2>
          <p className="text-navy-600">
            {donation.first_name} {donation.last_name} · {donation.email}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            donation.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {donation.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-navy-950">Donation Details</h3>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-navy-500">Organization</dt>
                <dd className="font-medium">{donation.org_name}</dd>
              </div>
              <div>
                <dt className="text-navy-500">Amount</dt>
                <dd className="font-bold text-lg">
                  {formatCurrency(donation.amount)}
                </dd>
              </div>
              <div>
                <dt className="text-navy-500">Type</dt>
                <dd className="capitalize">{donation.type}</dd>
              </div>
              <div>
                <dt className="text-navy-500">Frequency</dt>
                <dd>{donation.frequency || "One-time"}</dd>
              </div>
              <div>
                <dt className="text-navy-500">Submitted</dt>
                <dd>{new Date(donation.created_at).toLocaleString()}</dd>
              </div>
              {donation.confirmed_at && (
                <div>
                  <dt className="text-navy-500">Confirmed</dt>
                  <dd>{new Date(donation.confirmed_at).toLocaleString()}</dd>
                </div>
              )}
            </dl>
            {donation.message && (
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
                <p className="font-medium text-navy-700">Donor message</p>
                <p className="text-navy-600">{donation.message}</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-navy-950">Donor Information</h3>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-navy-500">Full name</dt>
                <dd>
                  {donation.first_name} {donation.last_name}
                </dd>
              </div>
              <div>
                <dt className="text-navy-500">Email</dt>
                <dd>{donation.email}</dd>
              </div>
              {donation.phone && (
                <div>
                  <dt className="text-navy-500">Phone</dt>
                  <dd>{donation.phone}</dd>
                </div>
              )}
            </dl>
            <h4 className="mb-2 mt-6 flex items-center gap-2 font-semibold text-navy-800">
              <MapPin className="h-4 w-4" />
              IP &amp; Location (captured on submit)
            </h4>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-navy-500">IP Address</dt>
                <dd className="font-mono">{donation.ip_address || "—"}</dd>
              </div>
              <div>
                <dt className="text-navy-500">City / Region</dt>
                <dd>
                  {donation.city || "—"}, {donation.region || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-navy-500">Country</dt>
                <dd>{donation.country || "—"}</dd>
              </div>
              {(donation.latitude || donation.longitude) && (
                <div>
                  <dt className="text-navy-500">Coordinates</dt>
                  <dd>
                    {donation.latitude}, {donation.longitude}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {donation.type === "cash" && donation.card_last4 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-navy-950">
                <CreditCard className="h-5 w-5" />
                Payment Method (masked — PCI compliant)
              </h3>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-navy-500">Card</dt>
                  <dd className="font-mono">
                    **** **** **** {donation.card_last4}
                  </dd>
                </div>
                <div>
                  <dt className="text-navy-500">Brand</dt>
                  <dd>{donation.card_brand}</dd>
                </div>
                <div>
                  <dt className="text-navy-500">Expiry</dt>
                  <dd>
                    {donation.card_exp_month}/{donation.card_exp_year}
                  </dd>
                </div>
                <div>
                  <dt className="text-navy-500">Cardholder</dt>
                  <dd>{donation.cardholder_name}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
                <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                Full card numbers and CVV are never stored (PCI-DSS requirement).
                For live payments, integrate Stripe tokenization.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-navy-950">Form Submission Data</h3>
            <pre className="max-h-64 overflow-auto rounded-lg bg-slate-50 p-4 text-xs text-navy-800">
              {JSON.stringify(details, null, 2)}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <DonationActions
              donationId={donation.id}
              status={donation.status}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-bold text-navy-950">Email History</h3>
            {emails.length === 0 ? (
              <p className="text-sm text-navy-500">No emails sent yet.</p>
            ) : (
              <ul className="space-y-3">
                {emails.map((e) => (
                  <li
                    key={e.id}
                    className="rounded-lg border border-slate-100 p-3 text-sm"
                  >
                    <p className="font-medium capitalize text-navy-800">
                      {String(e.email_type).replace("_", " ")}
                    </p>
                    <p className="text-xs text-navy-500">{e.subject}</p>
                    <p className="text-xs text-navy-400">
                      {e.status} · {new Date(e.sent_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
