import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminStats } from "@/lib/donations-service";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle, DollarSign, Heart } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const stats = await getAdminStats();

  const cards = [
    {
      label: "Total Raised",
      value: formatCurrency(stats.totals.total_amount),
      icon: DollarSign,
      color: "text-gold-600",
    },
    {
      label: "Total Donations",
      value: String(stats.totals.total_count),
      icon: Heart,
      color: "text-navy-700",
    },
    {
      label: "Pending Review",
      value: String(stats.totals.pending_count),
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Confirmed",
      value: String(stats.totals.confirmed_count),
      icon: CheckCircle,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-950">Dashboard</h2>
        <p className="text-navy-600">
          Welcome back, {session.name}. Overview of all donation activity.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-navy-500">
                  {card.label}
                </span>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="text-3xl font-bold text-navy-950">{card.value}</p>
            </div>
          );
        })}
      </div>

      <DashboardCharts
        monthly={stats.monthly}
        geographic={stats.geographic}
        peakMonth={stats.peakMonth}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-navy-950">By Donation Type</h3>
          <div className="space-y-3">
            {stats.byType.map((t) => (
              <div
                key={t.type}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
              >
                <span className="font-medium capitalize text-navy-800">
                  {t.type}
                </span>
                <span className="text-sm text-navy-600">
                  {t.count} gifts · {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-navy-950">Quick Actions</h3>
            <Link
              href="/admin/donations"
              className="flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-navy-950"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm text-navy-700">
            <li>• Review pending donations and confirm receipt of funds</li>
            <li>• Send official receipts and confirmation emails from each record</li>
            <li>• Send future donation reminder emails to past donors</li>
            <li>• View donor IP, city, and geographic analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
