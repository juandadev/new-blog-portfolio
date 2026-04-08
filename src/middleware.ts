import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawl|spider|slurp|facebook|fetch|whatsapp|discord/i.test(
    userAgent
  );

  const response = NextResponse.next();

  if (isBot) {
    response.headers.set('X-Bot-Detected', 'true');
  }

  return response;
}

export const config = {
  matcher: ['/blog/:slug*'],
};
