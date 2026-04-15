
import withAuth from "./proxy/withAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(proxy, [
  "/dashboard",
  "/profile",
  "/login",
  "/register",
]);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};