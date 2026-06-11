import { notFound } from "next/navigation";
import { getOrganization, organizations } from "@/lib/organizations";
import OrgDonationShell from "@/components/donate/OrgDonationShell";
import CashDonationForm from "@/components/donate/CashDonationForm";
import DonationSidebar from "@/components/donate/DonationSidebar";

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export default async function OrgCashDonatePage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrganization(orgSlug);
  if (!org || !org.methods.includes("cash")) notFound();

  return (
    <OrgDonationShell org={org} methodLabel="Card">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CashDonationForm organization={org} />
        </div>
        <div className="lg:col-span-2">
          <DonationSidebar />
        </div>
      </div>
    </OrgDonationShell>
  );
}
