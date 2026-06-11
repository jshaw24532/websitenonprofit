import { NextRequest, NextResponse } from "next/server";
import {
  createMonthlySubscriptionPayment,
  createOneTimePaymentIntent,
} from "@/lib/stripe-payment";
import { isStripeConfigured } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Stripe is not configured on this server" },
        { status: 503 }
      );
    }

    const body = (await request.json()) as {
      amount: number;
      email: string;
      firstName: string;
      lastName: string;
      organizationSlug: string;
      organizationName: string;
      frequency?: "one-time" | "monthly";
    };

    const amount = Math.round(Number(body.amount));
    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!body.email?.trim() || !body.firstName?.trim()) {
      return NextResponse.json(
        { error: "Donor name and email are required" },
        { status: 400 }
      );
    }

    const amountCents = amount * 100;
    const name = `${body.firstName.trim()} ${body.lastName?.trim() || ""}`.trim();
    const frequency = body.frequency || "one-time";

    if (frequency === "monthly") {
      const result = await createMonthlySubscriptionPayment({
        amountCents,
        email: body.email.trim(),
        name,
        organizationSlug: body.organizationSlug,
        organizationName: body.organizationName,
      });

      return NextResponse.json({
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId,
        subscriptionId: result.subscriptionId,
        frequency: "monthly",
      });
    }

    const pi = await createOneTimePaymentIntent({
      amountCents,
      email: body.email.trim(),
      name,
      organizationSlug: body.organizationSlug,
      organizationName: body.organizationName,
      frequency: "one-time",
    });

    return NextResponse.json({
      clientSecret: pi.client_secret,
      paymentIntentId: pi.id,
      frequency: "one-time",
    });
  } catch (err) {
    console.error("[stripe-create-payment-intent]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Payment setup failed" },
      { status: 500 }
    );
  }
}
