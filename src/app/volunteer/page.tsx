import type { Metadata } from "next";
import { Heart, Users, Truck } from "lucide-react";
import PageHero from "@/components/PageHero";
import VolunteerApplicationForm from "@/components/VolunteerApplicationForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer opportunities with our community outreach and civic infrastructure programs.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        badge="Get Involved"
        title="Volunteer With Us"
        description="Join our team of dedicated volunteers making a difference in communities and civic innovation."
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Truck,
                title: "Outreach Volunteer",
                description:
                  "Help serve meals and distribute resources through our mobile outreach service trucks.",
              },
              {
                icon: Users,
                title: "Community Coordinator",
                description:
                  "Organize community events, manage outreach schedules, and build local partnerships.",
              },
              {
                icon: Heart,
                title: "Consortium Ambassador",
                description:
                  "Help spread awareness about the Municipal Blockchain & Infrastructure Consortium.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-950">
                  {title}
                </h3>
                <p className="text-sm text-navy-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="heading-subsection mb-8 text-center">
              Volunteer Application
            </h2>
            <VolunteerApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
