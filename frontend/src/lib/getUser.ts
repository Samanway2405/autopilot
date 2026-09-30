import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { neon } from "@neondatabase/serverless";

export interface AuthUser {
  id: string;
  publicKey: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Returns the authenticated user from DB using the neon() HTTP driver.
 * This connects over HTTPS (port 443), avoiding all TCP IPv4/IPv6 issues.
 */
export async function getUserFromRequest(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload?.publicKey) return null;

    if (!process.env.DATABASE_URL) {
      console.warn("[getUser] DATABASE_URL is not configured");
      return null;
    }

    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT id, "publicKey", "createdAt", "updatedAt"
      FROM "User"
      WHERE "publicKey" = ${payload.publicKey}
      LIMIT 1
    `;

    return (rows[0] as unknown as AuthUser) ?? null;
  } catch (err) {
    console.error("[getUser] Error fetching user:", err);
    return null;
  }
}

