"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const roles = [
  { value: "outreach", label: "Outreach Volunteer" },
  { value: "coordinator", label: "Community Coordinator" },
  { value: "ambassador", label: "Consortium Ambassador" },
];

export default function VolunteerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    availability: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const roleLabel =
        roles.find((r) => r.value === form.role)?.label || form.role;

      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "volunteer",
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: `Volunteer Application — ${roleLabel}`,
          message: form.message,
          details: {
            "Preferred Role": roleLabel,
            Availability: form.availability || undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReferenceId(data.referenceId);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <Send className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="mb-2 text-xl font-bold text-green-900">
          Application Received!
        </h3>
        {referenceId && (
          <p className="mb-2 font-mono text-sm text-green-800">
            Reference: {referenceId}
          </p>
        )}
        <p className="text-green-700">
          Thank you for your interest in volunteering. We&apos;ll be in touch
          within 3-5 business days. A confirmation email has been sent to{" "}
          {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="v-name" className="mb-1 block text-sm font-medium text-navy-800">
            Full Name *
          </label>
          <input
            id="v-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="v-email" className="mb-1 block text-sm font-medium text-navy-800">
            Email *
          </label>
          <input
            id="v-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="v-phone" className="mb-1 block text-sm font-medium text-navy-800">
            Phone
          </label>
          <input
            id="v-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="v-role" className="mb-1 block text-sm font-medium text-navy-800">
            Preferred Role *
          </label>
          <select
            id="v-role"
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
          >
            <option value="">Select a role...</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="v-availability" className="mb-1 block text-sm font-medium text-navy-800">
          Availability
        </label>
        <input
          id="v-availability"
          placeholder="e.g. Weekends, 10 hrs/week"
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
      </div>
      <div>
        <label htmlFor="v-message" className="mb-1 block text-sm font-medium text-navy-800">
          Why do you want to volunteer? *
        </label>
        <textarea
          id="v-message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5"
        />
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit Application
      </button>
    </form>
  );
}
