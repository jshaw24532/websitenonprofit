import { NextRequest, NextResponse } from "next/server";
import { createDonation, type DonationInput } from "@/lib/donations-service";
import type { DonationType } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DonationInput & {
      type: DonationType;
    };

    if (!body.type || !body.donor?.email || !body.donor?.firstName) {
      return NextResponse.json(
        { error: "Missing required donation fields" },
        { status: 400 }
      );
    }

    if (body.type === "cash" && !body.stripePaymentIntentId) {
      return NextResponse.json(
        { error: "Card payment must be completed through Stripe" },
        { status: 400 }
      );
    }

    const { referenceId, status } = await createDonation(body, request);

    return NextResponse.json({
      success: true,
      referenceId,
      status,
      message:
        body.type === "cash" && status === "confirmed"
          ? "Your payment was successful. Thank-you and confirmation emails have been sent."
          : "Your donation has been received. A thank-you email has been sent. You will receive a confirmation email once our team verifies receipt of funds.",
      conversionPolicy: "immediate_usd_liquidation",
      estimatedSettlement:
        body.type === "cash"
          ? "1-3 business days"
          : body.type === "crypto"
            ? "Minutes to 24 hours"
            : body.type === "stock"
              ? "3-7 business days"
              : "5-10 business days",
    });
  } catch (err) {
    console.error("[donation-submit]", err);
    return NextResponse.json(
      { error: "Failed to process donation request" },
      { status: 500 }
    );
  }
}
