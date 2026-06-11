import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAdminStats } from "@/lib/donations-service";

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(getAdminStats());
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
