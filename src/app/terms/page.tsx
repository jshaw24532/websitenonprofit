import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" />
      <section className="section-padding bg-white">
        <div className="container-wide prose-content max-w-3xl">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            By accessing and using the {siteConfig.name} website, you agree to
            these Terms of Use.
          </p>
          <h2>Use of Website</h2>
          <p>
            This website is provided for informational purposes about our
            nonprofit programs, the Municipal Blockchain & Infrastructure
            Consortium, and donation opportunities.
          </p>
          <h2>Donations</h2>
          <p>
            All donations are final and non-refundable unless required by law.
            Donations are tax-deductible to the extent allowed by applicable
            regulations.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about these terms, contact us at {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  );
}
