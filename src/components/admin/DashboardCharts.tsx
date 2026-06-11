"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface MonthlyPoint {
  month: string;
  count: number;
  amount: number;
}

interface GeoPoint {
  country: string;
  city: string;
  region: string;
  count: number;
  amount: number;
}

export default function DashboardCharts({
  monthly,
  geographic,
  peakMonth,
}: {
  monthly: MonthlyPoint[];
  geographic: GeoPoint[];
  peakMonth: string | null;
}) {
  const monthLabels = monthly.map((m) => ({
    ...m,
    label: m.month
      ? new Date(`${m.month}-01`).toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        })
      : m.month,
  }));

  const topGeo = geographic.slice(0, 12).map((g) => ({
    name: `${g.city}, ${g.region || g.country}`.slice(0, 28),
    count: g.count,
    amount: g.amount,
    country: g.country,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-navy-950">Monthly Donations</h3>
        {peakMonth && (
          <p className="mb-4 text-sm text-gold-600">
            Highest month:{" "}
            <strong>
              {new Date(`${peakMonth}-01`).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </strong>
          </p>
        )}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthLabels}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value, name) =>
                  name === "amount"
                    ? formatCurrency(Number(value))
                    : value
                }
              />
              <Bar dataKey="amount" name="amount" radius={[6, 6, 0, 0]}>
                {monthLabels.map((entry) => (
                  <Cell
                    key={entry.month}
                    fill={entry.month === peakMonth ? "#d4a843" : "#1e3a5f"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-navy-950">
          Donations by Location
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topGeo} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fontSize: 10 }}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#1e3a5f" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 max-h-40 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-navy-500">
                <th className="pb-2">Location</th>
                <th className="pb-2">Donations</th>
                <th className="pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {geographic.slice(0, 15).map((g, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="py-2">
                    {g.city}, {g.region} — {g.country}
                  </td>
                  <td className="py-2">{g.count}</td>
                  <td className="py-2">{formatCurrency(g.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
