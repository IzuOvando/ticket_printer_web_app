import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
} satisfies NextAuthConfig;
