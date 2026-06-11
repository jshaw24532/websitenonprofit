import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Organization } from "@/lib/organizations";

interface OrgDonationShellProps {
  org: Organization;
  children: React.ReactNode;
  methodLabel?: string;
}

export default function OrgDonationShell({
  org,
  children,
  methodLabel,
}: OrgDonationShellProps) {
  return (
    <div className="bg-white">
      <div className="border-b border-navy-100 bg-navy-50">
        <div className="container-wide py-4">
          <nav className="flex flex-wrap items-center gap-1 text-sm text-navy-500">
            <Link href="/donate" className="hover:text-navy-800">
              All organizations
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/donate/${org.slug}`} className="hover:text-navy-800">
              {org.shortName}
            </Link>
            {methodLabel && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-navy-800">{methodLabel}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="border-b border-navy-100 bg-white">
        <div className="container-wide flex flex-col gap-4 py-8 sm:flex-row sm:items-center">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white"
            style={{ backgroundColor: org.accentColor }}
          >
            {org.shortName.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-navy-500">
              {org.countryCode} · EIN {org.ein}
            </span>
            <h1 className="heading-subsection mt-1">{org.name}</h1>
            <p className="mt-1 text-navy-600">{org.mission}</p>
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        <Link
          href={methodLabel ? `/donate/${org.slug}` : "/donate"}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-navy-950"
        >
          <ArrowLeft className="h-4 w-4" />
          {methodLabel ? "All ways to give" : "Back to all organizations"}
        </Link>
        {children}
      </div>
    </div>
  );
}
