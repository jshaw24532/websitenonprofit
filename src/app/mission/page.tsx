import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Our Mission",
  description: `The mission of ${siteConfig.name} — community outreach and civic infrastructure innovation.`,
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        badge="Our Mission"
        title="Serving Communities, Building Infrastructure"
        description="Our dual mission combines direct community service with national civic technology leadership."
      />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <div className="prose-content">
            <h2>Community Outreach Mission</h2>
            <p>
              {siteConfig.name} operates mobile food outreach service trucks
              that deliver nutritious meals, essential resources, and hope to
              underserved communities. We believe that no one should go hungry,
              and we work tirelessly to ensure that our neighbors have access
              to the food and support they need.
            </p>

            <h2>Civic Infrastructure Mission</h2>
            <p>
              Through the {siteConfig.consortiumName}, we are establishing a
              first-of-its-kind collaborative initiative that modernizes how
              infrastructure projects are funded, managed, monitored, and
              publicly reported through blockchain technology, workforce
              partnerships, and real-world civic deployment.
            </p>

            <h2>Our Vision</h2>
            <p>
              We envision a future where every community has access to nutritious
              food and where public infrastructure is transparent, accountable,
              and modernized through cutting-edge technology. By combining direct
              community service with national civic innovation, we create lasting
              impact at both the local and national level.
            </p>

            <h2>Core Values</h2>
            <ul>
              <li>Compassion and dignity in community service</li>
              <li>Transparency and accountability in all operations</li>
              <li>Innovation through technology and collaboration</li>
              <li>Equity and access for all communities</li>
              <li>Strategic partnerships for maximum impact</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
