import 'server-only';

import { cache } from 'react';
import { getToken } from 'next-auth/jwt';
import { redirect } from 'next/navigation';

interface MinimalRequest {
  headers: {
    Cookie: string;
  };
}

// TODO: Authenticate all routes
export const verifySession = cache(async (redirectPath?: string) => {
  const cookies = (await import('next/headers')).cookies;
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const req: MinimalRequest = {
    headers: {
      Cookie: cookieString,
    },
  };

  const token = await getToken({
    // @ts-expect-error We don't have access to a full request object, we just need to pass the cookies
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    redirect(redirectPath || '/');
  }

  return { isAuth: true, session: token };
});
