import type { Metadata } from "next";
import GovernmentPageLayout from "@/components/GovernmentPageLayout";

export const metadata: Metadata = {
  title: "Internship & Fellowship Programs",
  description:
    "Internship and fellowship programs developing the next generation of municipal blockchain professionals.",
};

export default function InternshipsPage() {
  return (
    <GovernmentPageLayout
      title="Internship & Fellowship Programs"
      subtitle="Next-Generation Talent Development"
      description="Structured internship and fellowship programs providing hands-on experience in municipal blockchain deployment, civic technology, and public infrastructure innovation."
    >
      <h2>Program Overview</h2>
      <p>
        Internship and Fellowship Programs are the operational backbone of the
        Consortium&apos;s workforce pipeline — providing students and early-career
        professionals with direct exposure to real-world infrastructure
        initiatives while delivering deployment-ready talent to consortium
        partners.
      </p>

      <h2>Program Types</h2>
      <h3>Municipal Blockchain Internships</h3>
      <p>
        Semester-based internships with consortium partner organizations,
        providing hands-on experience in blockchain deployment, smart contract
        development, and municipal infrastructure projects.
      </p>
      <h3>Public Policy Fellowships</h3>
      <p>
        Research-focused fellowships exploring regulatory frameworks,
        government blockchain policies, and civic technology governance models.
      </p>
      <h3>Civic Technology Fellowships</h3>
      <p>
        Advanced fellowships for graduate students and early-career
        professionals working on smart city initiatives, infrastructure
        analytics, and public accountability systems.
      </p>
      <h3>Capstone & Research Projects</h3>
      <p>
        University-integrated capstone projects and research collaborations
        addressing real consortium deployment challenges.
      </p>

      <h2>Student Benefits</h2>
      <ul>
        <li>Hands-on training with industry-leading technology</li>
        <li>Mentorship from enterprise and municipal leaders</li>
        <li>Real-world municipal project experience</li>
        <li>Professional network development</li>
        <li>Pathway to full-time consortium partner employment</li>
        <li>Extra-credit and academic recognition opportunities</li>
      </ul>

      <h2>Partner Hosting</h2>
      <p>
        Consortium partners can host interns and fellows, gaining early access
        to top-performing talent while contributing to the national workforce
        pipeline. Founding partners receive priority placement in the talent
        matching process.
      </p>
    </GovernmentPageLayout>
  );
}
