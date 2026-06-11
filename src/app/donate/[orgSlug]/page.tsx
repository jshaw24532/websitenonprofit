import { notFound } from "next/navigation";
import { getOrganization, organizations } from "@/lib/organizations";
import OrgDonationShell from "@/components/donate/OrgDonationShell";
import OrgDonationMethodCards from "@/components/donate/OrgDonationMethodCards";
import InstantConversionBanner from "@/components/donate/InstantConversionBanner";

export function generateStaticParams() {
  return organizations.map((org) => ({ orgSlug: org.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrganization(orgSlug);
  if (!org) return { title: "Donate" };
  return {
    title: `Donate to ${org.shortName}`,
    description: org.description,
  };
}

export default async function OrgDonatePage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;
  const org = getOrganization(orgSlug);
  if (!org) notFound();

  return (
    <OrgDonationShell org={org}>
      <div className="mb-10">
        <InstantConversionBanner />
      </div>
      <h2 className="heading-subsection mb-2">Choose how to give</h2>
      <p className="text-lead mb-8 max-w-2xl">
        Support {org.name} with card, cryptocurrency, stock, or a donor-advised
        fund grant. Non-cash gifts are converted to U.S. dollars upon receipt.
      </p>
      <OrgDonationMethodCards orgSlug={org.slug} />
      <div className="mt-8 flex flex-wrap gap-2">
        {org.impactAreas.map((area) => (
          <span
            key={area}
            className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700"
          >
            {area}
          </span>
        ))}
      </div>
    </OrgDonationShell>
  );
}
