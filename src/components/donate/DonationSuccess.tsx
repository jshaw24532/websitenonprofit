import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface DonationSuccessProps {
  referenceId: string;
  message: string;
  estimatedSettlement?: string;
  email: string;
}

export default function DonationSuccess({
  referenceId,
  message,
  estimatedSettlement,
  email,
}: DonationSuccessProps) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
      <h2 className="mb-2 text-center text-2xl font-bold text-green-900">
        Donation Submitted
      </h2>
      <p className="mb-4 text-center text-green-700">{message}</p>
      <div className="mb-6 rounded-xl bg-white/80 p-4 text-sm text-navy-700">
        <p>
          <strong>Reference:</strong> {referenceId}
        </p>
        {estimatedSettlement && (
          <p className="mt-2">
            <strong>Cash settlement:</strong> {estimatedSettlement}
          </p>
        )}
        <p className="mt-2">
          <strong>Tax receipt sent to:</strong> {email}
        </p>
        <p className="mt-3 text-navy-600">
          Your gift will be converted to U.S. dollars upon receipt so we can
          deploy funds to community outreach and civic programs immediately.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/donate" className="btn-outline">
          Give Another Way
        </Link>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
