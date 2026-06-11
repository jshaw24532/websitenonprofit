import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyAdminLogin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const admin = await verifyAdminLogin(email, password);
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(admin);
    return NextResponse.json({ success: true, admin: { email: admin.email, name: admin.name } });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
