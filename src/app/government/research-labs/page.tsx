import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Civic Technology Research Labs",
  description:
    "Research and innovation labs advancing civic technology and municipal blockchain solutions.",
};

export default function ResearchLabsPage() {
  return (
    <GovernmentPageLayout
      title="Civic Technology Research Labs"
      subtitle="Innovation & Research Collaborations"
      description="Advancing the frontier of civic technology through collaborative research labs focused on blockchain infrastructure, smart city solutions, and public accountability systems."
    >
      <h2>Research Mission</h2>
      <p>
        Civic Technology Research Labs serve as the innovation engine of the
        Consortium — developing next-generation solutions for municipal
        blockchain deployment, smart city infrastructure, and public
        accountability systems.
      </p>

      <h2>Research Focus Areas</h2>
      <ul>
        <li>Blockchain development and smart contract architecture</li>
        <li>Cybersecurity for municipal infrastructure systems</li>
        <li>Infrastructure analytics and predictive modeling</li>
        <li>Civic software deployment and integration</li>
        <li>Regulatory and compliance framework development</li>
        <li>Public policy and governance model research</li>
        <li>Interoperability and cross-chain infrastructure solutions</li>
      </ul>

      <h2>University Collaborations</h2>
      <p>
        Research labs operate through collaborative partnerships with
        participating universities, providing students with capstone project
        opportunities, research fellowships, and direct exposure to
        infrastructure initiatives with real-world impact.
      </p>

      <h2>Enterprise Partnership</h2>
      <p>
        Enterprise blockchain companies and technology firms can engage with
        research labs through sponsored research, technology validation
        programs, and co-development initiatives. Founding partners receive
        priority access to research outputs and intellectual property
        collaboration opportunities.
      </p>
    </GovernmentPageLayout>
  );
}
