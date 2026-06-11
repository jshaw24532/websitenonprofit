import { notFound } from "next/navigation";
import { getOrganization, organizations } from "@/lib/organizations";
import OrgDonationShell from "@/components/donate/OrgDonationShell";
import CryptoDonationForm from "@/components/donate/CryptoDonationForm";
import DonationSidebar from "@/components/donate/DonationSidebar";

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export default async function OrgCryptoDonatePage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrganization(orgSlug);
  if (!org || !org.methods.includes("crypto")) notFound();

  return (
    <OrgDonationShell org={org} methodLabel="Cryptocurrency">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <CryptoDonationForm organization={org} />
        </div>
        <div className="lg:col-span-2">
          <DonationSidebar />
        </div>
      </div>
    </OrgDonationShell>
  );
}
