import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDonationById, getEmailLogs } from "@/lib/donations-service";
import { parseDetails } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const donation = await getDonationById(parseInt(id, 10));
    if (!donation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const emails = await getEmailLogs(donation.id);
    return NextResponse.json({
      donation,
      details: parseDetails(donation),
      emails,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
