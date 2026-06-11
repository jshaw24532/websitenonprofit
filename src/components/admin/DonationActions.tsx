"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Mail,
  Receipt,
  Bell,
  Loader2,
} from "lucide-react";

export default function DonationActions({
  donationId,
  status,
}: {
  donationId: number;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const act = async (action: string, url: string) => {
    setLoading(action);
    setMessage("");
    try {
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      setMessage(`${action} completed successfully.`);
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Action failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-navy-950">Admin Actions</h3>
      <div className="flex flex-wrap gap-3">
        {status !== "confirmed" && (
          <button
            disabled={!!loading}
            onClick={() =>
              act("confirm", `/api/admin/donations/${donationId}/confirm`)
            }
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading === "confirm" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            Confirm Received
          </button>
        )}
        <button
          disabled={!!loading}
          onClick={() =>
            act("receipt", `/api/admin/donations/${donationId}/send-receipt`)
          }
          className="inline-flex items-center gap-2 rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50 disabled:opacity-50"
        >
          {loading === "receipt" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Receipt className="h-4 w-4" />
          )}
          Send Receipt
        </button>
        <button
          disabled={!!loading}
          onClick={() =>
            act("reminder", `/api/admin/donations/${donationId}/send-reminder`)
          }
          className="inline-flex items-center gap-2 rounded-lg border border-gold-300 bg-gold-50 px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-gold-100 disabled:opacity-50"
        >
          {loading === "reminder" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          Send Reminder
        </button>
      </div>
      {message && (
        <p className="flex items-center gap-2 text-sm text-navy-700">
          <Mail className="h-4 w-4" />
          {message}
        </p>
      )}
    </div>
  );
}
