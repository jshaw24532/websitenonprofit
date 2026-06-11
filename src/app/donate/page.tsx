import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import NonprofitFinder from "@/components/donate/NonprofitFinder";

export const metadata = {
  title: "Donate",
  description:
    "Find a cause and donate with crypto, stock, DAF, or card. Browse 25 impact areas and organizations.",
};

function FinderFallback() {
  return (
    <div className="flex items-center justify-center bg-navy-50 py-24">
      <p className="text-navy-600">Loading organizations...</p>
    </div>
  );
}

export default function DonateMarketplacePage() {
  return (
    <>
      <PageHero
        badge="Nonprofit Donation Platform"
        title="Find a Cause That Matches Your Passion"
        description="Make a crypto, stock, DAF, or card donation to your favorite cause. All non-cash gifts convert to cash automatically upon receipt."
      />
      <Suspense fallback={<FinderFallback />}>
        <NonprofitFinder />
      </Suspense>
    </>
  );
}
