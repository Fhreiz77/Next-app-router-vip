import withAuth from "./proxy/withAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function Mainproxy(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(Mainproxy, [
  "/dashboard",
  "/profile",
  "/login",
  "/register",
]);
