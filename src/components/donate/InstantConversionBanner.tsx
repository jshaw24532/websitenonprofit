import { Zap, CheckCircle2 } from "lucide-react";
import { instantConversionPolicy } from "@/lib/donations";

export default function InstantConversionBanner() {
  return (
    <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 via-white to-navy-50 p-6 md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-white">
          <Zap className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
            Automatic Processing
          </p>
          <h2 className="text-xl font-bold text-navy-950 md:text-2xl">
            {instantConversionPolicy.title}
          </h2>
        </div>
      </div>
      <p className="mb-6 text-navy-600 leading-relaxed">
        {instantConversionPolicy.description}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {instantConversionPolicy.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-navy-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
