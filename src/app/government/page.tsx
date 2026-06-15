import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { governmentNav, siteConfig } from "@/lib/config";

export default function GovernmentIndexPage() {
  return (
    <>
      <PageHero
        badge="For Cities & Municipal Leaders"
        title="Government & Infrastructure Savings"
        description={siteConfig.valueProposition}
        cta={{
          label: "Calculate Your Savings",
          href: "/government/savings-calculator",
        }}
        secondaryCta={{
          label: "Executive Overview",
          href: "/government/executive-overview",
        }}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="heading-section mb-4">
              Consortium Programs & Initiatives
            </h2>
            <p className="text-lead">
              Explore the full scope of our national civic infrastructure
              initiative. Each program is designed to create strategic advantage
              for early participating organizations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {governmentNav.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group card flex items-start justify-between"
              >
                <div>
                  <h3 className="mb-2 text-lg font-bold text-navy-950 group-hover:text-navy-800">
                    {item.label}
                  </h3>
                  <p className="text-sm text-navy-600">{item.description}</p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
