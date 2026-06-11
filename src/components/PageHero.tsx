import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteImages } from "@/lib/images";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  dark?: boolean;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function PageHero({
  title,
  subtitle,
  description,
  badge,
  dark = true,
  cta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24",
        dark ? "text-white" : "text-navy-950"
      )}
    >
      <Image
        src={siteImages.heroCity}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />

      <div
        className={cn(
          "absolute inset-0",
          dark
            ? "bg-[linear-gradient(135deg,rgba(10,25,41,0.88)_0%,rgba(30,58,95,0.78)_50%,rgba(45,90,135,0.68)_100%)]"
            : "bg-[linear-gradient(135deg,rgba(240,244,248,0.92)_0%,rgba(255,255,255,0.88)_50%,rgba(240,244,248,0.94)_100%)]"
        )}
        aria-hidden="true"
      />

      <div className="container-wide relative">
        {badge && (
          <span
            className={cn(
              "mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider",
              dark
                ? "bg-gold-500/20 text-gold-400"
                : "bg-navy-900/10 text-navy-800"
            )}
          >
            {badge}
          </span>
        )}

        {subtitle && (
          <p
            className={cn(
              "mb-3 text-sm font-semibold uppercase tracking-widest",
              dark ? "text-gold-400" : "text-gold-600"
            )}
          >
            {subtitle}
          </p>
        )}

        <h1 className="page-hero-title mb-6 max-w-4xl">{title}</h1>

        {description && (
          <p
            className={cn(
              "text-lead mb-8 max-w-3xl",
              dark ? "text-navy-200" : "text-navy-700"
            )}
          >
            {description}
          </p>
        )}

        {(cta || secondaryCta) && (
          <div className="flex flex-wrap gap-4">
            {cta && (
              <Link href={cta.href} className="btn-primary">
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={dark ? "btn-secondary" : "btn-outline"}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
