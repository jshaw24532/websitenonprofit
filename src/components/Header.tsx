"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { mainNav, governmentNav } from "@/lib/config";
import { cn } from "@/lib/utils";
import SiteLogo from "@/components/SiteLogo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [govOpen, setGovOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setGovOpen(false);
  }, [pathname]);

  const isGovernment = pathname.startsWith("/government");
  const isDonate = pathname.startsWith("/donate");
  const useSolidHeader = scrolled || isGovernment || isDonate;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        useSolidHeader
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="min-w-0 max-w-none">
            <SiteLogo
              size="lg"
              textClassName={
                useSolidHeader ? "text-navy-950" : "text-white"
              }
              subtitleClassName={
                useSolidHeader ? "text-navy-500" : "text-white/70"
              }
            />
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? useSolidHeader
                      ? "bg-navy-50 text-navy-950"
                      : "bg-white/10 text-white"
                    : useSolidHeader
                      ? "text-navy-700 hover:text-navy-950"
                      : "text-white/80 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setGovOpen(!govOpen)}
                onBlur={() => setTimeout(() => setGovOpen(false), 200)}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  isGovernment
                    ? useSolidHeader
                      ? "bg-navy-900 text-gold-400"
                      : "bg-white/15 text-gold-400"
                    : useSolidHeader
                      ? "text-navy-700 hover:text-navy-950"
                      : "text-white/80 hover:text-white"
                )}
                aria-expanded={govOpen}
                aria-haspopup="true"
              >
                {governmentNav.label}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    govOpen && "rotate-180"
                  )}
                />
              </button>

              {govOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[min(420px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-2xl border border-navy-100 bg-white p-4 shadow-2xl">
                  <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
                    National Civic Blockchain Infrastructure Consortium
                  </p>
                  <div className="grid max-h-[70vh] gap-1 overflow-y-auto">
                    {governmentNav.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50"
                      >
                        <p className="text-sm font-semibold text-navy-900 group-hover:text-navy-950">
                          {item.label}
                        </p>
                        <p className="text-xs text-navy-500">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/donate"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                useSolidHeader
                  ? "bg-gold-500 text-navy-950 hover:bg-gold-400"
                  : "bg-gold-500 text-navy-950 hover:bg-gold-400"
              )}
            >
              <Heart className="h-4 w-4" />
              Donate
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-lg lg:hidden",
              useSolidHeader
                ? "text-navy-900"
                : "text-white"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white lg:hidden">
          <div className="container-wide max-h-[80vh] space-y-1 overflow-y-auto py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-navy-800 hover:bg-navy-50"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-navy-100 pt-3">
              <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
                {governmentNav.label}
              </p>
              {governmentNav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-navy-100 pt-3">
              <Link
                href="/donate"
                className="btn-primary mx-4 mt-2 w-[calc(100%-2rem)]"
              >
                <Heart className="h-4 w-4" />
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
