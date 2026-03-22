import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";
// Simple token derived from password - in production use proper JWT/sessions
const SESSION_TOKEN = "tf_admin_authenticated";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === SESSION_TOKEN;
}

export function getSessionToken(): string {
  return SESSION_TOKEN;
}

export function getAdminCookieName(): string {
  return ADMIN_COOKIE;
}
