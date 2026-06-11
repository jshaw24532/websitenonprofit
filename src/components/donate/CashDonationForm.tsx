"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { donationTiers } from "@/lib/config";
import { formatCurrency } from "@/lib/utils";
import type { Organization } from "@/lib/organizations";
import StripeCheckout from "./StripeCheckout";

interface CashDonationFormProps {
  organization: Organization;
}

export default function CashDonationForm({ organization }: CashDonationFormProps) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [step, setStep] = useState<"details" | "payment" | "done">("details");
  const [referenceId, setReferenceId] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    message: "",
  });

  const amount =
    selectedTier ?? (customAmount ? parseInt(customAmount, 10) : 0);

  if (step === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h2 className="mb-2 text-2xl font-bold text-green-900">Thank You!</h2>
        <p className="mb-4 text-green-700">
          Your {formatCurrency(amount)}
          {frequency === "monthly" ? " monthly " : " "}
          donation to {organization.shortName} was successful.
        </p>
        {referenceId && (
          <p className="mb-2 font-mono text-sm text-green-800">
            Reference: {referenceId}
          </p>
        )}
        <p className="text-sm text-green-600">
          A thank-you and confirmation email have been sent to {formData.email}.
        </p>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-gold-200 bg-gold-50 p-4 text-sm text-navy-800">
          <strong>
            {formatCurrency(amount)}
            {frequency === "monthly" ? " / month" : ""}
          </strong>{" "}
          to {organization.name} — {formData.firstName} {formData.lastName}
        </div>
        <StripeCheckout
          organizationSlug={organization.slug}
          organizationName={organization.name}
          organizationShortName={organization.shortName}
          amount={amount}
          frequency={frequency}
          donor={formData}
          onSuccess={({ referenceId: ref }) => {
            setReferenceId(ref);
            setStep("done");
          }}
          onBack={() => setStep("details")}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (amount > 0) setStep("payment");
      }}
      className="space-y-8"
    >
      <div>
        <h2 className="heading-subsection mb-4">Select Donation Amount</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFrequency("one-time")}
            className={`min-h-[44px] rounded-lg px-4 py-2 text-sm font-semibold ${
              frequency === "one-time"
                ? "bg-navy-950 text-white"
                : "bg-navy-100 text-navy-700"
            }`}
          >
            One-Time
          </button>
          <button
            type="button"
            onClick={() => setFrequency("monthly")}
            className={`min-h-[44px] rounded-lg px-4 py-2 text-sm font-semibold ${
              frequency === "monthly"
                ? "bg-navy-950 text-white"
                : "bg-navy-100 text-navy-700"
            }`}
          >
            Monthly
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {donationTiers.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              onClick={() => {
                setSelectedTier(tier.amount);
                setCustomAmount("");
              }}
              className={`rounded-xl border-2 p-4 text-left ${
                selectedTier === tier.amount
                  ? "border-gold-500 bg-gold-50"
                  : "border-navy-100"
              }`}
            >
              <p className="text-lg font-bold text-navy-950">
                {formatCurrency(tier.amount)}
              </p>
              <p className="text-sm text-navy-800">{tier.name}</p>
            </button>
          ))}
        </div>
        <div className="relative mt-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500">
            $
          </span>
          <input
            type="number"
            min="1"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedTier(null);
            }}
            className="form-input pl-8"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold text-navy-900">Donor Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="First name *"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="form-input"
          />
          <input
            required
            placeholder="Last name *"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="form-input"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input
            required
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-input"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="form-input"
          />
        </div>
        <input
          placeholder="Street address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="form-input mt-4"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <input
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="form-input"
          />
          <input
            placeholder="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="form-input"
          />
          <input
            placeholder="ZIP"
            value={formData.zip}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            className="form-input"
          />
        </div>
        <textarea
          rows={3}
          placeholder="Message (optional)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-4 w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
      </div>

      <button
        type="submit"
        disabled={!amount || amount <= 0}
        className="btn-primary w-full py-4 disabled:opacity-50"
      >
        <ArrowRight className="h-5 w-5" />
        Continue to secure payment —{" "}
        {amount > 0 ? formatCurrency(amount) : "Donate"} to{" "}
        {organization.shortName}
      </button>
    </form>
  );
}
