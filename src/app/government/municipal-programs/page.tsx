import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Municipal Infrastructure Programs",
  description:
    "Real-world municipal infrastructure deployment programs through the Municipal Blockchain & Infrastructure Consortium.",
};

export default function MunicipalProgramsPage() {
  return (
    <GovernmentPageLayout
      title="Municipal Infrastructure Programs"
      subtitle="Real-World Civic Deployment"
      description="Deploying blockchain-enabled infrastructure solutions across municipalities — from funding transparency to procurement accountability and real-time public reporting."
    >
      <h2>Program Overview</h2>
      <p>
        Municipal Infrastructure Programs represent the operational core of the
        Consortium — where blockchain technology meets real-world civic
        deployment. These programs demonstrate the practical application of
        consortium-developed standards, frameworks, and workforce capabilities.
      </p>

      <h2>Program Focus Areas</h2>
      <ul>
        <li>Public infrastructure funding transparency</li>
        <li>Municipal procurement accountability systems</li>
        <li>Real-time public reporting and audit trails</li>
        <li>Smart contract-based grant management</li>
        <li>Transportation and utility infrastructure tracking</li>
        <li>Housing authority modernization initiatives</li>
        <li>Cross-agency data sharing and interoperability</li>
      </ul>

      <h2>Deployment Framework</h2>
      <p>
        Each municipal program follows a structured deployment framework designed
        for scalability and replicability across jurisdictions. Founding partners
        gain direct visibility into pilot opportunities and future deployment
        initiatives as programs expand nationally.
      </p>

      <h2>Partner Engagement</h2>
      <p>
        Enterprise blockchain companies, infrastructure firms, and municipal
        governments can engage with specific program areas aligned with their
        strategic interests. Early partners help define deployment standards
        that will guide nationwide municipal blockchain adoption.
      </p>
    </GovernmentPageLayout>
  );
}
