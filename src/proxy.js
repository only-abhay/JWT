import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  const isCustomerRoute = pathname.startsWith("/customer");
  const isAgentRoute = pathname.startsWith("/manager");
  const isAdminRoute = pathname.startsWith("/admin");

  const isProtectedRoute = isCustomerRoute || isAgentRoute || isAdminRoute;

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // No token — send everyone to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.CRYPTR_SECRET);
    const role = decoded.role;

    // Role must match the section being accessed
    if (isCustomerRoute && role !== "customer") {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    if (isAgentRoute && role !== "manager") {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
  } catch (error) {
    console.log("JWT VERIFY ERROR:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/manager/:path*", "/admin/:path*"],
};
