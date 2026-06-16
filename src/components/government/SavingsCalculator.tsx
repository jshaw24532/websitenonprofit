"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Lock,
  Phone,
  Printer,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  BLOCKCHAIN_SAVINGS_RATE,
  DEFAULT_PROJECT_BUDGET,
  OUTREACH_FEE_RATE,
  PROJECT_TYPES,
  calculateSavings,
  formatBudgetInput,
  parseBudgetInput,
  type ProjectType,
} from "@/lib/savings-model";
import { cn, formatCurrency } from "@/lib/utils";

function formatCurrencyExact(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function SavingsCalculator() {
  const [budgetInput, setBudgetInput] = useState(
    formatBudgetInput(DEFAULT_PROJECT_BUDGET)
  );
  const [projectType, setProjectType] = useState<ProjectType>(
    PROJECT_TYPES[0]
  );

  const budget = parseBudgetInput(budgetInput);
  const breakdown = useMemo(() => calculateSavings(budget), [budget]);

  const handleBudgetChange = (raw: string) => {
    setBudgetInput(formatBudgetInput(parseBudgetInput(raw)));
  };

  const handlePrint = () => window.print();

  const phoneHref = `tel:${siteConfig.phone.replace(/\D/g, "")}`;

  return (
    <div className="savings-calculator">
      {/* Hero + input panel */}
      <div className="overflow-hidden rounded-2xl border border-navy-800 bg-navy-950 shadow-2xl">
        <div className="border-b border-white/10 px-6 py-8 sm:px-10 sm:py-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            On 3rd Outreach — Reclaiming Infrastructure
          </p>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              See how much your city could save with{" "}
              <span className="text-gold-400">blockchain</span>
            </h2>
            <p className="text-sm leading-relaxed text-navy-300 lg:text-right">
              Enter your project budget below. See your instant savings
              estimate—with zero out-of-pocket cost to your agency.
            </p>
          </div>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-center text-sm text-navy-300">
            Adjust the values to match your infrastructure project.
          </p>

          <div>
            <label
              htmlFor="project-budget"
              className="mb-3 block text-center text-xs font-bold uppercase tracking-[0.25em] text-navy-400"
            >
              Total Project Budget
            </label>
            <div className="relative mx-auto max-w-2xl">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-light text-navy-500 sm:text-3xl">
                $
              </span>
              <input
                id="project-budget"
                type="text"
                inputMode="numeric"
                value={budgetInput}
                onChange={(e) => handleBudgetChange(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border-2 border-navy-700 bg-navy-900 py-4 pl-12 pr-5 text-center font-display text-3xl font-bold text-white placeholder:text-navy-600 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 sm:text-4xl"
                aria-label="Total project budget in US dollars"
              />
            </div>
          </div>

          <div>
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-navy-400">
              Project Type
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    projectType === type
                      ? "border-gold-400 bg-gold-400 text-navy-950"
                      : "border-navy-600 bg-transparent text-navy-200 hover:border-navy-400 hover:text-white"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-800 bg-navy-900/60 p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-300">
                  Blockchain Savings Rate
                </span>
                <span className="text-lg font-bold text-gold-400">
                  {BLOCKCHAIN_SAVINGS_RATE * 100}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-navy-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                  style={{ width: `${BLOCKCHAIN_SAVINGS_RATE * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-navy-500">
                Fixed municipal infrastructure savings
              </p>
            </div>

            <div className="rounded-xl border border-navy-800 bg-navy-900/60 p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-300">
                  On 3rd Outreach Service Fee
                </span>
                <span className="text-lg font-bold text-gold-400">
                  {OUTREACH_FEE_RATE * 100}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-navy-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                  style={{ width: `${OUTREACH_FEE_RATE * 100}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-navy-500">
                Applied to gross project savings only
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10 rounded-2xl border border-navy-100 bg-white p-6 shadow-lg sm:p-8 md:p-10">
        <h3 className="mb-8 text-center font-display text-2xl font-bold text-navy-950 sm:text-3xl">
          Your Savings Estimate
        </h3>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-navy-500">
            <span>Blockchain cost vs. traditional cost</span>
            <span className="text-gold-600">
              {Math.round(breakdown.actualCostRate * 100)}% of original
            </span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full bg-navy-100">
            <div
              className="bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
              style={{ width: `${breakdown.actualCostRate * 100}%` }}
            />
            <div
              className="bg-emerald-100 transition-all duration-500"
              style={{ width: `${breakdown.grossSavingsRate * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Total Savings
            </p>
            <p className="font-display text-3xl font-bold text-emerald-700 sm:text-4xl">
              {formatCurrency(breakdown.grossSavings)}
            </p>
            <p className="mt-1 text-sm text-emerald-600">
              {BLOCKCHAIN_SAVINGS_RATE * 100}% reduction in project cost
            </p>
          </div>

          <div className="rounded-xl border border-cyan-200 bg-cyan-50 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-800">
              Actual Project Cost
            </p>
            <p className="font-display text-3xl font-bold text-cyan-800 sm:text-4xl">
              {formatCurrency(breakdown.actualProjectCost)}
            </p>
            <p className="mt-1 text-sm text-cyan-700">
              What your agency pays after blockchain deployment
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              On 3rd Outreach Fee
            </p>
            <p className="font-display text-3xl font-bold text-amber-700 sm:text-4xl">
              {formatCurrency(breakdown.outreachFee)}
            </p>
            <p className="mt-1 text-sm text-amber-700">
              {OUTREACH_FEE_RATE * 100}% of gross savings — philanthropic
              service fee
            </p>
          </div>

          <div className="rounded-xl border border-navy-800 bg-navy-950 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Net Savings for City
            </p>
            <p className="font-display text-3xl font-bold text-gold-400 sm:text-4xl">
              {formatCurrency(breakdown.netSavings)}
            </p>
            <p className="mt-1 text-sm text-navy-300">
              Total savings your community keeps after service fee
            </p>
          </div>
        </div>

        {/* Full breakdown */}
        <div className="mt-10 print:break-inside-avoid">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-500">
            Full Breakdown
          </p>
          <div className="overflow-hidden rounded-xl border border-navy-200">
            <div className="divide-y divide-navy-100 bg-navy-50/50">
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm sm:px-6">
                <span className="text-navy-700">Traditional project cost</span>
                <span className="font-semibold text-rose-600">
                  {formatCurrencyExact(breakdown.traditionalCost)}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm sm:px-6">
                <span className="text-navy-700">
                  Gross project savings ({BLOCKCHAIN_SAVINGS_RATE * 100}%)
                </span>
                <span className="font-semibold text-emerald-600">
                  {formatCurrency(breakdown.grossSavings)}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm sm:px-6">
                <span className="text-navy-700">
                  On 3rd Outreach service fee ({OUTREACH_FEE_RATE * 100}% of
                  savings)
                </span>
                <span className="font-semibold text-amber-700">
                  {formatCurrency(breakdown.outreachFee)}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-5 py-4 text-sm font-bold sm:px-6">
                <span className="text-navy-900">
                  Net savings your agency keeps
                </span>
                <span className="text-emerald-700">
                  {formatCurrency(breakdown.netSavings)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-navy-950 px-5 py-4">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
          <p className="text-sm leading-relaxed text-navy-200">
            Our fee is paid exclusively from the savings we generate. If we
            don&apos;t save you money, you pay nothing. No fees. No retainers.
            No budget risk.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 print:hidden">
          <a href={phoneHref} className="btn-primary">
            <Phone className="h-4 w-4" />
            Call {siteConfig.phone}
          </a>
          <button type="button" onClick={handlePrint} className="btn-outline">
            <Printer className="h-4 w-4" />
            Print This Estimate
          </button>
          <Link href="/government/contact" className="btn-outline">
            <Building2 className="h-4 w-4" />
            Contact the Consortium
          </Link>
        </div>
      </div>
    </div>
  );
}
