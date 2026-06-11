import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Founding Partners",
  description:
    "Founding partnership opportunities with the Municipal Blockchain & Infrastructure Consortium.",
};

export default function FoundingPartnersPage() {
  return (
    <GovernmentPageLayout
      title="Founding Partners"
      subtitle="Strategic Early-Entry Opportunity"
      description="Founding Consortium Partners gain unparalleled access to shape infrastructure standards, policy direction, pilot programs, and workforce pipelines during the initial formation phase."
    >
      <h2>Founding Partnership Opportunities Now Open</h2>
      <p>
        The Consortium is currently engaging enterprise blockchain companies,
        infrastructure firms, universities, public-sector advisors, engineering
        specialists, cybersecurity organizations, philanthropic partners, and
        strategic sponsors seeking early participation in a national civic
        infrastructure initiative.
      </p>

      <h2>Why Founding Partners Matter</h2>
      <p>
        Early participation provides the greatest opportunity to help shape the
        foundational elements of this national initiative. Founding partners are
        not donors or supporters — they are strategic co-architects of an
        emerging civic infrastructure ecosystem.
      </p>

      <h2>Founding Partner Benefits</h2>
      <ul>
        <li>Direct visibility into public-sector pilot opportunities</li>
        <li>Access to future municipal deployment initiatives</li>
        <li>Branding as founding infrastructure innovators</li>
        <li>Priority access to university recruitment pipelines</li>
        <li>Strategic advisory board participation</li>
        <li>Research collaboration opportunities</li>
        <li>Long-term ecosystem positioning and influence</li>
        <li>Input on infrastructure standards and deployment frameworks</li>
        <li>Early access to policy development processes</li>
      </ul>

      <h2>Ideal Founding Partner Profile</h2>
      <ul>
        <li>Enterprise blockchain and distributed ledger technology companies</li>
        <li>Infrastructure engineering and construction firms</li>
        <li>Universities, law schools, and research institutions</li>
        <li>Cybersecurity and compliance organizations</li>
        <li>Public policy and government relations firms</li>
        <li>Philanthropic foundations with civic technology focus</li>
        <li>Municipal and regional government agencies</li>
      </ul>

      <h2>Engagement Process</h2>
      <p>
        Organizations interested in becoming Founding Consortium Partners are
        encouraged to engage during the initial formation phase while strategic
        advisory, sponsorship, research, and deployment opportunities are
        actively being structured. Contact our consortium leadership team to
        begin the engagement process.
      </p>
    </GovernmentPageLayout>
  );
}
