import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { confirmDonation } from "@/lib/donations-service";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await confirmDonation(parseInt(id, 10));
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
