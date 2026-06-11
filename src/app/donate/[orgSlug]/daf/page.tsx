import { notFound } from "next/navigation";
import { getOrganization, organizations } from "@/lib/organizations";
import OrgDonationShell from "@/components/donate/OrgDonationShell";
import DAFDonationForm from "@/components/donate/DAFDonationForm";
import DonationSidebar from "@/components/donate/DonationSidebar";

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export default async function OrgDAFDonatePage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrganization(orgSlug);
  if (!org || !org.methods.includes("daf")) notFound();

  return (
    <OrgDonationShell org={org} methodLabel="DAF Grant">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <DAFDonationForm organization={org} />
        </div>
        <div className="lg:col-span-2">
          <DonationSidebar />
        </div>
      </div>
    </OrgDonationShell>
  );
}
