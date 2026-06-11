"use client";

import { useState } from "react";
import { Loader2, Building2 } from "lucide-react";
import { stockDonationInfo } from "@/lib/donations";
import type { Organization } from "@/lib/organizations";
import DonationSuccess from "./DonationSuccess";

interface StockDonationFormProps {
  organization: Organization;
}

export default function StockDonationForm({
  organization,
}: StockDonationFormProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    referenceId: string;
    message: string;
    estimatedSettlement?: string;
    email: string;
  } | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ticker: "",
    shares: "",
    broker: "",
    costBasis: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/donations/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "stock",
          donor: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
          },
          details: {
            organizationSlug: organization.slug,
            organizationName: organization.name,
            ticker: form.ticker.toUpperCase(),
            numberOfShares: form.shares,
            brokerName: form.broker,
            costBasis: form.costBasis,
            notes: form.notes,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult({
        referenceId: data.referenceId,
        message: data.message,
        estimatedSettlement: data.estimatedSettlement,
        email: form.email,
      });
    } catch {
      alert("Submission failed. Please contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <DonationSuccess
        referenceId={result.referenceId}
        message={result.message}
        estimatedSettlement={result.estimatedSettlement}
        email={result.email}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gold-200 bg-gold-50/50 p-4">
        <p className="text-sm font-semibold text-navy-900">
          Stocks convert to cash automatically
        </p>
        <p className="mt-1 text-sm text-navy-600">
          Transferred securities are sold upon receipt and converted to USD—same
          modern workflow used by leading nonprofits on{" "}
          <a
            href="https://thegivingblock.com/crypto-donations/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-600 underline"
          >
            The Giving Block
          </a>
          .
        </p>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gold-600" />
          <h3 className="font-bold text-navy-950">Brokerage transfer details</h3>
        </div>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-navy-500">Account name</dt>
            <dd className="font-medium text-navy-900">{organization.name}</dd>
          </div>
          <div>
            <dt className="text-navy-500">EIN</dt>
            <dd className="font-medium text-navy-900">{stockDonationInfo.ein}</dd>
          </div>
          <div>
            <dt className="text-navy-500">DTC number</dt>
            <dd className="font-medium text-navy-900">
              {stockDonationInfo.dtcNumber}
            </dd>
          </div>
          <div>
            <dt className="text-navy-500">Account number</dt>
            <dd className="font-mono font-medium text-navy-900">
              {stockDonationInfo.accountNumber}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-navy-500">
          Your broker will initiate an electronic transfer. Shares are liquidated
          to cash after settlement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg font-bold text-navy-950">Donor information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="First name *"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="rounded-lg border border-navy-200 px-4 py-2.5"
          />
          <input
            required
            placeholder="Last name *"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="rounded-lg border border-navy-200 px-4 py-2.5"
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />

        <h3 className="text-lg font-bold text-navy-950">Security details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Stock ticker (e.g. AAPL) *"
            value={form.ticker}
            onChange={(e) => setForm({ ...form, ticker: e.target.value })}
            className="rounded-lg border border-navy-200 px-4 py-2.5 uppercase"
          />
          <input
            required
            placeholder="Number of shares *"
            value={form.shares}
            onChange={(e) => setForm({ ...form, shares: e.target.value })}
            className="rounded-lg border border-navy-200 px-4 py-2.5"
          />
        </div>
        <input
          required
          placeholder="Your brokerage firm *"
          value={form.broker}
          onChange={(e) => setForm({ ...form, broker: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <input
          placeholder="Approximate cost basis (optional)"
          value={form.costBasis}
          onChange={(e) => setForm({ ...form, costBasis: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <textarea
          rows={3}
          placeholder="Additional notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Initiate Stock Gift & Cash Conversion"
          )}
        </button>
      </form>

      <div>
        <p className="mb-2 text-sm font-semibold text-navy-800">We accept:</p>
        <ul className="flex flex-wrap gap-2">
          {stockDonationInfo.supportedTypes.map((t) => (
            <li
              key={t}
              className="rounded-full bg-navy-100 px-3 py-1 text-xs text-navy-700"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
