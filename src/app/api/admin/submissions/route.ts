import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listFormSubmissions } from "@/lib/forms-service";
import type { FormType } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const type = request.nextUrl.searchParams.get("type") as FormType | null;
    const submissions = await listFormSubmissions(type || undefined);
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
