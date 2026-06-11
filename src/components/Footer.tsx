import Link from "next/link";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, footerNav } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-wide section-padding pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-navy-950">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">{siteConfig.shortName}</p>
                <p className="text-xs text-navy-300">501(c)(3) Nonprofit</p>
              </div>
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
          <p className="text-sm text-navy-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
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
