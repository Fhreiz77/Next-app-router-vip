import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const onlyAdminPage = ["/dashboard"];
const authPage = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isProtected = onlyAdminPage.some((p) => pathname.startsWith(p));
  const isAuthPage = authPage.includes(pathname);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && (isProtected || isAuthPage)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && token.role !== "admin" && isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};