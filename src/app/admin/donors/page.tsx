import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { listDonors } from "@/lib/donations-service";
import { formatCurrency } from "@/lib/utils";
import { Bell, Eye } from "lucide-react";

export default async function AdminDonorsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const donors = await listDonors();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-950">Donor Records</h2>
        <p className="text-navy-600">
          All unique donors with lifetime totals. Send reminder emails from individual donation records.
        </p>
      </div>

      <div className="table-responsive rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-navy-500">
            <tr>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Gifts</th>
              <th className="px-4 py-3">Lifetime Total</th>
              <th className="px-4 py-3">Last Gift</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {donors.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-navy-500">
                  No donors yet.
                </td>
              </tr>
            ) : (
              donors.map((d) => (
                <tr key={d.email} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">
                    {d.first_name} {d.last_name}
                  </td>
                  <td className="px-4 py-3 text-navy-600">{d.email}</td>
                  <td className="px-4 py-3">{d.donation_count}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatCurrency(d.total_amount)}
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-500">
                    {new Date(d.last_donation).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/donations/${d.first_donation_id}`}
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

      <div className="rounded-xl border border-gold-200 bg-gold-50 p-4 text-sm text-navy-800">
        <Bell className="mb-2 inline h-4 w-4 text-gold-600" /> Use{" "}
        <strong>Send Reminder</strong> on any donation record to email a professional
        follow-up encouraging future gifts.
      </div>
    </div>
  );
}
