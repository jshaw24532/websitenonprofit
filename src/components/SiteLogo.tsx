import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface SiteLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string;
  textClassName?: string;
  subtitleClassName?: string;
  subtitle?: string;
}

const sizeMap = {
  sm: { img: 36, text: "text-xs" },
  md: { img: 44, text: "text-sm" },
  lg: { img: 56, text: "text-base" },
};

export default function SiteLogo({
  size = "md",
  showText = true,
  className,
  href = "/",
  textClassName,
  subtitleClassName,
  subtitle = "National Civic Infrastructure",
}: SiteLogoProps) {
  const { img, text } = sizeMap[size];

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logo-on3rd-outreach.png"
        alt={`${siteConfig.shortName} logo`}
        width={img}
        height={img}
        className="shrink-0 rounded-full"
        priority
      />
      {showText && (
        <div className="min-w-0">
          <p
            className={cn(
              "truncate font-bold leading-tight",
              text,
              textClassName
            )}
          >
            {siteConfig.shortName}
          </p>
          {subtitle && (
            <p
              className={cn(
                "hidden truncate text-xs sm:block",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="flex items-center gap-3">
      {content}
    </Link>
  );
}
