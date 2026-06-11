import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { listDonations } from "@/lib/donations-service";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Eye } from "lucide-react";

export default async function AdminDonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const donations = await listDonations({
    status: params.status as "pending" | "confirmed" | undefined,
    search: params.q,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Donation History</h2>
          <p className="text-navy-600">Complete record of all submitted donations</p>
        </div>
        <form className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Search donor, email, reference..."
            className="min-h-[44px] w-full rounded-lg border border-slate-200 px-4 py-2 text-sm sm:min-w-[220px]"
          />
          <select
            name="status"
            defaultValue={params.status || ""}
            className="min-h-[44px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>
          <button type="submit" className="btn-primary px-4 py-2 text-sm">
            Filter
          </button>
        </form>
      </div>

      <div className="table-responsive rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-navy-500">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-navy-500">
                  No donations yet. Submissions from the public site will appear here.
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <tr key={d.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs">{d.reference_id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-950">
                      {d.first_name} {d.last_name}
                    </p>
                    <p className="text-xs text-navy-500">{d.email}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatCurrency(d.amount)}
                  </td>
                  <td className="px-4 py-3 capitalize">{d.type}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-navy-600">
                      <MapPin className="h-3 w-3" />
                      {d.city || "—"}, {d.country || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        d.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-500">
                    {new Date(d.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/donations/${d.id}`}
                      className="inline-flex items-center gap-1 text-navy-700 hover:text-navy-950"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
