import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/libs/db/index";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
});
