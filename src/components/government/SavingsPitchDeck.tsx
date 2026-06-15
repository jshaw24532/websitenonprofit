import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Shield,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  BLOCKCHAIN_SAVINGS_RATE,
  DEFAULT_PROJECT_BUDGET,
  OUTREACH_FEE_RATE,
  calculateSavings,
} from "@/lib/savings-model";
import { formatCurrency } from "@/lib/utils";

const example = calculateSavings(DEFAULT_PROJECT_BUDGET);

const pitchPoints = [
  {
    icon: TrendingDown,
    title: "Up to 65% Cost Reduction",
    body: "Blockchain-enabled municipal infrastructure delivery cuts traditional project costs by up to 65% through transparent procurement, automated compliance, and reduced administrative overhead.",
  },
  {
    icon: Wallet,
    title: "Zero Upfront Agency Cost",
    body: "On 3rd Outreach is compensated only from documented savings. Your agency bears no retainer, no implementation fee, and no budget line-item risk.",
  },
  {
    icon: Shield,
    title: "35% Philanthropic Service Fee",
    body: "A fixed 35% fee applies solely to gross savings generated—not to your original budget. The remaining 65% of savings flows back to your community.",
  },
  {
    icon: Building2,
    title: "Built for Government Scale",
    body: "Roads, water systems, schools, public buildings, and critical infrastructure projects—modeled for real municipal deployment through the MBIC consortium.",
  },
];

export default function SavingsPitchDeck() {
  return (
    <section
      id="savings-pitch"
      className="savings-pitch-deck overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-xl"
    >
      {/* Header band */}
      <div className="bg-dark-gradient px-6 py-10 text-white sm:px-10 sm:py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
          One-Page Pitch Deck
        </p>
        <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
          The On 3rd Outreach Municipal Savings Model
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-200 sm:text-lg">
          A fixed, transparent formula that shows cities exactly how blockchain
          infrastructure modernization reduces project costs—with no out-of-pocket
          expense to the agency.
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        {/* Value pillars */}
        <div className="border-b border-navy-100 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <h3 className="mb-6 font-display text-xl font-bold text-navy-950">
            How the Model Works
          </h3>
          <div className="space-y-5">
            {pitchPoints.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-navy-950">{title}</h4>
                  <p className="text-sm leading-relaxed text-navy-600">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* $3M example */}
        <div className="bg-section-gradient p-6 sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold-600">
            Worked Example
          </p>
          <h3 className="mb-1 font-display text-2xl font-bold text-navy-950">
            {formatCurrency(DEFAULT_PROJECT_BUDGET)} Infrastructure Project
          </h3>
          <p className="mb-6 text-sm text-navy-600">
            Illustrative municipal roads &amp; streets deployment
          </p>

          <div className="space-y-3">
            {[
              {
                label: "Traditional project cost",
                value: formatCurrency(example.traditionalCost),
                tone: "text-rose-600",
              },
              {
                label: `Gross savings (${BLOCKCHAIN_SAVINGS_RATE * 100}%)`,
                value: formatCurrency(example.grossSavings),
                tone: "text-emerald-600",
              },
              {
                label: `Service fee (${OUTREACH_FEE_RATE * 100}% of savings)`,
                value: formatCurrency(example.outreachFee),
                tone: "text-amber-700",
              },
              {
                label: "Net savings agency keeps",
                value: formatCurrency(example.netSavings),
                tone: "text-gold-600 font-bold",
                highlight: true,
              },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                  row.highlight
                    ? "border-gold-300 bg-navy-950 text-white"
                    : "border-navy-100 bg-white"
                }`}
              >
                <span
                  className={
                    row.highlight ? "text-sm text-navy-200" : "text-sm text-navy-700"
                  }
                >
                  {row.label}
                </span>
                <span
                  className={`text-sm sm:text-base ${row.highlight ? "font-display text-xl font-bold text-gold-400" : `font-semibold ${row.tone}`}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-navy-500">
            Actual project cost after savings:{" "}
            <strong className="text-navy-800">
              {formatCurrency(example.actualProjectCost)}
            </strong>{" "}
            ({Math.round(example.actualCostRate * 100)}% of original budget)
          </p>
        </div>
      </div>

      {/* Formula strip */}
      <div className="border-t border-navy-100 bg-navy-50 px-6 py-6 sm:px-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-navy-500">
          The Formula
        </p>
        <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-navy-800 sm:text-base">
          <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
            Gross Savings = Budget × 65%
          </span>
          <span className="text-navy-400">→</span>
          <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
            Fee = Gross Savings × 35%
          </span>
          <span className="text-navy-400">→</span>
          <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
            Net Savings = Gross − Fee
          </span>
        </div>
      </div>

      {/* Benefits + CTA */}
      <div className="grid gap-0 border-t border-navy-100 lg:grid-cols-[1fr_auto]">
        <div className="p-6 sm:p-8">
          <h3 className="mb-4 font-display text-lg font-bold text-navy-950">
            Why Cities Partner with {siteConfig.shortName}
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "No cost unless savings are delivered",
              "Fixed, auditable savings rates",
              "501(c)(3) philanthropic structure",
              "MBIC consortium deployment support",
              "Workforce pipeline for day-one talent",
              "Transparent blockchain accountability",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-3 border-t border-navy-100 bg-navy-950 p-6 sm:p-8 lg:border-l lg:border-t-0 print:hidden">
          <Link href="#calculator" className="btn-primary whitespace-nowrap">
            Try the Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/government/contact" className="btn-secondary whitespace-nowrap">
            Schedule a Briefing
          </Link>
        </div>
      </div>
    </section>
  );
}
