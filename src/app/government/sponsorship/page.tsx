import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Sponsorship & Enterprise Partnerships",
  description:
    "Enterprise sponsorship and partnership opportunities with the Municipal Blockchain & Infrastructure Consortium.",
};

export default function SponsorshipPage() {
  return (
    <GovernmentPageLayout
      title="Sponsorship & Enterprise Partnerships"
      subtitle="Strategic Corporate Engagement"
      description="Enterprise blockchain companies, infrastructure firms, and strategic sponsors gain early-entry positioning in a national civic infrastructure ecosystem."
    >
      <h2>Enterprise Engagement Model</h2>
      <p>
        The Consortium offers structured enterprise partnership tiers designed
        for organizations seeking strategic positioning in the municipal
        blockchain and civic infrastructure sector. This is not traditional
        sponsorship — it is strategic ecosystem participation.
      </p>

      <h2>Partnership Tiers</h2>
      <h3>Founding Enterprise Partner</h3>
      <p>
        Highest tier of consortium participation with full advisory access,
        deployment visibility, workforce pipeline priority, and co-branding as
        a founding infrastructure innovator.
      </p>
      <h3>Strategic Technology Partner</h3>
      <p>
        Technology-focused engagement with research lab access, pilot program
        participation, and integration opportunities within municipal
        deployment frameworks.
      </p>
      <h3>Workforce Development Partner</h3>
      <p>
        Priority access to the university workforce pipeline, internship program
        hosting, and input on certification model development.
      </p>
      <h3>Research & Innovation Sponsor</h3>
      <p>
        Sponsored research collaborations, technology validation programs, and
        access to civic technology research lab outputs.
      </p>

      <h2>Why Enterprise Companies Engage Early</h2>
      <ul>
        <li>Shape statewide policy frameworks and municipal deployment standards</li>
        <li>Gain direct visibility into public-sector pilot opportunities</li>
        <li>Access a deployment-ready workforce pipeline</li>
        <li>Establish long-term ecosystem positioning</li>
        <li>Participate in research collaborations with leading universities</li>
        <li>Brand as founding infrastructure innovators</li>
      </ul>
    </GovernmentPageLayout>
  );
}
