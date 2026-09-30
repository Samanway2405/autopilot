import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { redirect } from "next/navigation";

export interface SessionPayload {
  publicKey: string;
  iat: number;
  exp: number;
}

export async function getOptionalSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload> {
  const session = await getOptionalSession();
  if (!session) {
    redirect("/onboarding");
  }
  return session;
}

