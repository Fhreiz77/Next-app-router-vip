import { login, loginWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await login({ email });

        if (user) {
          const valid = await compare(password, user.password);
          if (valid) return user;
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      checks: ["nonce"],
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      console.log("[JWT] account?.provider:", account?.provider);
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname || user.name;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          fullname: profile?.name || user?.name,
          email: profile?.email || user?.email,
          type: "google",
        };

        console.log("[Google] data:", JSON.stringify(data));

        try {
          const result = await loginWithGoogle(data);

          if (result.status) {
            token.email = result.data.email;
            token.fullname =
              result.data.fullname || profile?.name || user?.name;
            token.role = result.data.role;
            console.log("[Google] token set:", token.email, token.role);
          } else {
            console.log("[Google] loginWithGoogle returned false status");
          }
        } catch (err: any) {
          console.error("[Google] Firebase ERROR:", err.message);
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) session.user.email = token.email;
      if ("fullname" in token) session.user.fullname = token.fullname;
      if ("role" in token) session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
});
