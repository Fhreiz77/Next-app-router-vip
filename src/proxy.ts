import withAuth from "./proxy/withAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function mainProxy(request: NextRequest) {
  return NextResponse.next();
}

export const proxy = withAuth(mainProxy, [
  "/dashboard",
  "/profile",
  "/login",
  "/register",
]);

export default proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};