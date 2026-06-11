import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteImages } from "@/lib/images";

interface CTABannerProps {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title,
  description,
  primaryLabel = "Become a Founding Partner",
  primaryHref = "/government/founding-partners",
  secondaryLabel = "Contact the Consortium",
  secondaryHref = "/government/contact",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-dark-gradient">
      <Image
        src={siteImages.cityStreet}
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="container-wide section-padding relative text-center">
        <h2 className="heading-section mb-4 text-white">{title}</h2>
        <p className="text-lead mx-auto mb-8 max-w-2xl text-navy-200">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={secondaryHref} className="btn-secondary">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
