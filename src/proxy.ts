import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login'];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Bot detection logic
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawl|spider|slurp|facebook|fetch|whatsapp|discord/i.test(
    userAgent
  );

  // Auth logic
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Auth-based redirects
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();

  if (isBot) {
    response.headers.set('X-Bot-Detected', 'true');
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/blog/:slug*'],
};
