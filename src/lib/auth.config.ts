import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible auth config.
 * This file must NOT import Prisma, bcrypt, or any Node.js-only modules
 * because it runs in the Edge runtime (middleware).
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as { role: string }).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as unknown as { role: string }).role = token.role as string;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        const role = (auth?.user as unknown as { role?: string })?.role;
        if (role !== "ADMIN") return false;
        return true;
      }

      return true;
    },
  },

  providers: [], // Providers added in auth.ts (Node.js runtime)
};
