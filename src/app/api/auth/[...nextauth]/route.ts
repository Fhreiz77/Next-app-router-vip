import { login, loginWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await login({ email });
        if (user) {
          const ok = await compare(password, user.password);
          if (ok) return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname || user.name;
        token.role = user.role;
        return token;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: profile?.name || user.name,
          email: profile?.email || user.email,
          type: "google",
        };
        const result = await new Promise<{ status: boolean; data: any }>((resolve) => {
          loginWithGoogle(data, (res: any) => resolve(res));
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };