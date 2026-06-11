import Link from "next/link";
import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import {
  Building2,
  Shield,
  GraduationCap,
  Users,
  Landmark,
  Cpu,
  Globe,
  ArrowRight,
  CheckCircle2,
  Network,
  Briefcase,
  Scale,
  Lock,
  Megaphone,
} from "lucide-react";
import CTABanner from "@/components/CTABanner";
import { siteConfig } from "@/lib/config";
import { siteImages } from "@/lib/images";

const stakeholders = [
  "Enterprise blockchain companies",
  "Municipal governments",
  "Universities and law schools",
  "Infrastructure specialists",
  "Civic technology innovators",
  "Public policy leaders",
  "Workforce development institutions",
  "Strategic corporate sponsors",
];

const earlyPartnerBenefits = [
  "Direct visibility into public-sector pilot opportunities",
  "Access to future municipal deployments",
  "Branding as founding infrastructure innovators",
  "University recruitment pipelines",
  "Strategic advisory participation",
  "Research collaborations",
  "Long-term ecosystem positioning",
];

const leadershipAreas = [
  {
    title: "Enterprise Blockchain Operations",
    icon: Cpu,
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
    icon: Landmark,
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
    icon: Lock,
    roles: [
      "Cybersecurity Advisors",
      "Compliance Specialists",
      "Risk & Governance Analysts",
    ],
  },
  {
    title: "Program Delivery & Operations",
    icon: Briefcase,
    roles: [
      "Project Managers",
      "PMO Leadership",
      "Civic Technology Coordinators",
      "Implementation Specialists",
    ],
  },
  {
    title: "Public Engagement & Communications",
    icon: Megaphone,
    roles: [
      "Public Relations & Communications Leads",
      "Community Engagement Advisors",
      "Public Transparency & Reporting Teams",
    ],
  },
];

const universityPartnerships = [
  {
    title: "Law & Public Policy",
    icon: Scale,
    programs: [
      "Municipal law internships",
      "Public policy research",
      "Regulatory development",
      "Government blockchain frameworks",
    ],
  },
  {
    title: "Urban Planning & Public Affairs",
    icon: Building2,
    programs: [
      "Infrastructure modernization studies",
      "Smart city planning",
      "Public accountability initiatives",
      "Civic innovation research",
    ],
  },
  {
    title: "Technology & Engineering",
    icon: Cpu,
    programs: [
      "Blockchain development labs",
      "Cybersecurity collaboration",
      "Infrastructure analytics",
      "Civic software deployment",
    ],
  },
  {
    title: "Student Development Programs",
    icon: GraduationCap,
    programs: [
      "Internships",
      "Extra-credit field experience",
      "Capstone projects",
      "Research fellowships",
      "Civic technology collaborations",
      "Public policy collaborations",
      "Municipal innovation labs",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <HeroBanner />

        <div className="container-wide relative z-10 pt-20">
          <div className="max-w-4xl">
            <span className="mb-6 inline-block rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400 backdrop-blur-sm">
              National Civic Blockchain Infrastructure Consortium
            </span>

            <h1 className="heading-display mb-6 !text-white">
              Municipal Blockchain &{" "}
              <span className="gradient-text">Infrastructure Consortium</span>
            </h1>

            <p className="mb-4 text-xl font-medium text-white/90 md:text-2xl">
              {siteConfig.tagline}
            </p>

            <p className="text-lead mb-8 max-w-3xl text-navy-200">
              The future of public infrastructure funding, municipal
              transparency, workforce development, and civic technology
              innovation is being built now.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/government/executive-overview" className="btn-primary">
                Explore the Consortium
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/government/founding-partners" className="btn-secondary">
                Founding Partnership Opportunities
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Section 1: The Vision */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
                The Vision
              </p>
              <h2 className="heading-section mb-6">
                A First-of-Its-Kind Collaborative Initiative
              </h2>
              <p className="text-lead mb-6">
                The {siteConfig.consortiumName}, led by{" "}
                {siteConfig.name}, is establishing a national civic
                infrastructure ecosystem bringing together:
              </p>
              <ul className="space-y-3">
                {stakeholders.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={siteImages.teamCollaboration}
                alt="Team collaborating on civic technology infrastructure"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16 rounded-2xl bg-navy-950 p-8 text-center md:p-12">
            <p className="text-lg leading-relaxed text-navy-200 md:text-xl">
              Our mission is to create a scalable ecosystem that modernizes how
              infrastructure projects are{" "}
              <strong className="text-gold-400">funded</strong>,{" "}
              <strong className="text-gold-400">managed</strong>,{" "}
              <strong className="text-gold-400">monitored</strong>, and{" "}
              <strong className="text-gold-400">publicly reported</strong>{" "}
              through blockchain technology, workforce partnerships, and
              real-world civic deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why Municipal Blockchain Matters */}
      <section className="section-padding bg-section-gradient">
        <div className="container-wide">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
              Why This Matters
            </p>
            <h2 className="heading-section mb-6">
              Why Enterprise Blockchain Companies Must Engage Early
            </h2>
            <p className="text-lead">
              Municipal blockchain infrastructure is no longer theoretical.
              Cities, counties, transportation agencies, utilities, housing
              authorities, and public institutions are actively seeking modern
              solutions.
            </p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, label: "Transparency" },
              { icon: Briefcase, label: "Cost Reduction" },
              { icon: Scale, label: "Procurement Accountability" },
              { icon: Building2, label: "Infrastructure Modernization" },
              { icon: Lock, label: "Cybersecurity Protections" },
              { icon: Users, label: "Workforce Readiness" },
              { icon: Globe, label: "Real-Time Public Reporting" },
              { icon: Network, label: "Policy Framework Development" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="card text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-semibold text-navy-900">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card">
              <h3 className="heading-subsection mb-4">
                Organizations That Partner Now Will Shape
              </h3>
              <ul className="space-y-3">
                {[
                  "Statewide policy frameworks",
                  "Municipal deployment standards",
                  "Workforce certification models",
                  "University research collaborations",
                  "Next-generation public infrastructure ecosystems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold-500" />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-gold-200 bg-gradient-to-br from-gold-50 to-white">
              <h3 className="heading-subsection mb-4">
                Early Consortium Partners Gain
              </h3>
              <ul className="space-y-3">
                {earlyPartnerBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Enterprise Partnership Opportunities */}
      <section className="section-padding bg-navy-950 text-white">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={siteImages.enterpriseTech}
                alt="Enterprise technology team working on blockchain solutions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-950/40" />
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-400">
                Enterprise Partnership Opportunities
              </p>
              <h2 className="heading-section mb-6 text-white">
                Positioned at the Forefront of Government Modernization
              </h2>
              <p className="text-lead mb-6 text-navy-200">
                This initiative is designed to position participating
                organizations at the forefront of one of the largest emerging
                sectors in government modernization.
              </p>
              <p className="mb-8 text-navy-300">
                Enterprise blockchain firms, infrastructure investors,
                universities, and public-sector stakeholders recognize the
                strategic advantage of early consortium participation.
              </p>
              <Link
                href="/government/sponsorship"
                className="btn-primary"
              >
                Explore Enterprise Partnerships
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: University Workforce Pipeline */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
              Workforce Pipeline
            </p>
            <h2 className="heading-section mb-6">
              Solving the Industry&apos;s Workforce Challenge
            </h2>
            <p className="text-lead">
              One of the greatest barriers facing enterprise blockchain adoption
              within government and infrastructure sectors is the shortage of
              trained, deployment-ready professionals.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Universities",
              "Law schools",
              "Urban planning departments",
              "Public policy institutions",
              "Cybersecurity programs",
              "Engineering schools",
              "Civic technology initiatives",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50 px-4 py-3"
              >
                <GraduationCap className="h-5 w-5 shrink-0 text-gold-600" />
                <span className="text-sm font-medium text-navy-800">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card">
              <h3 className="heading-subsection mb-4">
                Top Performers Receive
              </h3>
              <ul className="space-y-3">
                {[
                  "Hands-on training",
                  "Internship placements",
                  "Civic technology exposure",
                  "Municipal project experience",
                  "Mentorship from industry leaders",
                  "Real-world operational participation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-navy-950 text-white">
              <h3 className="heading-subsection mb-4 text-white">
                Day-One Deployment Ready
              </h3>
              <p className="leading-relaxed text-navy-200">
                This allows consortium partners to access a growing pipeline of
                highly trained professionals who are prepared to contribute on
                day one rather than requiring months of internal onboarding and
                specialized training.
              </p>
              <Link
                href="/government/university-workforce"
                className="btn-primary mt-6"
              >
                View Workforce Pipeline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Strategic Advisory Leadership */}
      <section className="section-padding bg-section-gradient">
        <div className="container-wide">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
              Leadership & Strategic Expertise
            </p>
            <h2 className="heading-section mb-6">
              Strategic Leadership & Advisory Network
            </h2>
            <p className="text-lead">
              The Consortium is actively building a multidisciplinary leadership
              structure that combines enterprise technology expertise with
              municipal operational knowledge.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadershipAreas.map(({ title, icon: Icon, roles }) => (
              <div key={title} className="card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-lg font-bold text-navy-950">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {roles.map((role) => (
                    <li
                      key={role}
                      className="text-sm text-navy-600 before:mr-2 before:text-gold-500 before:content-['•']"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/government/strategic-advisors" className="btn-outline">
              Meet Our Strategic Advisors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: University & Civic Technology Collaboration */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
              Government & Civic Technology Collaboration
            </p>
            <h2 className="heading-section mb-6">
              University & Civic Innovation Partnerships
            </h2>
            <p className="text-lead">
              The Consortium is developing long-term collaborative partnerships
              with higher learning institutions focused on law, public policy,
              urban planning, and technology.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {universityPartnerships.map(({ title, icon: Icon, programs }) => (
              <div key={title} className="card">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {programs.map((program) => (
                    <li key={program} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      <span className="text-sm text-navy-700">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Founding Partner CTA */}
      <CTABanner
        title="Founding Partnership Opportunities Now Open"
        description="The Consortium is currently engaging enterprise blockchain companies, infrastructure firms, universities, public-sector advisors, and strategic sponsors seeking early participation in a national civic infrastructure initiative."
        primaryLabel="Become a Founding Partner"
        primaryHref="/government/founding-partners"
        secondaryLabel="Contact the Consortium"
        secondaryHref="/government/contact"
      />

      {/* Donation CTA */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid items-center gap-12 rounded-2xl bg-gradient-to-br from-navy-50 to-gold-50 p-8 md:p-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
                Support Our Mission
              </p>
              <h2 className="heading-section mb-4">
                Fuel Community Outreach & Civic Innovation
              </h2>
              <p className="text-lead mb-6">
                Give by card, cryptocurrency, stock, or donor-advised fund. All
                non-cash gifts convert to cash automatically upon receipt.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/donate" className="btn-primary">
                  Find a Cause to Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/donate/on-3rd-outreach" className="btn-outline">
                  Donate to On 3rd Outreach
                </Link>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                src={siteImages.communityOutreach}
                alt="Community food outreach service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
