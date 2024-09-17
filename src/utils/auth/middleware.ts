import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const authMiddleware = async (request: NextRequest) => {
  const isAuthenticated = Boolean(request.cookies.get('refresh_token'));

  const protectedRoutes = ['/home', '/chat', '/explore', '/notification', '/profile', '/menu'];

  if (!isAuthenticated && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && !protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
};
