import Link from "next/link";
import { CheckCircle2, Shield, FileText, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { givingBlockIntegration } from "@/lib/donations";

export default function DonationSidebar() {
  return (
    <div className="sticky top-28 space-y-6">
      <div className="rounded-2xl bg-navy-950 p-6 text-white">
        <h3 className="mb-4 text-lg font-bold">How Non-Cash Gifts Work</h3>
        <ol className="space-y-4 text-sm text-navy-200">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
              1
            </span>
            <span>You submit your crypto, stock, or DAF gift through our secure form</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
              2
            </span>
            <span>Assets are received and verified by our donation processor</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
              3
            </span>
            <span>
              <strong className="text-gold-400">Immediate conversion to USD cash</strong>{" "}
              — typically within minutes to hours, 24/7
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
              4
            </span>
            <span>You receive an automatic tax receipt for your records</span>
          </li>
        </ol>
      </div>

      <div className="rounded-2xl border border-navy-100 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-bold text-navy-950">Secure & Compliant</h3>
        </div>
        <ul className="space-y-2 text-sm text-navy-600">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            501(c)(3) tax-deductible where applicable
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            Fair market value receipts for crypto & stock
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            KYC/AML compliant processing partners
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6">
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-5 w-5 text-navy-600" />
          <h3 className="font-bold text-navy-950">Powered by Modern Philanthropy</h3>
        </div>
        <p className="mb-3 text-sm text-navy-600">
          Our non-cash gift infrastructure follows industry best practices used by
          platforms like{" "}
          <a
            href={givingBlockIntegration.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-600 hover:text-gold-500"
          >
            The Giving Block
          </a>
          — automatic liquidation, donor receipts, and CRM-ready reporting.
        </p>
        <a
          href={givingBlockIntegration.learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-navy-800 hover:text-gold-600"
        >
          Learn about crypto philanthropy
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <p className="text-xs text-navy-500">
        Questions? Contact{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-medium text-navy-700 hover:text-gold-600"
        >
          {siteConfig.email}
        </a>
      </p>
    </div>
  );
}
