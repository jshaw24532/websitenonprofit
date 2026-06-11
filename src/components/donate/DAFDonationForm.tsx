"use client";

import { useState } from "react";
import { Loader2, Landmark } from "lucide-react";
import { dafProviders } from "@/lib/donations";
import type { Organization } from "@/lib/organizations";
import DonationSuccess from "./DonationSuccess";

interface DAFDonationFormProps {
  organization: Organization;
}

export default function DAFDonationForm({ organization }: DAFDonationFormProps) {
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
    provider: dafProviders[0],
    grantAmount: "",
    fundName: "",
    designation: "General operating support",
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
          type: "daf",
          donor: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
          },
          details: {
            organizationSlug: organization.slug,
            organizationName: organization.name,
            dafProvider: form.provider,
            grantAmountUsd: form.grantAmount,
            fundName: form.fundName,
            designation: form.designation,
            notes: form.notes,
            payeeName: organization.name,
            payeeEin: organization.ein,
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
      alert("Submission failed. Please recommend the grant directly in your DAF portal.");
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
          DAF grants settle as cash
        </p>
        <p className="mt-1 text-sm text-navy-600">
          Recommend a grant from your donor-advised fund without leaving our site.
          When your sponsor approves, funds arrive as dollars—ready for immediate
          program use.
        </p>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-gold-600" />
          <h3 className="font-bold text-navy-950">Grant payee information</h3>
        </div>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-navy-500">Organization</dt>
            <dd className="font-medium text-navy-900">{organization.name}</dd>
          </div>
          <div>
            <dt className="text-navy-500">EIN</dt>
            <dd className="font-medium text-navy-900">{organization.ein}</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg font-bold text-navy-950">Recommend your grant</h3>
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

        <label className="block text-sm font-medium text-navy-800">
          DAF sponsor *
        </label>
        <select
          required
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        >
          {dafProviders.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          required
          placeholder="Grant amount (USD) *"
          value={form.grantAmount}
          onChange={(e) => setForm({ ...form, grantAmount: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <input
          placeholder="Fund name in your DAF (optional)"
          value={form.fundName}
          onChange={(e) => setForm({ ...form, fundName: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <input
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
        <textarea
          rows={3}
          placeholder="Notes for our team"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Submit DAF Grant Recommendation"
          )}
        </button>
      </form>

      <p className="text-xs text-navy-500">
        You may also log in to your DAF portal directly and search for our
        organization by name or EIN. Grants are disbursed as cash to our account.
      </p>
    </div>
  );
}
