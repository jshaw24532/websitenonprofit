import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Impact",
  description: "The impact of our community outreach and civic infrastructure programs.",
};

const stats = [
  { value: "50,000+", label: "Meals Served Annually" },
  { value: "25+", label: "Communities Reached" },
  { value: "12", label: "University Partners" },
  { value: "8", label: "Municipal Pilot Programs" },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        badge="Our Impact"
        title="Creating Lasting Change"
        description="Measuring our impact across community outreach and civic infrastructure innovation."
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-navy-950 p-8 text-center text-white"
              >
                <p className="mb-2 text-4xl font-bold text-gold-400">
                  {value}
                </p>
                <p className="text-sm text-navy-300">{label}</p>
              </div>
            ))}
          </div>

          <div className="prose-content mx-auto max-w-3xl">
            <h2>Community Outreach Impact</h2>
            <p>
              Our mobile food outreach service trucks have become a lifeline for
              underserved communities, providing consistent access to nutritious
              meals and essential resources. Every donation directly supports
              our ability to reach more communities and serve more families.
            </p>

            <h2>Civic Infrastructure Impact</h2>
            <p>
              Through the Municipal Blockchain & Infrastructure Consortium, we
              are shaping the future of government transparency and infrastructure
              modernization. Our workforce pipeline is developing the next
              generation of deployment-ready municipal blockchain professionals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
