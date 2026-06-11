import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Executive Overview",
  description:
    "Executive overview of the Municipal Blockchain & Infrastructure Consortium — a national civic infrastructure initiative.",
};

export default function ExecutiveOverviewPage() {
  return (
    <GovernmentPageLayout
      title="Executive Overview"
      subtitle="National Civic Blockchain Infrastructure Consortium"
      description="A comprehensive overview of the Municipal Blockchain & Infrastructure Consortium and its mission to modernize civic infrastructure through blockchain technology, workforce partnerships, and real-world deployment."
    >
      <h2>The Initiative</h2>
      <p>
        The {siteConfig.consortiumName} represents a paradigm shift in how
        public infrastructure is funded, managed, monitored, and reported. Led by{" "}
        {siteConfig.name}, this first-of-its-kind collaborative initiative is
        establishing the foundation for a national civic infrastructure
        ecosystem.
      </p>

      <h2>Strategic Positioning</h2>
      <p>
        This is not a nonprofit program page — it is the launch point of a
        national civic infrastructure movement. The Consortium is designed to
        make enterprise blockchain companies, municipal leaders, universities,
        law schools, infrastructure experts, and institutional sponsors recognize
        that:
      </p>
      <ul>
        <li>This initiative is inevitable</li>
        <li>Early involvement provides strategic advantage</li>
        <li>Founding partnership status carries long-term ecosystem positioning</li>
        <li>The workforce pipeline solves a critical industry challenge</li>
      </ul>

      <h2>Core Mission</h2>
      <p>
        Our mission is to create a scalable ecosystem that modernizes how
        infrastructure projects are funded, managed, monitored, and publicly
        reported through blockchain technology, workforce partnerships, and
        real-world civic deployment.
      </p>

      <h2>Participating Stakeholders</h2>
      <ul>
        <li>Enterprise blockchain companies</li>
        <li>Municipal governments and public agencies</li>
        <li>Universities and law schools</li>
        <li>Infrastructure specialists and engineering firms</li>
        <li>Civic technology innovators</li>
        <li>Public policy leaders and government relations professionals</li>
        <li>Workforce development institutions</li>
        <li>Strategic corporate and philanthropic sponsors</li>
      </ul>

      <h2>Market Opportunity</h2>
      <p>
        Municipal blockchain infrastructure is no longer theoretical. Cities,
        counties, transportation agencies, utilities, housing authorities, and
        public institutions are actively seeking transparency, cost reduction,
        procurement accountability, infrastructure modernization, cybersecurity
        protections, workforce readiness, and real-time public reporting
        solutions.
      </p>
      <p>
        Organizations that establish partnerships now will help shape statewide
        policy frameworks, municipal deployment standards, workforce
        certification models, university research collaborations, and
        next-generation public infrastructure ecosystems.
      </p>
    </GovernmentPageLayout>
  );
}
