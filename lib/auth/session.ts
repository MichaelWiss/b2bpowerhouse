// ---------------------------------------------------------------------------
// Auth helpers — session management for B2B buyers
// ---------------------------------------------------------------------------

import { cookies } from "next/headers";

const SESSION_COOKIE = "b2b_session";

export interface Session {
  customerId: string;
  companyId: string | null;
  email: string;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie) return null;

  try {
    return JSON.parse(atob(sessionCookie.value)) as Session;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
