import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-navy-500">
        <li>
          <Link href="/" className="transition-colors hover:text-navy-800">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-navy-800"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-navy-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
