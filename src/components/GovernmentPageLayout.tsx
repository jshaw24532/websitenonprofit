import Link from "next/link";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";
import { governmentNav } from "@/lib/config";

interface GovernmentPageProps {
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  children: React.ReactNode;
  showCta?: boolean;
}

export default function GovernmentPageLayout({
  title,
  subtitle,
  description,
  badge = "Government & Infrastructure",
  children,
  showCta = true,
}: GovernmentPageProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        description={description}
        badge={badge}
        cta={{
          label: "Become a Founding Partner",
          href: "/government/founding-partners",
        }}
        secondaryCta={{
          label: "Contact the Consortium",
          href: "/government/contact",
        }}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <aside className="order-2 lg:order-1 lg:col-span-1">
              <div className="rounded-2xl border border-navy-100 bg-navy-50 p-4 sm:p-6 lg:sticky lg:top-28">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-500">
                  Consortium Navigation
                </h3>
                <nav className="space-y-1">
                  {governmentNav.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm text-navy-700 transition-colors hover:bg-white hover:text-navy-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="order-1 lg:order-2 lg:col-span-2">
              <Breadcrumbs
                items={[
                  { label: "Government & Infrastructure", href: "/government" },
                  { label: title },
                ]}
              />
              <div className="prose-content">{children}</div>
            </article>
          </div>
        </div>
      </section>

      {showCta && (
        <CTABanner
          title="Ready to Shape the Future of Civic Infrastructure?"
          description="Early participation provides the greatest opportunity to help shape infrastructure standards, policy direction, pilot program development, and workforce pipelines."
        />
      )}
    </>
  );
}
