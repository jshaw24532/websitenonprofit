import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Strategic Advisors",
  description:
    "Multidisciplinary strategic advisory network for the Municipal Blockchain & Infrastructure Consortium.",
};

const advisoryAreas = [
  {
    title: "Enterprise Blockchain Operations",
    roles: [
      "Director of Blockchain Operations & Strategic Engagement",
      "Blockchain Architects",
      "Smart Contract Specialists",
      "Full Stack Developers",
      "Enterprise Infrastructure Engineers",
    ],
  },
  {
    title: "Government & Municipal Affairs",
    roles: [
      "Municipal Attorneys",
      "Government Relations Directors",
      "Public Policy Advisors",
      "Infrastructure Funding Specialists",
      "Grant Writers",
    ],
  },
  {
    title: "Security & Compliance",
    roles: [
      "Cybersecurity Advisors",
      "Compliance Specialists",
      "Risk & Governance Analysts",
    ],
  },
  {
    title: "Program Delivery & Operations",
    roles: [
      "Project Managers",
      "PMO Leadership",
      "Civic Technology Coordinators",
      "Implementation Specialists",
    ],
  },
  {
    title: "Public Engagement & Communications",
    roles: [
      "Public Relations & Communications Leads",
      "Community Engagement Advisors",
      "Public Transparency & Reporting Teams",
    ],
  },
];

export default function StrategicAdvisorsPage() {
  return (
    <GovernmentPageLayout
      title="Strategic Advisors"
      subtitle="Multidisciplinary Leadership Network"
      description="The Consortium is building a multidisciplinary leadership structure combining enterprise technology expertise with municipal operational knowledge."
    >
      <h2>Advisory Network Structure</h2>
      <p>
        The Consortium&apos;s strategic advisory network represents the
        intersection of enterprise blockchain expertise, municipal operational
        knowledge, and public policy leadership. This multidisciplinary
        structure ensures that consortium initiatives are grounded in real-world
        deployment requirements and government-ready standards.
      </p>

      {advisoryAreas.map((area) => (
        <div key={area.title}>
          <h3>{area.title}</h3>
          <ul>
            {area.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Advisory Participation</h2>
      <p>
        Strategic advisors play a critical role in shaping consortium direction,
        deployment standards, and policy frameworks. Founding partners and
        participating organizations are invited to nominate qualified
        professionals for advisory roles across all strategic areas.
      </p>

      <h2>Join the Advisory Network</h2>
      <p>
        We are actively recruiting experienced professionals across all advisory
        domains. If you bring enterprise blockchain expertise, municipal
        operational knowledge, or public policy leadership, we invite you to
        explore advisory participation opportunities.
      </p>
    </GovernmentPageLayout>
  );
}
