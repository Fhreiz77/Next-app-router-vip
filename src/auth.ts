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
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname || user.name;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: profile?.name || user.name,
          email: profile?.email || user.email,
          type: "google",
        };
        const result = await new Promise<any>((resolve) => {
          loginWithGoogle(data, (response: any) => resolve(response));
        });
        if (result.status) {
          token.email = result.data.email;
          token.fullname = result.data.fullname;
          token.role = result.data.role;
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