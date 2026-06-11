import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listDonations } from "@/lib/donations-service";
import type { DonationStatus } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as DonationStatus | null;
    const search = searchParams.get("search") || undefined;

    const donations = listDonations({
      status: status || undefined,
      search,
    });

    return NextResponse.json({ donations });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
