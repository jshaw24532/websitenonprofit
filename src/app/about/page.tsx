import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Truck, BadgeCheck, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import { siteConfig, nonprofit } from "@/lib/config";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} and our mission to serve communities through food outreach and civic innovation.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Our Organization"
        title={siteConfig.name}
        description="A 501(c)(3) nonprofit that saves governments up to 25% on infrastructure at zero upfront cost—and reinvests in mobile community food outreach."
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="heading-section mb-6">Who We Are</h2>
              <p className="text-lead mb-6">
                {siteConfig.name} is a community-driven nonprofit organization
                that operates mobile food outreach service trucks, delivering
                nutritious meals and essential resources to underserved
                communities.
              </p>
              <p className="mb-6 text-navy-600 leading-relaxed">
                Beyond our direct community service, we lead the{" "}
                {siteConfig.consortiumName} — a national initiative
                bringing together enterprise blockchain companies, municipal
                governments, universities, and infrastructure specialists to
                modernize civic infrastructure.
              </p>
              <Link href="/government/executive-overview" className="btn-primary">
                Explore the Consortium
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
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

      <section className="section-padding bg-section-gradient">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Truck,
                title: "Mobile Outreach",
                description:
                  "Our service trucks deliver fresh meals and resources directly to communities in need.",
              },
              {
                icon: Users,
                title: "Community Impact",
                description:
                  "Building lasting relationships with the communities we serve through consistent, reliable outreach.",
              },
              {
                icon: Heart,
                title: "Civic Innovation",
                description:
                  "Leading the national Municipal Blockchain & Infrastructure Consortium for government modernization.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="card text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-950">
                  {title}
                </h3>
                <p className="text-sm text-navy-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="tax-exempt-status"
        className="section-padding scroll-mt-28 border-t border-navy-100 bg-white"
      >
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-semibold text-gold-700">
              <BadgeCheck className="h-4 w-4" />
              Active {nonprofit.status} Tax-Exempt Status
            </div>
            <h2 className="heading-section mb-4">Our Nonprofit Status</h2>
            <p className="text-lead mb-6">
              {nonprofit.legalName} is recognized by the Internal Revenue Service
              as an active {nonprofit.status} tax-exempt charitable organization.
              Your support helps fund community food outreach and civic
              infrastructure programs nationwide.
            </p>
            <dl className="mb-8 grid gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  Legal name
                </dt>
                <dd className="mt-1 font-medium text-navy-900">
                  {nonprofit.legalName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  Federal tax status
                </dt>
                <dd className="mt-1 font-medium text-navy-900">
                  {nonprofit.status} — Tax-exempt
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  EIN
                </dt>
                <dd className="mt-1 font-mono font-medium text-navy-900">
                  {nonprofit.ein}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                  Donations
                </dt>
                <dd className="mt-1 text-navy-800">
                  {nonprofit.taxDeductibleNote}
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-4">
              <a
                href={nonprofit.irsVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Verify on IRS.gov
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link href="/donate/on-3rd-outreach" className="btn-outline">
                Make a tax-deductible gift
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
