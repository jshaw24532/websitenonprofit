"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
          formType: "contact",
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReferenceId(data.referenceId);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        badge="Contact Us"
        title="Get In Touch"
        description="Have questions about our programs, the Consortium, or how to get involved? We'd love to hear from you."
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="heading-subsection mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold-500" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-navy-700 hover:text-navy-950"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold-500" />
                  <span className="text-navy-700">{siteConfig.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-gold-500" />
                  <span className="text-navy-700">{siteConfig.address}</span>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <Send className="mx-auto mb-4 h-12 w-12 text-green-600" />
                  <h3 className="mb-2 text-xl font-bold text-green-900">
                    Message Sent!
                  </h3>
                  {referenceId && (
                    <p className="mb-2 font-mono text-sm text-green-800">
                      Reference: {referenceId}
                    </p>
                  )}
                  <p className="text-green-700">
                    We&apos;ll get back to you within 1-2 business days. A
                    confirmation email has been sent to {form.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium text-navy-800">
                        Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-navy-200 px-4 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy-800">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-navy-200 px-4 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-navy-800">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-navy-200 px-4 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium text-navy-800">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-lg border border-navy-200 px-4 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy-800">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-navy-200 px-4 py-2.5 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
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
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
