import withAuth from "./proxy/withAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function mainProxy(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

const proxy = withAuth(mainProxy, [
  "/dashboard",
  "/profile",
  "/login",
  "/register",
]);

export { proxy };      
export default proxy; 

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};