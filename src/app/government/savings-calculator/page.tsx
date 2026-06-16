import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SavingsPitchDeck from "@/components/government/SavingsPitchDeck";
import SavingsCalculator from "@/components/government/SavingsCalculator";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Municipal Savings Calculator",
  description:
    "Calculate how much your city can save on infrastructure projects with blockchain—up to 63% cost reduction. See instant estimates with the On 3rd Outreach savings model.",
};

export default function SavingsCalculatorPage() {
  return (
    <>
      <PageHero
        badge="Government & Infrastructure"
        title="Municipal Infrastructure Savings Calculator"
        subtitle="On 3rd Outreach — Reclaiming Infrastructure"
        description="Plug in your project budget and see instant savings. Our fixed model delivers up to 63% cost reduction for government agencies—with a transparent 37% philanthropic service fee applied only to gross savings."
        cta={{ label: "View $3M Example", href: "#savings-pitch" }}
        secondaryCta={{ label: "Try Calculator", href: "#calculator" }}
      />

      <div className="container-wide py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: "Government", href: "/government" },
            { label: "Savings Calculator" },
          ]}
        />
      </div>

      <section className="section-padding bg-section-gradient pt-0">
        <div className="container-wide space-y-16">
          <SavingsPitchDeck />

          <div id="calculator" className="scroll-mt-28">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold-600">
                  <Calculator className="h-4 w-4" />
                  Interactive Tool
                </p>
                <h2 className="heading-section">
                  Calculate Your City&apos;s Savings
                </h2>
                <p className="text-lead mt-3 max-w-2xl">
                  Enter your total project budget. Savings (63%) and service fee
                  (37% of savings) are fixed—results update instantly.
                </p>
              </div>
              <Link
                href="/government/contact"
                className="btn-primary shrink-0 self-start sm:self-auto"
              >
                Request a City Briefing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <SavingsCalculator />
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Modernize Your Municipal Infrastructure?"
        description="Join the Municipal Blockchain & Infrastructure Consortium and put blockchain savings to work for your community—with zero upfront cost to your agency."
        primaryLabel="Become a Founding Partner"
        primaryHref="/government/founding-partners"
        secondaryLabel="Contact the Consortium"
        secondaryHref="/government/contact"
      />
    </>
  );
}
