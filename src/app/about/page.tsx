import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/lib/config";
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
        description="A 501(c)(3) nonprofit organization dedicated to community food outreach and advancing national civic blockchain infrastructure."
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
    </>
  );
}
