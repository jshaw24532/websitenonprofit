"use client";

import { useState } from "react";
import { Send, Building2, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";
import { siteConfig } from "@/lib/config";

const interestLabels: Record<string, string> = {
  "founding-partner": "Founding Partnership",
  enterprise: "Enterprise Partnership",
  university: "University Collaboration",
  advisory: "Strategic Advisory",
  municipal: "Municipal Programs",
  research: "Research Labs",
  policy: "Government Relations & Policy",
  internship: "Internship & Fellowship",
  other: "Other",
};

export default function ContactConsortiumPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    organization: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "consortium",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: interestLabels[formData.interest] || formData.interest,
          message: formData.message,
          details: {
            Organization: formData.organization,
            "Title / Role": formData.title || undefined,
            "Area of Interest": interestLabels[formData.interest] || formData.interest,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReferenceId(data.referenceId);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GovernmentPageLayout
      title="Contact the Consortium"
      subtitle="Engage With Consortium Leadership"
      description="Organizations interested in founding partnership, enterprise engagement, university collaboration, or advisory participation are invited to connect with consortium leadership."
      showCta={false}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2>Consortium Contact Information</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
              <div>
                <p className="font-semibold text-navy-900">
                  {siteConfig.consortiumName}
                </p>
                <p className="text-sm text-navy-600">
                  Led by {siteConfig.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-gold-500" />
              <a
                href={`mailto:${siteConfig.consortiumEmail}`}
                className="text-navy-700 hover:text-navy-950"
              >
                {siteConfig.consortiumEmail}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-gold-500" />
              <span className="text-navy-700">{siteConfig.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
              <span className="text-navy-700">{siteConfig.address}</span>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-navy-950 p-6 text-white">
            <h3 className="mb-3 text-lg font-bold">Areas of Engagement</h3>
            <ul className="space-y-2 text-sm text-navy-200">
              <li>• Founding Partnership Inquiries</li>
              <li>• Enterprise & Sponsorship Engagement</li>
              <li>• University & Workforce Partnerships</li>
              <li>• Strategic Advisory Nominations</li>
              <li>• Municipal Program Collaboration</li>
              <li>• Research Lab Partnerships</li>
              <li>• Government Relations & Policy</li>
              <li>• Internship & Fellowship Programs</li>
            </ul>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-green-900">
                Inquiry Received
              </h3>
              {referenceId && (
                <p className="mb-2 font-mono text-sm text-green-800">
                  Reference: {referenceId}
                </p>
              )}
              <p className="text-green-700">
                Thank you for your interest in the Consortium. Our leadership
                team will review your inquiry and respond within 2-3 business
                days. A confirmation email has been sent to {formData.email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="organization" className="mb-1 block text-sm font-medium text-navy-800">
                  Organization Name *
                </label>
                <input
                  id="organization"
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  className="form-input text-navy-900"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-navy-800">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="form-input text-navy-900"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="mb-1 block text-sm font-medium text-navy-800">
                    Title / Role
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="form-input text-navy-900"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy-800">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="form-input text-navy-900"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-navy-800">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="form-input text-navy-900"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="interest" className="mb-1 block text-sm font-medium text-navy-800">
                  Area of Interest *
                </label>
                <select
                  id="interest"
                  required
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="form-input text-navy-900"
                >
                  <option value="">Select an area...</option>
                  <option value="founding-partner">Founding Partnership</option>
                  <option value="enterprise">Enterprise Partnership</option>
                  <option value="university">University Collaboration</option>
                  <option value="advisory">Strategic Advisory</option>
                  <option value="municipal">Municipal Programs</option>
                  <option value="research">Research Labs</option>
                  <option value="policy">Government Relations & Policy</option>
                  <option value="internship">Internship & Fellowship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy-800">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="form-input text-navy-900"
                  placeholder="Tell us about your organization and interest in the Consortium..."
                />
              </div>
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </GovernmentPageLayout>
  );
}

