import Link from "next/link";
import { Mail, Phone, MapPin, BadgeCheck } from "lucide-react";
import { siteConfig, footerNav, nonprofit } from "@/lib/config";
import SiteLogo from "@/components/SiteLogo";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-wide section-padding pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400">
              <BadgeCheck className="h-3.5 w-3.5" />
              Active {nonprofit.status} · Tax-Exempt
            </p>
            <div className="mb-4">
              <SiteLogo
                size="sm"
                href="/"
                textClassName="text-white"
                subtitle="501(c)(3) Nonprofit"
                subtitleClassName="text-navy-300"
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-navy-300">
              {siteConfig.description}
            </p>
            <div className="space-y-2 text-sm text-navy-300">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 break-all transition-colors hover:text-gold-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-gold-400"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.phone}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Organization
            </h3>
            <ul className="space-y-2">
              {footerNav.organization.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Government & Infrastructure
            </h3>
            <ul className="space-y-2">
              {footerNav.consortium.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Support Us
            </h3>
            <ul className="space-y-2">
              {footerNav.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-navy-400">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="mt-1 text-xs text-navy-500">
              {nonprofit.status} tax-exempt nonprofit · EIN {nonprofit.ein} ·{" "}
              <Link href="/about#tax-exempt-status" className="hover:text-gold-400">
                Tax-exempt status
              </Link>
            </p>
          </div>
          <div className="flex gap-6 text-sm text-navy-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
