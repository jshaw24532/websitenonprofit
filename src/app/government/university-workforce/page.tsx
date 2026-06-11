import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "University & Workforce Pipeline",
  description:
    "University partnerships and workforce pipeline development for municipal blockchain deployment readiness.",
};

export default function UniversityWorkforcePage() {
  return (
    <GovernmentPageLayout
      title="University & Workforce Pipeline"
      subtitle="Solving the Industry's Workforce Challenge"
      description="Addressing the critical shortage of trained, deployment-ready municipal blockchain professionals through strategic university partnerships and hands-on development programs."
    >
      <h2>The Workforce Challenge</h2>
      <p>
        One of the greatest barriers facing enterprise blockchain adoption within
        government and infrastructure sectors is the shortage of trained,
        deployment-ready professionals. The Consortium addresses this challenge
        directly through strategic partnerships with leading academic and
        professional development institutions.
      </p>

      <h2>Partner Institutions</h2>
      <ul>
        <li>Universities and research institutions</li>
        <li>Law schools and public policy programs</li>
        <li>Urban planning departments</li>
        <li>Public policy institutions</li>
        <li>Cybersecurity programs</li>
        <li>Engineering schools</li>
        <li>Civic technology initiatives</li>
      </ul>

      <h2>Student Development Pathway</h2>
      <p>
        Students identified as top performers within participating institutions
        will receive a comprehensive development pathway designed for immediate
        deployment readiness:
      </p>
      <ul>
        <li>Hands-on blockchain and civic technology training</li>
        <li>Internship placements with consortium partners</li>
        <li>Direct civic technology exposure and project participation</li>
        <li>Municipal project experience with real infrastructure initiatives</li>
        <li>Mentorship from industry leaders and municipal experts</li>
        <li>Real-world operational participation in deployment projects</li>
      </ul>

      <h2>Partner Benefits</h2>
      <p>
        Consortium partners gain access to a growing pipeline of highly trained
        professionals who are prepared to contribute on day one rather than
        requiring months of internal onboarding and specialized training. This
        workforce pipeline represents one of the Consortium&apos;s most
        strategic value propositions.
      </p>

      <h2>Certification & Standards</h2>
      <p>
        The Consortium is developing workforce certification models that will
        become industry standards for municipal blockchain deployment readiness.
        Founding partners have the opportunity to help shape these certification
        frameworks.
      </p>
    </GovernmentPageLayout>
  );
}
