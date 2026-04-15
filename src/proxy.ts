import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const authPage = ["/login", "/register"];
  const adminPage = ["/dashboard"];

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token && adminPage.some((p) => pathname.startsWith(p))) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(url);
  }

  if (token && authPage.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && token.role !== "admin" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};