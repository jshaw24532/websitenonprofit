import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { listFormSubmissions, parseFormDetails } from "@/lib/forms-service";
import { MapPin, Mail } from "lucide-react";

const typeLabels: Record<string, string> = {
  contact: "Contact",
  consortium: "Consortium",
  volunteer: "Volunteer",
};

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const submissions = await listFormSubmissions(
    params.type as "contact" | "consortium" | "volunteer" | undefined
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Form Submissions</h2>
          <p className="text-navy-600">
            Contact, consortium, and volunteer inquiries
          </p>
        </div>
        <form className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <select
            name="type"
            defaultValue={params.type || ""}
            className="min-h-[44px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All forms</option>
            <option value="contact">Contact</option>
            <option value="consortium">Consortium</option>
            <option value="volunteer">Volunteer</option>
          </select>
          <button type="submit" className="btn-primary px-4 py-2 text-sm">
            Filter
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-navy-500">
            No form submissions yet.
          </div>
        ) : (
          submissions.map((s) => {
            const details = parseFormDetails(s);
            return (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-navy-100 px-2 py-0.5 text-xs font-semibold capitalize text-navy-800">
                      {typeLabels[s.form_type] || s.form_type}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-navy-950">
                      {s.name}
                    </h3>
                    <p className="font-mono text-xs text-navy-500">
                      {s.reference_id}
                    </p>
                  </div>
                  <p className="text-xs text-navy-500">
                    {new Date(s.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="grid gap-4 text-sm sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-navy-700">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${s.email}`} className="hover:underline">
                      {s.email}
                    </a>
                  </p>
                  {s.phone && <p className="text-navy-700">Phone: {s.phone}</p>}
                  {s.subject && (
                    <p className="text-navy-700">Subject: {s.subject}</p>
                  )}
                  {(s.city || s.country) && (
                    <p className="flex items-center gap-2 text-navy-600">
                      <MapPin className="h-4 w-4" />
                      {s.city}, {s.region} — {s.country}
                    </p>
                  )}
                </div>
                <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-navy-800">
                  {s.message}
                </p>
                {Object.keys(details).length > 0 && (
                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    {Object.entries(details).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-navy-500">{k}</dt>
                        <dd className="font-medium text-navy-900">
                          {String(v)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="mt-3 text-xs text-navy-400">
                  IP: {s.ip_address || "—"} · Admin notified:{" "}
                  {s.admin_notified ? "Yes" : "No"} · User auto-reply:{" "}
                  {s.user_notified ? "Yes" : "No"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
