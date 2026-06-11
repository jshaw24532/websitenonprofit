import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Government Relations & Public Policy",
  description:
    "Government relations and public policy frameworks for municipal blockchain infrastructure deployment.",
};

export default function PublicPolicyPage() {
  return (
    <GovernmentPageLayout
      title="Government Relations & Public Policy"
      subtitle="Policy Frameworks & Government Alignment"
      description="Developing statewide policy frameworks, regulatory guidelines, and government alignment strategies for municipal blockchain infrastructure deployment."
    >
      <h2>Policy Development Mission</h2>
      <p>
        The Consortium&apos;s Government Relations & Public Policy division
        works at the intersection of blockchain technology, municipal
        governance, and regulatory frameworks — ensuring that consortium
        initiatives align with government priorities and public sector
        requirements.
      </p>

      <h2>Policy Focus Areas</h2>
      <ul>
        <li>Statewide blockchain policy framework development</li>
        <li>Municipal deployment standards and guidelines</li>
        <li>Regulatory compliance and governance models</li>
        <li>Public procurement modernization policies</li>
        <li>Data privacy and security regulations for civic blockchain</li>
        <li>Intergovernmental data sharing agreements</li>
        <li>Workforce certification and licensing standards</li>
      </ul>

      <h2>Government Engagement</h2>
      <p>
        The Consortium actively engages with municipal leaders, state
        legislators, federal agency representatives, and public policy
        institutions to develop frameworks that enable — rather than hinder —
        municipal blockchain adoption.
      </p>

      <h2>Partner Participation</h2>
      <p>
        Founding partners and participating organizations contribute to policy
        development through advisory participation, research collaboration, and
        pilot program feedback. Early engagement ensures that policy frameworks
        reflect the practical needs of enterprise blockchain deployment in
        government contexts.
      </p>
    </GovernmentPageLayout>
  );
}
