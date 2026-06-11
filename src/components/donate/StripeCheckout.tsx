"use client";

import { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, Heart, Loader2, Shield } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface DonorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  message?: string;
}

interface StripeCheckoutProps {
  organizationSlug: string;
  organizationName: string;
  organizationShortName: string;
  amount: number;
  frequency: "one-time" | "monthly";
  donor: DonorPayload;
  onSuccess: (result: {
    referenceId: string;
    paymentIntentId: string;
  }) => void;
  onBack: () => void;
}

function PaymentForm({
  organizationSlug,
  organizationName,
  organizationShortName,
  amount,
  frequency,
  donor,
  paymentIntentId,
  subscriptionId,
  onSuccess,
  onBack,
}: StripeCheckoutProps & {
  paymentIntentId: string;
  subscriptionId?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          confirmParams: {
            return_url: window.location.href,
            receipt_email: donor.email,
            payment_method_data: {
              billing_details: {
                name: `${donor.firstName} ${donor.lastName}`,
                email: donor.email,
                phone: donor.phone || undefined,
                address: donor.address
                  ? {
                      line1: donor.address,
                      city: donor.city || undefined,
                      state: donor.state || undefined,
                      postal_code: donor.zip || undefined,
                      country: "US",
                    }
                  : undefined,
              },
            },
          },
          redirect: "if_required",
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      const finalIntentId = paymentIntent?.id || paymentIntentId;
      if (paymentIntent && paymentIntent.status !== "succeeded") {
        throw new Error("Payment was not completed. Please try again.");
      }

      const res = await fetch("/api/donations/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cash",
          stripePaymentIntentId: finalIntentId,
          stripeSubscriptionId: subscriptionId,
          donor: {
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            phone: donor.phone || undefined,
          },
          details: {
            organizationSlug,
            organizationName,
            amount,
            frequency,
            message: donor.message,
            address: donor.address,
            city: donor.city,
            state: donor.state,
            zip: donor.zip,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to record donation");

      onSuccess({ referenceId: data.referenceId, paymentIntentId: finalIntentId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-6">
      <div className="rounded-xl border border-navy-200 p-6">
        <div className="mb-4 flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-navy-600" />
          <span className="font-semibold text-navy-900">Secure card payment</span>
        </div>
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
        <p className="mt-3 flex items-center gap-2 text-xs text-navy-500">
          <Shield className="h-3 w-3" />
          Payments processed by Stripe. Card details never touch our servers.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="btn-outline min-h-[44px] flex-1"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn-primary min-h-[44px] flex-1 py-4 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
          {frequency === "monthly" ? "Start monthly gift" : "Complete donation"}{" "}
          {formatCurrency(amount)} to {organizationShortName}
        </button>
      </div>
    </form>
  );
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | undefined>();
  const [initError, setInitError] = useState("");
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: props.amount,
            email: props.donor.email,
            firstName: props.donor.firstName,
            lastName: props.donor.lastName,
            organizationSlug: props.organizationSlug,
            organizationName: props.organizationName,
            frequency: props.frequency,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not start payment");

        if (!cancelled) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
          setSubscriptionId(data.subscriptionId);
        }
      } catch (err) {
        if (!cancelled) {
          setInitError(
            err instanceof Error ? err.message : "Payment setup failed"
          );
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [
    props.amount,
    props.donor.email,
    props.donor.firstName,
    props.donor.lastName,
    props.frequency,
    props.organizationName,
    props.organizationSlug,
  ]);

  if (initializing) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-xl border border-navy-100 bg-navy-50 py-12">
        <Loader2 className="h-6 w-6 animate-spin text-navy-600" />
        <span className="text-navy-700">Preparing secure checkout…</span>
      </div>
    );
  }

  if (initError || !clientSecret || !paymentIntentId) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="mb-4 text-red-800">
          {initError || "Unable to initialize payment"}
        </p>
        <button type="button" onClick={props.onBack} className="btn-outline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#c9952e",
            colorText: "#0a1929",
            borderRadius: "8px",
          },
        },
      }}
    >
      <PaymentForm
        {...props}
        paymentIntentId={paymentIntentId}
        subscriptionId={subscriptionId}
      />
    </Elements>
  );
}
