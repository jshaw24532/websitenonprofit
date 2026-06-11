import Link from "next/link";
import {
  CreditCard,
  Bitcoin,
  TrendingUp,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { donationMethods } from "@/lib/donations";
import { cn } from "@/lib/utils";

const icons = {
  "credit-card": CreditCard,
  bitcoin: Bitcoin,
  "trending-up": TrendingUp,
  landmark: Landmark,
};

interface DonationMethodCardsProps {
  activeId?: string;
}

export default function DonationMethodCards({
  activeId,
}: DonationMethodCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {donationMethods.map((method) => {
        const Icon = icons[method.icon as keyof typeof icons];
        const isActive = activeId === method.id;

        return (
          <Link
            key={method.id}
            href={method.href}
            className={cn(
              "group flex flex-col rounded-2xl border-2 p-5 transition-all",
              isActive
                ? "border-gold-500 bg-gold-50 shadow-md"
                : "border-navy-100 bg-white hover:border-navy-200 hover:shadow-lg"
            )}
          >
            <div
              className={cn(
                "mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-navy-950 text-gold-400"
                  : "bg-navy-100 text-navy-700 group-hover:bg-navy-950 group-hover:text-gold-400"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mb-1 font-bold text-navy-950">{method.title}</h3>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold-600">
              {method.subtitle}
            </p>
            <p className="mb-4 flex-1 text-sm text-navy-600">
              {method.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 group-hover:text-gold-600">
              {method.id === "cash" ? "Give now" : "Start donation"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
