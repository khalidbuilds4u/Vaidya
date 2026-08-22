import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Middleware runs on the Edge runtime.
 * It only imports auth.config.ts (no Prisma, no bcrypt).
 * This checks JWT tokens and role, blocking unauthorized access
 * to /admin/* before any server rendering happens.
 */
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/admin/:path*"],
};
