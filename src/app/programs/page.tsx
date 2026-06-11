import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Truck, Building2, GraduationCap } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Community outreach programs and civic infrastructure initiatives.",
};

const programs = [
  {
    icon: Truck,
    title: "Mobile Food Outreach",
    description:
      "Our signature program delivers fresh, nutritious meals directly to underserved communities through our fleet of outreach service trucks.",
    href: "/donate",
  },
  {
    icon: Building2,
    title: "Municipal Blockchain Consortium",
    description:
      "The national Municipal Blockchain & Infrastructure Consortium brings together enterprise, government, and academic partners.",
    href: "/government",
  },
  {
    icon: GraduationCap,
    title: "Workforce Development",
    description:
      "University partnerships and internship programs developing deployment-ready municipal blockchain professionals.",
    href: "/government/university-workforce",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        badge="Our Programs"
        title="Programs & Initiatives"
        description="From mobile food outreach to national civic infrastructure — our programs create impact at every level."
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programs.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group card flex flex-col"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-navy-950 group-hover:text-navy-800">
                  {title}
                </h3>
                <p className="mb-4 flex-1 text-sm text-navy-600">
                  {description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 group-hover:text-gold-500">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
