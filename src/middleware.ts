import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup' || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || '';

  if (isPublicPath && token) {
    // If user has a token and tries to access public paths, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!isPublicPath && !token) {
    // If user doesn't have a token and tries to access protected paths, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to the intended path
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile',
    '/logout'
  ]
}
