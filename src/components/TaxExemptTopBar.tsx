import Link from "next/link";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { nonprofit } from "@/lib/config";

export default function TaxExemptTopBar() {
  return (
    <div
      className="border-b border-gold-600/30 bg-gold-600 text-white"
      role="banner"
      aria-label="Tax-exempt nonprofit status"
    >
      <div className="container-wide flex min-h-9 flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-1.5 text-center text-xs font-medium sm:justify-between sm:text-left sm:text-sm">
        <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 sm:justify-start">
          <BadgeCheck
            className="h-4 w-4 shrink-0 text-white"
            aria-hidden="true"
          />
          <span>
            <strong className="font-semibold">Active {nonprofit.status}</strong>
            <span className="hidden sm:inline">
              {" "}
              Tax-Exempt Nonprofit
            </span>
            <span className="text-white/90"> · EIN {nonprofit.ein}</span>
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <span className="hidden text-white/90 md:inline">
            {nonprofit.taxDeductibleNote}
          </span>
          <Link
            href="/about#tax-exempt-status"
            className="inline-flex items-center gap-1 font-semibold text-white underline-offset-2 hover:underline"
          >
            Verify our status
          </Link>
          <a
            href={nonprofit.irsVerifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/90 underline-offset-2 hover:text-white hover:underline"
          >
            IRS lookup
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
