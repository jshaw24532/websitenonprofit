import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getDb } from "./db";

const COOKIE_NAME = "admin_session";

function getSecret() {
  const secret = process.env.SESSION_SECRET || "dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  adminId: number;
  email: string;
  name: string;
}

export async function createSession(admin: AdminSession) {
  const token = await new SignJWT({
    adminId: admin.adminId,
    email: admin.email,
    name: admin.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      adminId: payload.adminId as number,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export async function verifyAdminLogin(
  email: string,
  password: string
): Promise<AdminSession | null> {
  const sql = await getDb();
  const rows = await sql`
    SELECT id, email, password_hash, name
    FROM admin_users
    WHERE email = ${email}
    LIMIT 1
  `;
  const row = rows[0] as
    | { id: number; email: string; password_hash: string; name: string }
    | undefined;

  if (!row || !bcrypt.compareSync(password, row.password_hash)) return null;

  return { adminId: Number(row.id), email: row.email, name: row.name };
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}
